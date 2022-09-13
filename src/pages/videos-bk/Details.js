
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, Form, Tabs, Card, List ,Table} from 'antd';

import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import { AiFillBackward } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { resetSingleData, feachSingleData } from '../../store/VideosRedux'

const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.video.singleData)
    const singleres = useSelector((state) => state.auth.singleres)
    const TabPane = Tabs.TabPane;

    // console.log(singleData)
    let categories = singleData?.categories ? singleData.categories : []
    let hashtags = singleData?.hashtags ? singleData.hashtags : []

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: 'age',
        },
       
    ];

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

    const data = [
        {
            title: messages['disco.nike'],
        },
        {
            title: messages['disco.sleeve'],
        },
        {
            title: messages['disco.joggers'],
        },
        {
            title: messages['disco.hat'],
        },
        {
            title: messages['disco.ultra'],
        },

    ]

    const onFinish = (values) => {
        // console.log(values)
    };



    return (<ListWapper>
        <Form name='dynamic_rule' onFinish={onFinish}>
            <Card className='user-card user-card-lg' >
                <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                    <Col xs={12} lg={12} key='collapse-a'>
                        <Space>
                            <Breadcrumb separator='>'>
                                <Breadcrumb.Item>{messages['sidebar.app.Managevideos']}</Breadcrumb.Item>
                                <Breadcrumb.Item>{messages['view.video']}</Breadcrumb.Item>
                                <Breadcrumb.Item>{messages['disco.video']}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Space>
                    </Col>
                    <Col xs={12} lg={12} key='collapse-a'>
                        <Space size='large' className='influencers-view'>
                            <Button type='primary' htmlType='submit' >{messages['disco.edit']}</Button>
                        </Space>
                    </Col>
                </Row>
                <div className='common-border'></div>
                <Tabs defaultActiveKey='1' centered>


                    <TabPane tab='Video' key='1'  >
                        <Row>
                            <Col span={12} offset={6}>
                                <ReactPlayer
                                    width={400}
                                    height={400}
                                    controls={true}
                                    url='https://www.facebook.com/facebook/videos/10153231379946729/'
                                />
                            </Col>
                        </Row>

                    </TabPane>
                    <TabPane tab='Products' key='2'>
                        <Space direction='vertical' className='promo-form'>
                            <List
                                itemLayout='horizontal'
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    width={70}
                                                    height={70}
                                                    src='error'
                                                    fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
                                                />
                                            }
                                            title={<a href='https://ant.design'>{item.title}</a>}
                                            description='7,999'
                                        />
                                        <a href='#' className='categories-tooltip'>{messages['common.visitBtn']}</a>
                                    </List.Item>
                                )}
                            />
                        </Space>
                    </TabPane>
                    <TabPane tab='Description' key='3'>
                        <Row gutter={{ xs: 20, sm: 16, md: 32 }} >
                            <Col xs={24} lg={2} key='collapse-a' ></Col>
                            <Col xs={24} lg={10} key='collapse-a' >
                                <div className="promo-detals">
                                    <h5> {messages['disco.fashion']}</h5>
                                    <p>{singleData?.title}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['brand.manage']}</h5>
                                    <p>{messages['disco.nikes']}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['dashboard.categories']}</h5>
                                    <p>{messages['disco.technology']}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['disco.product']}</h5>
                                    <p><a href='#'>{messages['disco.redmore']}</a></p>
                                </div>
                                <div className="promo-detals">
                                    <h5> {messages['sidebar.dataDisplay.comment']}</h5>
                                    <p>{messages['disco.numbers']}</p>
                                </div>
                            </Col>
                            <Col xs={24} lg={9} key='collapse-a' >
                                <div className="promo-detals">
                                    <h5>{messages['disco.description']}</h5>
                                    <p>{messages['influencers.paragraf']}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['disco.influencer']}</h5>
                                    <p>{singleData?.influencer?.name}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['disco.hashtags']}</h5>
                                    <p>{messages['disco.style']}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['common.likes']}</h5>
                                    <p>{singleData?.likes}</p>
                                </div>
                                <div className="promo-detals">
                                    <h5>{messages['common.shares']}</h5>
                                    <p>{messages['disco.numbers']}</p>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>

                <div className='commons-border'></div>
                <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                    <Col xs={24} lg={3} key='collapse-a' ></Col>
                    <Col xs={24} lg={18} key='collapse-a' >
                        <div>{messages['manage.view']}</div>
                        <br />
                        <br />
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Table columns={columns} dataSource={categories} />
                        </Space>
                    </Col>
                    <Col xs={24} lg={3} key='collapse-a' ></Col>
                </Row>
                <div className='commons-border'></div>
                <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
                    <Col xs={24} lg={3} key='collapse-a' ></Col>
                    <Col xs={24} lg={18} key='collapse-a' >
                        <div>{messages['hashtags.name']}</div>
                        <br />
                        <br />
                        <Space direction='vertical' style={{ width: '100%' }}>
                            <Table columns={columns} dataSource={hashtags} />
                        </Space>
                    </Col>
                    <Col xs={24} lg={3} key='collapse-a' ></Col>
                </Row>


            </Card>
        </Form>
    </ListWapper>
    );
};


export default Details;