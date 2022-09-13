import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import UploadImage from "../common/UploadImage";
import Selectbox from "../common/AntForms/SelectBox";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/UsersRedux'


const AddEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const pageActive = useRef(false);
    const formRef = createRef();
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.users.singleData)
    const isEditData = useSelector((state) => state.users.isEditData)
    const genderLists = [{ _id: 'male', name: 'Male' }, { _id: 'female', name: 'Female' }, { _id: 'others', name: 'Others' }]

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
        values.profile = { name: values.name, age: values.age, avatar: values.avatar, gender: values.gender }

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
            navigate('/userstions/list');
        }
    }, [isEditData]);


    if (singleData == null) {
        return <LoadingWapper />
    }

    return (
        <ListWapper>
            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={24} >
                    <div className='profile-border'>
                        <Row>
                            <Col span={12} >
                                <Space>
                                    <Breadcrumb separator='>'>
                                        <Breadcrumb.Item>{messages['sidebar.app.manageusers']}</Breadcrumb.Item>
                                        <Breadcrumb.Item>{params.id ? "Edit" : "Add"}{' User'}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Space>
                            </Col>
                            <Col span={12} >
                                <div className='promo-rightbtn'>
                                    <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                                </div>
                            </Col>

                        </Row>
                    </div>
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
                                    label={messages['common.name']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['validation.nameRequired']],
                                        },
                                    ]}>
                                    <Input placeholder={'Name'} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='age'
                                    label={messages['user.age']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['error.age']],
                                        },
                                    ]}>
                                    <Input type={'number'} placeholder={messages['user.age']} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='avatar'
                                    label={messages['profile.image']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['user.avatar']],
                                        },
                                    ]}>
                                    <UploadImage />
                                </Form.Item>

                                <Form.Item

                                    {...formItemLayout}
                                    name='gender'
                                    label={messages['user.gender']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['error.gender']],
                                        },
                                    ]}>
                                    <Selectbox title="name" placeholder={'select gender'} data={genderLists} />
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