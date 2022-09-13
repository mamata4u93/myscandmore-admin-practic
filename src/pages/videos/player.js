import React from "react";
import ReactPlayer from "react-player";

export const Player = React.memo(
  (props) => {
    const { url, ref } = props;
    console.log(props);
    return (
      <>
        <ReactPlayer
          ref={ref}
          controls
          width="100%"
          height="100%"
          className="react-player"
          url={url}
          muted={true}
          onProgress={(e) => console.log(e)}
        />
      </>
    );
  },
  (prev, next) => {
    console.log(prev.url, next.url);
    if (prev.url === next.url) return true;
    else return false;
  }
);
