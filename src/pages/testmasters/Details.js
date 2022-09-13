
import React, { useEffect, useState, useRef } from 'react';
import { Button, Breadcrumb, Form, Row, Col, Input, Space, Image, Table, Tag, Typography} from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import { resetSingleData, feachSingleData } from '../../store/TestmastersRedux'

const { Paragraph, Text } = Typography;
const dateFormat = 'YYYY-MM-DD';
const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.testmasters.singleData)
    let brands = singleData?.brands ? singleData.brands : []
    console.log(singleData)

    useEffect(() => {
        if (params.id) {
            dispatch(feachSingleData({ ...params, token }))
        }
        return () => {
            dispatch(resetSingleData(null))
        }
    }, []);

    // const columns = [
    //     {
    //         title: messages['upload.brands'],
    //         dataIndex: 'name',
    //     },
    //     {
    //         title: messages['common.description'],
    //         dataIndex: 'description',
    //     },
    //     {
    //         title: 'Type',
    //         dataIndex: 'type',
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (_, record) => (
    //           <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //           </Space>
    //         ),
    //       },
    //     {
    //         title: messages['promo.added'],
    //         dataIndex: 'createdAt',
    //         render: (item) => <div>{moment.utc(item).format(dateFormat)}</div>
    //     },

    // ];

    return (<ListWapper>
        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
            <Col xs={12} lg={12}>
                <Space>
                    <Breadcrumb separator='>'>
                        <Breadcrumb.Item>Mannage Test Master</Breadcrumb.Item>
                        <Breadcrumb.Item>View Test Master</Breadcrumb.Item>

                    </Breadcrumb>
                </Space>
            </Col>
            <Col xs={12} lg={12} >
                <div className='promo-backbtn'>
                    <Button type='primary' danger onClick={() => navigate(-1)}><AiFillBackward size={17} />{messages['brand.back']}</Button>
                </div>
            </Col>
            {/* <Table columns={columns}  /> */}
            <Col xs={24} lg={24}>
                <Row gutter={{ xs: 20, sm: 16, md: 32 }} >
                    <Col xs={24} lg={8} >
                        <div className='promo-detals'>
                            <h5>Name</h5>
                            <p>{singleData?.name}</p>
                        </div>
                    </Col>
                    
                    <Col xs={24} lg={8} >

                        <div className='promo-detals'>
                            <h5>Type</h5>
                            <p>{singleData?.type}</p>
                        </div>

                    </Col>
                    <Col xs={24} lg={8} >
                        <div className='promo-detals'>
                            <h5>Action</h5>
                            <Button type='primary' danger onClick={() => navigate(`/testmasters/edit/${singleData._id}`)}>Edit</Button>
                        </div>
                    </Col>
                    

                </Row>
                <Row>
                <Col xs={24} lg={24} >
                        <div className='promo-detals'>
                            <h5>Description</h5>
                            <p dangerouslySetInnerHTML={{ __html: singleData?.description}}></p>
                        </div>

                    </Col> 
                </Row>
            </Col>
        </Row>

        <div className='influencers-border'></div>

       
    </ListWapper>
    );
};


export default Details;