import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col,  Space, Image,} from 'antd';
import ListWapper from "../../common/ListWapper";
import { useIntl } from 'react-intl';
import { AiFillEdit } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { getProfile } from '../../../store/AuthRedux'

const ViewProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { messages } = useIntl()
    const token = useSelector((state) => state.auth.token)
    const userdata = useSelector((state) => state.auth.userdata)
    console.log(userdata)

    useEffect(() => {
        dispatch(getProfile({ token }))
    }, [])

    return (
        <ListWapper>
            <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                <Col xs={24} lg={24} >
                    <div className='profile-border'>
                        <Row>
                            <Col span={12} >
                                <Space>
                                    <Breadcrumb separator='>'>
                                        <Breadcrumb.Item>{messages['sidebar.app.dashboard']}</Breadcrumb.Item>
                                        <Breadcrumb.Item>{messages['view profile']}</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Space>
                            </Col>
                            <Col span={12} >
                            <div className='promo-rightbtn'>
                                <Button type='primary' danger  onClick={() => navigate('/dashboards/editProfile')}><AiFillEdit size={17} />{messages['disco.edit']}
                                </Button>
                           </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={24} lg={8} >
                    <div className='profile-img'>
                    <Image
                        width={130}
                        height={130}
                        src={userdata?.profile?.profileURL}
                    />
                    </div>
                </Col>
                <Col xs={24} lg={8} >
                    <div className='profile-user'>
                    <h5><b>{messages['common.name']}</b></h5>
                    <p>{userdata?.profile?.name}</p>
                    <br />
                    <h5>{messages['profile.username']}</h5>
                    <p>{userdata?.email}</p>
                    
                    </div>
                </Col>
                <Col xs={24} lg={8} >
                <div className='profile-user'>
                    <h5><b>{messages['user.details']}</b></h5>
                    <p>{userdata?.profile?._id}</p>
                    <br />
                    <h5><b>{messages['view contact']}</b></h5>
                    <p>{userdata?.phone}</p>
                    <h5><b>Address</b></h5>
                    <p>{userdata?.currentAddress}</p>
                    </div>
                </Col>
            </Row>
        </ListWapper>
    );
};


export default ViewProfile;