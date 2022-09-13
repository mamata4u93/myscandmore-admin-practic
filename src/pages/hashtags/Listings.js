import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col, Space, Popconfirm } from 'antd';
import ListWapper from "../common/ListWapper";
import StandardTable from '../common/StandardTable';
import { useIntl } from 'react-intl';
import { IoMdAdd } from 'react-icons/io';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { feachAllData, deleteData, setFormValues } from '../../store/HashtagsRedux'
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
    const formValues = useSelector((state) => state.hashtag.formValues)
    const isFetching = useSelector((state) => state.hashtag.isFetching)
    const dataLists = useSelector((state) => state.hashtag.dataLists)


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
            if (values.name === undefined) {
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
            title: messages['hashtags.manage'],
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Brands',
            dataIndex: 'brands',
            render: (item) => <div>{item.length}</div>
        },
        {
            title: 'Influencers',
            dataIndex: 'influencers',
            render: (item) => <div>{item.length}</div>
        },
        {
            title: messages['common.action'],
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DoubleRightOutlined className='promo-detail' onClick={() => navigate(`/hashtags/view/${record._id}`)} />
                    <EditOutlined className='promo-edit' onClick={() => navigate(`/hashtags/edit/${record._id}`)} />
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
                    <h3>{messages['manage.hashtags']}</h3>
                </Col>
                <Col span={12} >
                    <div className='promo-rightbtn'>
                        <Button type='primary' danger onClick={() => navigate('/hashtags/add')}><IoMdAdd size={17} />  {messages['add.new']}</Button>
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
                                    name='name'
                                    label={messages['hashtags.title']}>
                                    <Input placeholder={messages['common.placeholder']} />
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






