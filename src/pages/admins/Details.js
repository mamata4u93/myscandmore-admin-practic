
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AiFillBackward } from "react-icons/ai";
import { resetSingleData, feachSingleData } from '../../store/AdminsRedux'

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.admins.singleData)

    console.log(singleData)
    let influencers = singleData?.influencers ? singleData.influencers : []
    let currentPromo = singleData?.currentPromo ? singleData.currentPromo : []

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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },

    ];
    const columnsPromp = [
        {
            title: 'Name',
            dataIndex: 'title',
        },
        {
            title: messages['common.description'],
            dataIndex: 'description',
        },

    ];

    return (<ListWapper>

        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
            <Col xs={12} lg={12}>
                <Space>
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>View Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>View Details</Breadcrumb.Item>
                    </Breadcrumb>
                </Space>
            </Col>
            <Col xs={12} lg={12} >
                <div className='promo-backbtn'>
                    <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                </div>
            </Col>
           
        </Row>

        <div className='influencers-border'></div>

        {/* <Row gutter={{ xs: 16, sm: 16, md: 32 }}> */}
        <Row>
            <Col span={8} >
                <div>Name</div>
                <div>{singleData?.profile?.name}</div>
            </Col>
            <Col span={8} >
                <div>Email</div>
                <div>{singleData?.email}</div>

            </Col>
            <Col span={8} >
                <div>Phone</div>
                <div>{singleData?.phone}</div>
            </Col>
        </Row>
        <div className='influencers-border'></div>

        <Row>
            <Col span={8} >
                <div>Address</div>
                <div>{singleData?.currentAddress}</div>
            </Col>
            <Col span={8} >
                <div>Status</div>
                <div>{singleData?.status}</div>

            </Col>
            <Col span={8} >
                <div>Actions</div>
                <Button onClick={() => navigate(`/admins/edit/:id`)}>Edit</Button>
            </Col>
        </Row>
        {/* </Row> */}

    </ListWapper>
    );
};


export default Details;