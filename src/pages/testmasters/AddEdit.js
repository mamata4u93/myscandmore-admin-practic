import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Select, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import Selectbox from "../common/AntForms/SelectBox";
import UploadImage from "../common/UploadImage";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/TestmastersRedux'
import { feachAllAdminsData } from '../../store/AdminsRedux'
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
    const singleData = useSelector((state) => state.testmasters?.singleData)
    const isEditData = useSelector((state) => state.testmasters?.isEditData)
    const brandLists = useSelector((state) => state.brand?.dataLists?.data)
    const testmastersLists = useSelector((state) => state.testmasters?.dataLists?.data)
    const promoLists = useSelector((state) => state.promo?.dataLists?.data)

    const recommendedFor = ['Male', 'Female']

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
        // let params = { recommendedFor: recommendedFor[value] }
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
            navigate('/testmasters/list');
        }
    }, [isEditData]);



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
                                    <Breadcrumb.Item>{messages['influencers.influencer']}</Breadcrumb.Item>
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
                                    name='title'
                                    label='Test Title'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['error.name']],
                                        },
                                    ]}>
                                    <Input placeholder={messages['common.searchere']} />
                                </Form.Item>


                                <Form.Item
                                    {...formItemLayout}
                                    name='name'
                                    label={messages['common.name']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['error.name']],
                                        },
                                    ]}>
                                    <Input placeholder={messages['common.searchere']} />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='reportTime'
                                    label='Report Time'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['error.name']],
                                        },
                                    ]}>
                                    <Input placeholder='Report Time' />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='fastingTime'
                                    label='Fasting Time'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Fasting Time',
                                        },
                                    ]}>
                                    <Input placeholder='Fasting Time' />
                                </Form.Item>

                                <Form.Item
                                 {...formItemLayout}
                                    name="recommendedFor"
                                    label="Recommended For"
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select gender!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="select your gender">
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                      
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='recommendedAge'
                                    label='Recommended Age'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Recommended Age',
                                        },
                                    ]}>
                                    <Input placeholder='Recommended Age' />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='paramatersIncluded'
                                    label='Paramaters Included'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Paramaters Included',
                                        },
                                    ]}>
                                    <Input placeholder='Paramaters Included' />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='faqs'
                                    label='Faqs'
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Faqs',
                                        },
                                    ]}>
                                    <Input placeholder='Faqs' />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='description'
                                    label={messages['common.description']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.description']],

                                        },
                                    ]}>
                                    <TextArea placeholder={messages['enter.description']} rows={4} />
                                </Form.Item>


                                <Form.Item
                                 {...formItemLayout}
                                    name="type"
                                    label="Type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select type!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="select your type">
                                        <Option value="male">Tests</Option>
                                        <Option value="female">Groups</Option>
                                        <Option value="other">Scans</Option>
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