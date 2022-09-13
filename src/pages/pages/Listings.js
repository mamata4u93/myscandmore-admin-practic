import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col, Space, Popconfirm } from 'antd';
import ListWapper from "../common/ListWapper";
import Selectbox from "../common/AntForms/SelectBox";
import StandardTable from '../common/StandardTable';
import { useIntl } from 'react-intl';
import { IoMdAdd } from 'react-icons/io';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { feachAllData, deleteData, setFormValues } from '../../store/PagesRedux'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const Listings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { messages } = useIntl()
    const timer = useRef(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = useSelector((state) => state.auth.token)
    const formValues = useSelector((state) => state.pages.formValues)
    const isFetching = useSelector((state) => state.pages.isFetching)
    const dataLists = useSelector((state) => state.pages.dataLists)
    const typeLists = [{ _id: 'disclaimer', title: 'Disclaimer' }, { _id: 'terms_conditions', title: 'Terms Conditions' }]

    useEffect(() => {
        // Load List Data
        handlePageChange()
    }, []);


    const handlePageChange = (searchVal = null, page = 1, size = 10) => {
        let params = JSON.parse(JSON.stringify(searchVal || formValues))
        dispatch(setFormValues(searchVal ? searchVal : {}))
        params.pageNo = page
        params.pageSize = size
        params.token = token
        dispatch(feachAllData(params))
        setSelectedRows([])
    }

    // Seach Filter
    const handleSearch = (values) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (values.type === undefined) {
                handlePageChange({})
            } else {
                handlePageChange(values)
            }
        }, 500)
    };

    // Remove Data
    const deleteItem = (record) => {
        dispatch(deleteData({ ...record, token }))
    };

    const columns = [
        {
            title: messages['common.type'],
            dataIndex: 'type',
            sorter: true
        },
        {
            title: messages['common.title'],
            dataIndex: 'data',
            render: (item) => <div>{item.title}</div>

        },
        {
            title: messages['common.description'],
            dataIndex: 'data',
            render: (item) => <div>{item.description}</div>

        },
        {
            title: messages['common.action'],
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DoubleRightOutlined className='promo-detail' onClick={() => navigate(`/pages/view/${record._id}`)} />
                    <EditOutlined className='promo-edit' onClick={() => navigate(`/pages/edit/${record._id}`)} />
                    <Popconfirm
                        title="Are you sure delete this?"
                        onConfirm={() => deleteItem(record)}
                        okText="Yes"
                        cancelText="No"><DeleteOutlined className='promo-delete' />
                    </Popconfirm>
                </Space>
            ),
        },

    ];

    return (
        <>
            <Row>
                <Col span={12}>
                    <h3>{messages['manage.disclaimers']}</h3>
                </Col>
                <Col span={12} >
                    <div className='promo-backbtn'>
                        <Button type='primary' danger onClick={() => navigate('/pages/add')}><IoMdAdd size={17} />{messages['add.new']} </Button>
                    </div>
                </Col>
            </Row>
            <ListWapper>
                <Space direction='vertical' className='promo-form'>
                    <Form
                        form={form}
                        name='search'
                        className='ant-advanced-search-form'
                        onValuesChange={(changedValues, allValues) => handleSearch(allValues)}
                        onFinish={handleSearch}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name='type'
                                    label={'Page Type'}>
                                    <Selectbox title="title" placeholder={'Select Page Type'} data={typeLists} />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <div className='promo-rightbtn'>
                                    <Button type='primary' htmlType='submit'>
                                        {messages['common.btn']}
                                    </Button>
                                    <Button className='lis-btn'
                                        onClick={() => {
                                            form.resetFields();
                                            handlePageChange({})
                                        }}>
                                        {messages['clear.btn']}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <StandardTable
                        selectedRows={selectedRows}
                        // rowClassName={(record, index) => record?.celebrity?.activated ? ' ' : 'table-row-red'}
                        loading={isFetching}
                        data={{ list: dataLists.data, count: dataLists.totalCount, pagination: { pageSize: 10 } }}
                        columns={columns}
                        pageOnChange={(page) => handlePageChange(null, page)}
                        onSelectRow={(rows) => setSelectedRows(rows)}
                    />
                </Space>
            </ListWapper>
        </>
    );
};

export default Listings;






