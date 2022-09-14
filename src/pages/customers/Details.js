
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData } from '../../store/CustomersRedux'

const dateFormat = 'YYYY-MM-DD HH:mm';

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.promo.singleData)

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
                        <Breadcrumb.Item>{messages['sidebar.app.promotions']}</Breadcrumb.Item>
                        <Breadcrumb.Item>{messages['Promotion.details']}</Breadcrumb.Item>
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
                        <Image preview={false} className='prom-img'
                            src={singleData?.image}
                        />
                    </Col>
                    <Col xs={24} lg={10} >
                        {singleData?.brand && (
                            <div className='promo-detals'>
                                <h5>{messages['disco.brand']}</h5>
                                <p>{singleData?.brand?.name}</p>
                            </div>
                        )}
                        {singleData?.influencer && (
                            <div className='promo-detals'>
                                <h5>{'Influencer'}</h5>
                                <p>{singleData?.influencer?.name}</p>
                            </div>
                        )}
                        <div className='promo-detals'>
                            <h5>{messages['banner.titel']}</h5>
                            <p>{singleData?.title}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{messages['common.description']}</h5>
                            <p>{singleData?.description}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{messages['button.type']}</h5>
                            <p>{singleData?.buttonType}</p>
                        </div>
                    </Col>
                    <Col xs={24} lg={9} >
                        <div className='promo-detals'>
                            <h5>{'More Title'}</h5>
                            <p>{singleData?.moreTitle}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'More Description'}</h5>
                            <p>{singleData?.moreDescription}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'URL'}</h5>
                            <p>{singleData?.url}</p>
                        </div>
                        <div className='promo-detals'>
                            <h5>{'Date'}</h5>
                            <p>{moment.utc(singleData?.date).format(dateFormat)}</p>
                        </div>

                    </Col>

                </Row>
            </Col>

        </Row>
    </ListWapper>
    );
};


export default Details;