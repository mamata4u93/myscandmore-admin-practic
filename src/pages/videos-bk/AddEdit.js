import React, { useEffect, useRef, createRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Select, Radio } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useIntl } from 'react-intl';
import LoadingWapper from "../common/LoadingWapper";
import ListWapper from "../common/ListWapper";
import UploadImage from "../common/UploadImage";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData, addNewData, editData } from '../../store/VideosRedux'
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
    const singleData = useSelector((state) => state.video.singleData)
    const isEditData = useSelector((state) => state.video.isEditData)
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
            navigate('/videos/list');
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
                                    <Breadcrumb.Item>{messages['sidebar.app.Managevideos']}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{params.id ? "Edit" : "Add"} {messages['videos.new']}</Breadcrumb.Item>
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
                                    name='brandId'
                                    label={messages['select.brand']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['brand.errormsg']],
                                        },
                                    ]}>
                                    <Select
                                        showSearch
                                        onSearch={text => searchBrands(text)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder={messages['select.brand']}>
                                        {brandLists ? brandLists.map((item, key) => <Option key={item._id}>{item.name}</Option>) : null}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    name='influencerId'
                                    label={messages['upload.influencers']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['promo.influencer']],
                                        },
                                    ]}>
                                    <Select
                                        showSearch
                                        onSearch={text => searchInfluencers(text)}
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder={messages['upload.influencers']}>
                                        {influencerLists ? influencerLists.map((item, key) => <Option key={item._id}>{item.name}</Option>) : null}
                                    </Select>
                                </Form.Item>




                                <Form.Item {...formTailLayout}
                                    name='image'
                                    label={messages['videos.disco']}
                                    rules={[
                                        {
                                            required: true,
                                            message: [messages['upload.video']],
                                        },
                                    ]}>
                                    <UploadImage />
                                </Form.Item>

                                <Form.Item
                                    {...tailLayout}>
                                    <Space size='large' >
                                        <Button onClick={() => navigate(-1)} type='primary' htmlType='submit'>{messages['brand.back']}</Button>
                                        <Button type='primary' htmlType='submit'>{params.id ? messages['common.update'] : messages['brand.finish']}</Button>
                                        <Button onClick={() => navigate(-1)}>{messages['common.cancel']}</Button>
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