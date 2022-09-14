
import React, { useEffect, } from 'react';
import { Button, Breadcrumb, Row, Col, Space, Image, Form, Carousel, Card, Descriptions } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import ListWapper from "../common/ListWapper";
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AiFillBackward } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { resetSingleData, feachSingleData } from '../../store/OrdersRedux'
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const Details = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { messages } = useIntl();
    const params = useParams()
    const token = useSelector((state) => state.auth.token)
    const singleData = useSelector((state) => state.orders.singleData)

    // let stories = singleData?.stories ? singleData.stories : []

    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //         render: (text) => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Description',
    //         dataIndex: 'description',
    //         key: 'age',
    //     },
    // ];


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
    const onFinish = (values) => {

    };
    return (
        <ListWapper>
           
            <Descriptions title="Patient Details">
                <Descriptions.Item label="Name">{singleData?.patient?.name}</Descriptions.Item>
                <Descriptions.Item label="Gender">{singleData?.patient?.gender}</Descriptions.Item>
                <Descriptions.Item label="DOB">Prepaid</Descriptions.Item>
                <Descriptions.Item label="Telephone">{singleData?.patient?.address?.mobile}</Descriptions.Item>
                <Descriptions.Item label="Slot Date">{moment.utc(singleData?.patient?.slot.date).format(dateFormat)}</Descriptions.Item>
                <Descriptions.Item label="Slot Time">{singleData?.patient?.slot.name}</Descriptions.Item>
                <Descriptions.Item label="Address">{singleData?.patient?.address?.city}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Lab Details">
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Payment Mode">{singleData?.paymentMode}</Descriptions.Item>
                <Descriptions.Item label="PaymentStatus">{singleData?.paymentStatus}</Descriptions.Item>
                <Descriptions.Item label="Order ID">{singleData?.orderID}</Descriptions.Item>
                <Descriptions.Item label="Coll. Type">{singleData?.collType}</Descriptions.Item>
                <Descriptions.Item label="Order Date">$60.00</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Test Details">
                <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Test Price Details">
                <Descriptions.Item label="PET-CT (Positron Emission Tomography-computed tomography">{singleData?.total}</Descriptions.Item>
            </Descriptions>

            <Descriptions title="Order Details">
                <Descriptions.Item label="Discount">{singleData?.discount}</Descriptions.Item>
                <Descriptions.Item label="Home Coll.">{singleData?.homeCollectionCharges}</Descriptions.Item>
                <Descriptions.Item label="Total">{singleData?.total}</Descriptions.Item>
                <Descriptions.Item label="Order Status">{singleData?.status}</Descriptions.Item>
            </Descriptions>
        </ListWapper>
    );
};


export default Details;