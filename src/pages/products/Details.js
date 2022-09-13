
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData } from '../../store/ProductsRedux'

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.product.singleData)

    useEffect(() => {
        // Load Details Data
        if (params.id) {
            dispatch(feachSingleData({ ...params, token }))
        }
        // Reset Date When Exit From Page
        return () => {
            dispatch(resetSingleData(null))
        }
    }, []);

    return (<ListWapper>
        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
            <Col xs={12} lg={12}>
                <Space>
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>{messages['sidebar.app.products']}</Breadcrumb.Item>
                        <Breadcrumb.Item>{'Products Details'}</Breadcrumb.Item>
                    </Breadcrumb>
                </Space>
            </Col>
            <Col xs={12} lg={12} >
                <div className='promo-backbtn'>
                    <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                </div>
            </Col>
            <Col xs={24} lg={24}>
                <Row gutter={{ xs: 20, sm: 16, md: 32 }} >
                    <Col xs={24} lg={4} >
                        <h5>{'Main Image'}</h5>
                        <Image preview={false} className='prom-img'
                            src={singleData?.mainImage}
                        />
                        <h5>{'Grid Image'}</h5>
                        <Image preview={false} className='prom-img'
                            src={singleData?.gridImage}
                        />
                    </Col>
                    <Col xs={24} lg={10} >
                        <div className='promo-detals'>
                            <h5>{'Title'}</h5>
                            <p>{singleData?.title}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{messages['common.description']}</h5>
                            <p>{singleData?.description}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'Original Price'}</h5>
                            <p>{singleData?.price?.original}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'Discounted Price'}</h5>
                            <p>{singleData?.price?.discounted}</p>
                        </div>
                    </Col>
                    <Col xs={24} lg={9} >
                        <div className='promo-detals'>
                            <h5>{'Brand Name'}</h5>
                            <p>{singleData?.brand?.name}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'Shop URL'}</h5>
                            <p>{singleData?.shopURL}</p>
                        </div>
                    </Col>

                </Row>
            </Col>

        </Row>
    </ListWapper>
    );
};


export default Details;