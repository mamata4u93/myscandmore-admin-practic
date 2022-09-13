import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
export const UploadVideoSection = (props) => {
  const {
    x,
    y,
    url,
    video,
    paused,
    notify,
    setVideo,
    seekTime,
    setPaused,
    resetSeekTime,
    displayCoordinates,
    handleSetCoordinates,
    setVideoPlayBackTime,
  } = props;

  const ref = useRef(null);

  const handleVideoUpload = (e) => {
    if (e?.target?.files[0]?.name) setVideo(e?.target?.files[0]);
  };

  const showCurrentTime = ({ current: videoDom }) => {
    setVideoPlayBackTime(videoDom?.currentTime);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.onloadedmetadata = () => {
        if (ref?.current?.videoWidth > ref?.current?.videoHeight) {
          setVideo("");
          notify({ notification: "Please use Portrait videos", type: "error" });
          return;
        }
      };
    }
  }, [ref.current]);

  useEffect(() => {
    ref?.current?.addEventListener("timeupdate", () => {
      showCurrentTime(ref);
    });
  }, [ref?.current]);

  useEffect(() => {
    if (ref.current && seekTime !== -1) {
      setPaused(true);
      ref.current.pause();
      ref.current.currentTime = seekTime;
      resetSeekTime(-1);
    }
  }, [seekTime]);

  useEffect(() => {
    if (paused) console.log("the video has been paused");
  }, [paused]);

  return (
    <>
      <div
        className="video_player_container"
        onClick={(e) => {
          var rect = e.target.getBoundingClientRect();
          handleSetCoordinates({
            y: e.clientY - rect.top - 15,
            x: e.clientX - rect.left - 15,
          });
        }}
      >
        {(x !== "" || displayCoordinates.x !== "") && (
          <div
            style={{
              top: displayCoordinates.y || y,
              left: displayCoordinates.x || x,
              position: "absolute",
            }}
          >
            <p
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50rem",
                backgroundColor: "red",
              }}
            ></p>
          </div>
        )}
        {video?.name && (
          <video
            controls
            ref={ref}
            id="video"
            muted={true}
            width="100%"
            height="100%"
            paused={paused}
            className="video_player"
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
          >
            <source src={url} />
          </video>
        )}
      </div>
      <input
        hidden
        type="file"
        id="video_input"
        onChange={(e) => handleVideoUpload(e)}
        accept="video/mp4,video/x-m4v,video/*"
      />
      <label htmlFor="video_input" className="upload_video_label">
        Upload Video
      </label>
    </>
  );
};

UploadVideoSection.propTypes = {
  x: PropTypes.any,
  y: PropTypes.any,
  url: PropTypes.any,
  video: PropTypes.any,
  paused: PropTypes.any,
  notify: PropTypes.any,
  setVideo: PropTypes.any,
  seekTime: PropTypes.any,
  setPaused: PropTypes.any,
  resetSeekTime: PropTypes.any,
  displayCoordinates: PropTypes.any,
  handleSetCoordinates: PropTypes.any,
  setVideoPlayBackTime: PropTypes.any,
};