import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Select, Tooltip, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import Selectbox from "../common/AntForms/SelectBox";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/HashtagsRedux'
import { feachAllAdminsData } from '../../store/AdminsRedux'
import { feachAllTestmastersData } from '../../store/TestmastersRedux'

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
    const singleData = useSelector((state) => state.hashtag.singleData)
    const isEditData = useSelector((state) => state.hashtag.isEditData)
    const brandLists = useSelector((state) => state.brand?.dataLists?.data)
    const influencerLists = useSelector((state) => state.influencer?.dataLists?.data)


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
            navigate('/hashtags/list');
        }
    }, [isEditData]);


    // Search Brands
    const searchBrands = (val) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (val) {
                dispatch(feachAllAdminsData({ name: val, token }))
            }
        }, 500)
    }

    // Search Influencers
    const searchInfluencers = (val) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            if (val) {
                dispatch(feachAllTestmastersData({ name: val, token }))
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
                    <div className='profile-border'>
                        <Row>
                            <Col span={12} >
                                <Space>
                                    <Breadcrumb separator='>'>
                                        <Breadcrumb.Item>{messages['manage.hashtags']}</Breadcrumb.Item>
                                        <Breadcrumb.Item>{params.id ? "Edit" : "Add"}{messages['hashtags.new']}</Breadcrumb.Item>
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
                                    label={messages['hashtags.manage']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['enter.name']],
                                        },
                                    ]}>
                                    <Input placeholder={messages['hashtags.star']} />
                                </Form.Item>

                                <Form.Item

                                    {...formItemLayout}
                                    name='brands'
                                    label={messages['brand.manage']}

                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['brand.errormsg']],
                                        },
                                    ]}>
                                    <Selectbox mode="multiple" title="name" placeholder={messages['upload.influencers']} data={brandLists} searchPromo={searchBrands} />
                                </Form.Item>


                                <Form.Item

                                    {...formItemLayout}
                                    name='influencers'
                                    label={messages['brand.influencers']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.influencer']],
                                        },
                                    ]}>
                                    <Selectbox mode="multiple" title="name" placeholder={messages['upload.influencers']} data={influencerLists} searchPromo={searchInfluencers} />
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