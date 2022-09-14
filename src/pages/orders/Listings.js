import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col, Space, Popconfirm } from 'antd';
import ListWapper from "../common/ListWapper";
import StandardTable from '../common/StandardTable';
import { useIntl } from 'react-intl';
import { IoMdAdd } from 'react-icons/io';
import { DoubleRightOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { feachAllData, deleteData, setFormValues } from '../../store/OrdersRedux'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';

const Listings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const { messages } = useIntl()
    const timer = useRef(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const token = useSelector((state) => state.auth.token)
    const formValues = useSelector((state) => state.orders.formValues)
    const isFetching = useSelector((state) => state.orders.isFetching)
    const dataLists = useSelector((state) => state.orders.dataLists)

    const dateFormat = 'YYYY-MM-DD';

    console.log(dataLists)
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
            if (values.name === undefined && values.description === undefined) {
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
            title: 'Order Id',
            dataIndex: 'orderID',
            key: 'name',
            // width: 250,
            width: 100,
            fixed: 'left',

        },
        {
            title: 'Customer Name',
            dataIndex: 'labName',
            key: 'age',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Date',
            dataIndex: 'updatedAt',
            key: 'address 1',
            ellipsis: true,
            render: (item) => <div>{moment.utc(item).format(dateFormat)}</div>
        },
        {
            title: 'Items',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Test Center',
            dataIndex: 'testCenterName',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Coll. Type',
            dataIndex: 'collType',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Booking Slot',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Price',
            dataIndex: 'total',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Coupons',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Payment Method',
            dataIndex: 'paymentMode',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Reports',
            dataIndex: 'reports',
            key: 'address 2',
            ellipsis: true,

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'address 2',
            ellipsis: true,
            fixed: 'right',
            width: 100,


        },
        {
            title: messages['common.action'],
            key: 'action',
            render: (text, record) => (

                <Space size='middle'>
                    <DoubleRightOutlined className='promo-detail' onClick={() => navigate(`/orders/view/${record._id}`)} />
                    <EditOutlined className='promo-edit' onClick={() => navigate(`/orders/edit/${record._id}`)} />
                    <Popconfirm
                        title="Are you sure delete this?"
                        onConfirm={() => deleteItem(record)}
                        okText="Yes"
                        cancelText="No"><DeleteOutlined className='promo-delete' />
                    </Popconfirm>
                </Space>
            ),
            fixed: 'right',
            width: 100,
        },

    ];

    return (
        <>
            <Row>
                <Col span={12}>
                    <h3>{messages['sidebar.app.Manageorders']}</h3>
                </Col>
                <Col span={12} >
                    <div className='promo-backbtn'>
                        <Button type='primary' danger onClick={() => navigate('/orders/add')}><IoMdAdd size={17} />{messages['add.new']} </Button>
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
                                    label={messages['orders.title']}>
                                    <Input placeholder={messages['common.placeholder']} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='description'
                                    label={messages['orders.description']}>
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
                        loading={isFetching}
                        data={{ list: dataLists.data, count: dataLists.totalCount, pagination: { pageSize: 10 } }}
                        columns={columns}
                        pageOnChange={(page) => handlePageChange(null, page)}
                        onSelectRow={(rows) => setSelectedRows(rows)}
                        scroll={{
                            x: 1500,
                            y: 300,
                        }}
                    />
                </Space>
            </ListWapper>
        </>
    );
};

export default Listings;






