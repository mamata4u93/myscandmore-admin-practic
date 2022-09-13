
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { useIntl } from 'react-intl';
import { resetSingleData, feachSingleData } from '../../store/CategoriesRedux'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },

];


const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.categorie.singleData)

    let brands = singleData?.brands ? singleData.brands : []
    let influencers = singleData?.influencers ? singleData.influencers : []
    let videos = singleData?.videos ? singleData.videos : []

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

    return (
        <ListWapper>
            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={12} lg={12}>
                    <Space>
                        <Breadcrumb separator='>'>
                            <Breadcrumb.Item>{messages['manage.categories']}</Breadcrumb.Item>
                            <Breadcrumb.Item>{messages['categories.view']}</Breadcrumb.Item>
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
                                src={singleData?.icon}
                            />
                        </Col>
                        <Col xs={24} lg={10} >
                            <div className='promo-detals'>
                                <h5>{messages['manage.name']}</h5>
                                <p>{singleData?.name}</p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <div className='influencers-border'></div>

            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={3} key='collapse-a' ></Col>
                <Col xs={24} lg={18} key='collapse-a' >
                    <div>{messages['brand.manage']}</div>
                    <Space direction='vertical' style={{ width: '100%' }}>
                        <Table columns={columns} dataSource={brands} pagination={false} />
                    </Space>
                </Col>
                <Col xs={24} lg={3} key='collapse-a' ></Col>
            </Row>

            <div className='influencers-border'></div>

            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={3} key='collapse-a' ></Col>
                <Col xs={24} lg={18} key='collapse-a' >
                    <div>{messages['common.influencersTitle']}</div>
                    <Space direction='vertical' style={{ width: '100%' }}>
                        <Table columns={columns} dataSource={influencers} pagination={false} />
                    </Space>
                </Col>
                <Col xs={24} lg={3} key='collapse-a' ></Col>
            </Row>

        </ListWapper>
    );
};


export default Details;