import { message } from "antd";
import { MdOutlineClose } from "react-icons/md";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { UploadForm } from "./uploadVideoForm";
import { useDispatch, useSelector } from "react-redux";
import { VideoDataCard } from "components/videoDataCard";
import { UploadVideoSection } from "./uploadVideoSection";
import {
  addVideoData,
  addVideoDetails,
  deleteVideoCardData,
} from "store/VideoData";

import "./videoStyles.css";
import { useMutation, useQuery } from "react-query";
import { getProducts, getVideoUrl, uploadVideo } from "./api";
import { findIndex } from "lodash";

const initialValue = {
  x: "",
  y: "",
  url: "",
  endTime: "",
  startTime: "",
  gridImage: {},
  mainImage: {},
  productValue: {},
};

const notify = ({ notification, type }) => {
  if (type === "error") message.error(`${notification}`, 5);
  else message.success(`${notification}`, 5);
};

export const VideoModal = ({ setOpen }) => {
  const [video, setVideo] = useState({});
  const [paused, setPaused] = useState(true);
  const [videoURL, setVideoUrl] = useState("");
  const [enableInput, setEnableInput] = useState(false);
  const [videoData, setVideoData] = useState(initialValue);
  const [videoPlayBackTime, setVideoPlayBackTime] = useState(0);
  const [ballDisplayCoordinates, setBallDisplayCoordinates] = useState({
    x: "",
    y: "",
  });
  const [seekTime, setSeekTime] = useState(-1);
  const [editKeyValue, setEditKeyValue] = useState(-1);
  const [showBallEndTime, setShowBallEndTime] = useState(-1);

  const state = useSelector((state) => state.createVideoData);

  const handleChange = (keyValue, value) => {
    const newLoginForm = { ...videoData };
    newLoginForm[keyValue] = value;
    setVideoData(newLoginForm);
  };
  const dispatch = useDispatch();

  const handleCheck = () => {
    const { url, endTime, gridImage, mainImage, startTime, productValue } =
      videoData;
    if (
      url !== "" &&
      endTime !== "" &&
      gridImage &&
      mainImage &&
      productValue?.value
    ) {
      if (endTime < startTime) {
        notify({
          notification: "Please make sure end time is greater than start time",
          type: "error",
        });
        return;
      }

      dispatch(
        addVideoData({
          keyValue: videoData?.startTime,
          productId: videoData?.productValue?.value,
          ...videoData,
        })
      );
      setVideoData(initialValue);
      notify({ notification: "Data Uploaded", type: "success" });
      setEnableInput(false);
    } else
      notify({ notification: "Please fill all required data", type: "error" });
  };

  const handleVideoUpload = (e) => {
    if (e?.target?.files[0]?.name) setVideo(e?.target?.files[0]);
  };

  const handleDelete = (value) => {
    dispatch(deleteVideoCardData({ keyValue: value }));
  };

  const handleSetCoordinates = ({ x, y }) => {
    if (videoData.x === "" && video?.name && !paused)
      setVideoData({
        ...videoData,
        x: x,
        y: y,
      });
    else
      setVideoData({
        ...videoData,
        x: "",
        y: "",
      });
  };

  useEffect(() => {
    if (video?.name) setVideoUrl(URL.createObjectURL(video));
  }, [video]);

  useEffect(() => {
    if (paused && videoData.x !== "") {
      setEnableInput(true);
      setVideoData({ ...videoData, startTime: Math.floor(videoPlayBackTime) });
    }
    if (!paused) {
      setEditKeyValue(-1);
      setEnableInput(false);
      setVideoData(initialValue);
    }
  }, [paused]);

  useEffect(() => {
    if (Math.floor(videoPlayBackTime) in state.videoData) {
      setBallDisplayCoordinates({
        x: state.videoData[Math.floor(videoPlayBackTime)].x,
        y: state.videoData[Math.floor(videoPlayBackTime)].y,
      });
      setShowBallEndTime(
        state.videoData[Math.floor(videoPlayBackTime)].endTime
      );
    }
    if (Math.floor(videoPlayBackTime) === showBallEndTime) {
      setBallDisplayCoordinates({
        x: "",
        y: "",
      });
      setShowBallEndTime(-1);
    }
    if (Math.floor(videoPlayBackTime) > showBallEndTime)
      setBallDisplayCoordinates({
        x: "",
        y: "",
      });
  }, [videoPlayBackTime]);

  useEffect(() => {
    if (editKeyValue !== -1) {
      setPaused(true);
      setVideoData({ ...state?.videoData[editKeyValue] });
    }
  }, [editKeyValue, seekTime]);

  const token = useSelector((state) => state.auth.token);

  const [serverKey, setServerKey] = useState("");
  const [serverFields, setServerFields] = useState({});

  const { data: serverVideoUrl, isLoading: gettingVideoUrl } = useQuery(
    ["getVideoUrl", { fileName: video?.name, token: token }],
    getVideoUrl,
    {
      enabled: !!video?.name,
      onSuccess: async (res) => {
        if (res.status !== 200)
          notify({
            notification: "Something went wrong please try again",
            type: "error",
          });
        else {
          if (res.data.key !== serverKey) {
            dispatch(
              addVideoDetails({
                ...state?.videoDetails,
                videoUrl: res.data.url,
                videoKey: res.data.fields.key,
              })
            );
            setServerFields(res.data.fields);
            setServerKey(res.data.fields.key);
          }
        }
      },
    }
  );

  const { mutate: videoUpload, isLoading: uploadingVideo } = useMutation(
    uploadVideo,
    {
      onSuccess: async (res) => {},
    }
  );

  const uploadData = () => {
    videoUpload({
      ...serverFields,
      file: video,
    });
  };

  const [searchProduct, setSearchProduct] = useState("");

  const { data: products, isLoading: gettingProducts } = useQuery(
    ["getProducts", { search: searchProduct, token: token }],
    getProducts,
    {
      enabled: searchProduct !== "",
      select: (data) => {
        let temp = [];
        data?.data?.data?.map((item) => {
          item._id in temp
            ? null
            : temp.push({
                value: item?._id,
                label: item?.title,
                mainImage: item?.mainImage,
                gridImage: item?.gridImage,
              });
        });
        return temp;
      },
    }
  );

  console.log({ products });
  const setImage = () => {
    var index = products.findIndex(
      (sr) => sr.value === videoData?.productValue?.value
    );
    setVideoData({
      ...videoData,
      mainImage: products[index].mainImage,
      gridImage: products[index]?.gridImage,
    });
  };

  useEffect(() => {
    if (videoData?.productValue?.value) setImage();
  }, [videoData?.productValue]);

  console.log(videoData);

  return (
    <>
      <div className="video_container">
        <div className="video_header">
          <h5>Create Video</h5>
          <MdOutlineClose
            size={"2rem"}
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="section_container">
          <section>
            <UploadVideoSection
              video={video}
              url={videoURL}
              paused={paused}
              notify={notify}
              x={videoData.x}
              y={videoData.y}
              setVideo={setVideo}
              seekTime={seekTime}
              setPaused={setPaused}
              resetSeekTime={setSeekTime}
              handleVideoUpload={handleVideoUpload}
              displayCoordinates={ballDisplayCoordinates}
              setVideoPlayBackTime={setVideoPlayBackTime}
              handleSetCoordinates={handleSetCoordinates}
            />
          </section>

          <section>
            <UploadForm
              products={products}
              videoData={videoData}
              search={searchProduct}
              disabled={enableInput}
              uploadData={uploadData}
              handleCheck={handleCheck}
              handleChange={handleChange}
              setSearch={setSearchProduct}
            />
          </section>

          <div className="dataCardContainer">
            {Object?.values(Object?.values(state)?.[0])?.length > 0 ? (
              <>
                {Object?.values(Object?.values(state)?.[0])
                  .filter((sr) => sr !== null)
                  .map((item, index) => (
                    <VideoDataCard
                      data={item}
                      key={index}
                      index={index}
                      deleteData={handleDelete}
                      setSeekTime={setSeekTime}
                      setKeyValue={setEditKeyValue}
                      lastIndex={
                        Object?.values(Object?.values(state)?.[0])?.length - 1
                      }
                    />
                  ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

VideoModal.propTypes = {
  setOpen: PropTypes.any,
};