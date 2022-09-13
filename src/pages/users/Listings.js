import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col, Space, Popconfirm } from 'antd';
import ListWapper from "../common/ListWapper";
import StandardTable from '../common/StandardTable';
import { useIntl } from 'react-intl';
import { IoMdAdd } from 'react-icons/io';
import { ReactComponent as NoImg } from '../../assets/user/no-image.svg';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { feachAllData, deleteData, setFormValues } from '../../store/UsersRedux'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const dateFormat = 'YYYY-MM-DD';

const Listings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { messages } = useIntl()
    const timer = useRef(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = useSelector((state) => state.auth.token)
    const formValues = useSelector((state) => state.users.formValues)
    const isFetching = useSelector((state) => state.users.isFetching)
    const dataLists = useSelector((state) => state.users.dataLists)

    useEffect(() => {
        // Load List Data
        handlePageChange()
    }, []);


    const handlePageChange = (searchVal = null, page = 1, size = 10) => {
        let params = JSON.parse(JSON.stringify(searchVal || formValues))
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
            if (values.title === undefined && values.description === undefined) {
                handlePageChange({})
            } else {
                handlePageChange(values)
                dispatch(setFormValues(values))
            }
        }, 500)
    };

    // Remove Data
    const deleteItem = (record) => {
        dispatch(deleteData({ ...record, token }))
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'profile',
            render: (item) => (item?.avatar ? <img width={50} src={item.avatar} alt="avatar" /> : <NoImg width={50} />)
        },
        {
            title: messages['common.name'],
            dataIndex: 'profile',
            sorter: true,
            render: (res) => (<div>{res?.name}</div>)
        },
        {
            title: 'Age',
            dataIndex: 'profile',
            sorter: true,
            render: (res) => (<div>{res?.age}</div>)
        },
        {
            title: 'Gender',
            dataIndex: 'profile',
            sorter: true,
            render: (res) => (<div>{res?.gender}</div>)
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ellipsis: true,
        },
        {
            title: messages['user.status'],
            dataIndex: 'online',
            key: 'address 4',
            ellipsis: true,
            render: (res) => (<div>{res ? 'Active' : 'Inactive'}</div>)
        },
        {
            title: messages['common.action'],
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DoubleRightOutlined className='promo-detail' onClick={() => navigate(`/users/view/${record._id}`)} />
                    <EditOutlined className='promo-edit' onClick={() => navigate(`/users/edit/${record._id}`)} />
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
                    <h3>{messages['sidebar.app.manageusers']}</h3>
                </Col>
                <Col span={12} >
                    <div className='promo-backbtn'>
                        <Button type='primary' danger onClick={() => navigate('/users/add')}><IoMdAdd size={17} />{messages['add.new']} </Button>
                    </div>
                </Col>
            </Row>
            <ListWapper>
                <Space direction='vertical' className='promo-form'>
                    <Form
                        className='ant-advanced-search-form'
                        onValuesChange={(changedValues, allValues) => handleSearch(allValues)}
                        onFinish={handleSearch}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name='title'
                                    label={messages['user.title']}>
                                    <Input placeholder={messages['common.placeholder']} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='description'
                                    label={messages['user.description']}>
                                    <Input placeholder={messages['common.desPlaceholder']} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} >
                                <div className='promo-rightbtn'>
                                    <Button type='primary' htmlType='submit'>
                                        {messages['common.btn']}
                                    </Button>
                                    <Button className='lis-btn'
                                        onClick={() => {
                                            form.resetFields();
                                            dispatch(setFormValues({}))
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






