import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Select, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import SingleDate from "../common/AntForms/DateTime";
import Selectbox from "../common/AntForms/SelectBox";
import UploadImage from "../common/UploadImage";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/PromosRedux'
import { feachAllAdminsData } from '../../store/AdminsRedux'
import { feachAllTestmastersData } from '../../store/TestmastersRedux'

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
    const singleData = useSelector((state) => state.promo.singleData)
    const isEditData = useSelector((state) => state.promo.isEditData)
    const brandLists = useSelector((state) => state.brand?.dataLists?.data)
    const influencerLists = useSelector((state) => state.influencer?.dataLists?.data)
    const typeLists = [{ _id: 'influencer', title: messages['brand.influencers'] }, { _id: 'brand', title: messages['brand.manage'] }]
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
            navigate('/promotions/list');
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
                    <Row>
                        <Col span={12} >
                            <Space>
                                <Breadcrumb separator='>'>
                                    <Breadcrumb.Item>{messages['sidebar.app.promotions']}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{params.id ? "Edit" : "Add"}{messages['promo.banner']}</Breadcrumb.Item>
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

                                {!params.id && (
                                    <Form.Item
                                        {...formItemLayout}
                                        name='type'
                                        label={messages['select.influencer']}
                                        rules={[
                                            {
                                                required: true,
                                                message: [messages['promo.select']],

                                            },
                                        ]}>
                                        <Selectbox title="title" placeholder={messages['disco.type']} data={typeLists} />
                                    </Form.Item>)}

                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}>
                                    {({ getFieldValue }) => {
                                        if (getFieldValue('type') === 'influencer') {
                                            return <Form.Item
                                                {...formItemLayout}
                                                name='influencerId'
                                                label={messages['brand.influencers']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: [messages['Promo.influencer']],
                                                    },
                                                ]}>
                                                <Selectbox title="name" placeholder={messages['upload.influencers']} data={influencerLists} searchPromo={searchInfluencers} />
                                            </Form.Item>
                                        }
                                        if (getFieldValue('type') === 'brand') {
                                            return <Form.Item
                                                {...formItemLayout}
                                                name='brandId'
                                                label={messages['brand.manage']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: [messages['Promo.brands']],
                                                    },
                                                ]}>
                                                <Selectbox title="name" placeholder={messages['select.brand']} data={brandLists} searchPromo={searchBrands} />
                                            </Form.Item>
                                        }
                                    }}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='title'
                                    label={messages['common.bannerTitle']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['common.searchHere']],
                                        },
                                    ]}>
                                    <Input placeholder={messages['common.searchere']} />
                                </Form.Item>
                                <Form.Item {...formTailLayout}
                                    name='image'
                                    label={messages['brand.uplode']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['brand.profile']],
                                        },
                                    ]}>
                                    <UploadImage />
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
                                    name='buttonType'
                                    label={messages['button.type']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.select']],
                                        },
                                    ]}>
                                    <Radio.Group>
                                        <Radio value={'more'}>{messages['common.knowBut']}</Radio>
                                        <Radio value={'visit'}>{messages['common.visitBtn']}</Radio>
                                        <Radio value={'reminder'}>{messages['common.reminderBtn']}</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='moreTitle'
                                    label={messages['common.title']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['title.please']],
                                        },
                                    ]}>
                                    <Input placeholder={messages['user.text']} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='moreDescription'
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
                                    name='url'
                                    label={messages['title.url']}
                                    getValueFromEvent={e => (e.target.value).trimStart()}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['Please.url']],
                                        },
                                    ]}>
                                    <Input  placeholder={messages['upload.url']} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name='date'
                                    label={messages['common.date']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['disco.messages']],
                                        },
                                    ]}>
                                    <SingleDate />
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