import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Select, Upload } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import UploadImage from "../common/UploadImage";
import Selectbox from "../common/AntForms/SelectBox";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/AdminsRedux'
import { feachAllTestmastersData } from '../../store/TestmastersRedux'
import { feachAllData } from '../../store/PromosRedux'

const { TextArea } = Input;
const { Option } = Select;

const AddEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const timer = useRef(null);
    const pageActive = useRef(false);
    const formRef = createRef();
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.admins.singleData)
    const isEditData = useSelector((state) => state.admins.isEditData)
    const influencerLists = useSelector((state) => state.influencer?.dataLists?.data)
    const promoLists = useSelector((state) => state.promo?.dataLists?.data)

    useEffect(() => {
        // Load Edit Data
        if (params.id) {
            dispatch(feachSingleData({ ...params, token }))
        }
        // Reset Date in Add
        if (!params.id) {
            dispatch(resetSingleData({}))
        }
        // Reset Date When Exit From
        return () => {
            dispatch(resetSingleData(null))
        }
    }, []);

    const onFinish = (values) => {
        values.profile = { "name": values.name }
        // Save Edit Data
        if (params.id) {
            dispatch(editData({ ...singleData, ...values, token }))
        }

        // Add New Data
        if (!params.id) {
            dispatch(addNewData({ ...values, token }))
        }
        pageActive.current = true
    };

    // Redirect After Add/Edit
    useEffect(() => {
        if (isEditData && pageActive.current) {
            pageActive.current = false
            navigate('/admins/list');
        }
    }, [isEditData]);


    useEffect(() => {
        if (singleData && singleData.influencers) {
            searchInfluencers(null)
        }
        if (singleData && singleData.currentPromo) {
            searchPromo(null)
        }
    }, [singleData]);

    // Search Influencers
    const searchInfluencers = (val) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (val || val == null) {
                dispatch(feachAllTestmastersData({ name: val, token }))
            }
        }, 500)
    }

    // Search Promo
    const searchPromo = (val) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (val || val == null) {
                dispatch(feachAllData({ name: val, token }))
            }
        }, 500)
    }

    if (singleData == null) {
        return <LoadingWapper />
    }

    return (
        <ListWapper>
            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={24} >
                    <Row>
                        <Col span={12} >
                            <Space>
                                <Breadcrumb separator='>'>
                                    <Breadcrumb.Item>{messages['brand.manages']}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{params.id ? "Edit" : "Add"} Details</Breadcrumb.Item>
                                </Breadcrumb>
                            </Space>
                        </Col>
                        <Col span={12} >
                            <div className='promo-rightbtn'>
                                <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col xs={24} lg={24}>
                    <Form
                        ref={formRef}
                        initialValues={singleData}
                        onFinish={onFinish}>
                        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                            <Col xs={24} lg={24}></Col>
                            <Col xs={24} lg={20}>
                                <Form.Item
                                    {...formItemLayout}
                                    name='name'
                                    label='Full Name'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['common.searchHere']],
                                        },
                                    ]}>
                                    <Input placeholder='Name' />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='roles'
                                    label="Role"

                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.influencer']],
                                        },
                                    ]}>

                                    <Select>
                                        <Select.Option value="super-admin">Super Admin</Select.Option>
                                        <Select.Option value="admin">Admin</Select.Option>
                                        <Select.Option value="blocked">Blocked</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item {...formTailLayout} label="Upload" valuePropName="fileList">
                                    <Upload action="/upload.do" listType="picture-card">
                                        <div>

                                            <div
                                                style={{
                                                    marginTop: 8,
                                                }}
                                            >
                                                Upload
                                            </div>
                                        </div>
                                    </Upload>
                                </Form.Item>

                                {/* <Form.Item {...formTailLayout}
                                    name='profileURL'
                                    label='Profile'
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['brand.profile']],
                                        },
                                    ]}>
                                    <UploadImage />
                                </Form.Item> */}


                                <Form.Item
                                    {...formItemLayout}
                                    name='email'
                                    label='Email'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.description']],

                                        },
                                    ]}>
                                    <Input placeholder='Email' />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name="phone"
                                    label="Phone Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder='Phone'
                                        // addonBefore={prefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='currentAddress'
                                    label='Address'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.description']],

                                        },
                                    ]}>
                                    <Input placeholder='Address' />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='password'
                                    label='Password'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    >
                                    <Input placeholder='Password' />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='status'
                                    label="Status"

                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.influencer']],
                                        },
                                    ]}>

                                    <Select>
                                        <Select.Option value="active">active</Select.Option>
                                        <Select.Option value="locked">locked</Select.Option>
                                        <Select.Option value="archive">archive</Select.Option>
                                    </Select>
                                </Form.Item>







                                <Form.Item
                                    {...tailLayout}>
                                    <Space size='large' >
                                        <Button type='primary' htmlType='submit'>{params.id ? messages['common.update'] : messages['common.add']}</Button>
                                        <Button onClick={() => navigate(-1)}>{messages['brand.cancel']}</Button>
                                    </Space>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </ListWapper>
    );
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
    },
};
const formTailLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 12,
        offset: 0,
    },
};

export default AddEdit;