import {
  EditOutlined,
  DeleteOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import { useQuery } from "react-query";
import Portal from "components/Portal";
import { Button, Table, Row, Col, Space, InputNumber, Card } from "antd";

import { getList } from "./api";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { VideoModal } from "./createVideo";

import "./videos.css";
import { VideoDetailsModal } from "./videoDetailsModal";

const Videos = () => {
  function onChange(value) {
    console.log("changed", value);
  }

  const token = useSelector((state) => state.auth.token)

  const { data, isLoading, isFetching } = useQuery(
    ["getVideos", token],
    getList
  );

  const [showModal, setShowModal] = useState(false);
  const [showVideoDetailsModal, setShowVideoDetailsModal] = useState(false);

  const columns = [
    {
      sorter: {},
      width: 150,
      key: "video title",
      dataIndex: "title",
      title: "Video Title",
    },
    {
      width: 150,
      key: "views",
      title: "Views",
      dataIndex: "__v",
    },
    {
      key: "likes",
      title: "Likes",
      ellipsis: true,
      dataIndex: "likes",
    },
    {
      title: "Brand",
      key: "brand id",
      ellipsis: true,
      dataIndex: "brandId",
    },
    {
      ellipsis: true,
      key: "influencer",
      title: "Influencers",
      dataIndex: "influncerId",
    },
    {
      ellipsis: true,
      key: "categories",
      title: "Categories",
      dataIndex: "categories",
    },
    {
      key: "hashtags",
      ellipsis: true,
      title: "Hashtags",
      dataIndex: "hashtags",
      render: (res) => <div>{res ? "Active" : "Inactive"}</div>,
    },
    {
      ellipsis: true,
      key: "updatedAt",
      title: "Date Added",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <DoubleRightOutlined style={{ color: "#52c41a" }} />
          <EditOutlined style={{ color: "blue" }} />
          <DeleteOutlined style={{ color: "orange" }} />
        </Space>
      ),
    },
  ];
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ position: "relative" }}>
      <Card className="user-card user-card-lg">
        <h5>Manage Videos</h5>
        <hr style={{ margin: "30px 0" }} />
        <Row gutter={{ xs: 16, sm: 16, md: 32 }}>
          <Col xs={12} lg={12} key="collapse-a">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setShowVideoDetailsModal(true)}
            >
              Add New Video
            </Button>
          </Col>
          <Col xs={12} lg={12} key="collapse-a" style={{ textAlign: "right" }}>
            <Space>
              Sort by
              <Space>
                <InputNumber
                  min={0}
                  max={10}
                  step={0.1}
                  placeholder="All"
                  onChange={onChange}
                  style={{
                    width: 200,
                  }}
                />
              </Space>
              <BsSearch
                style={{
                  margin: "0 10px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              />
            </Space>
          </Col>
          <Table columns={columns} dataSource={data?.data?.data} />
        </Row>
        <Portal open={showModal}>
          <VideoModal setOpen={setShowModal} />
        </Portal>
      </Card>
      {showVideoDetailsModal && (
        <VideoDetailsModal
          setOpen={setShowModal}
          setCloseSelf={setShowVideoDetailsModal}
        />
      )}
    </div>
  );
};

export default Videos;
