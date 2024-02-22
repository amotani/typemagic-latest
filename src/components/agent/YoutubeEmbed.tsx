import React, { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";

function getVideoIdFromUrl(src: string) {
  const match = src.match(/[?&]v=([^&]+)/);
  const videoId = match && match[1];
  return videoId || "";
}

const YouTubeEmbed = (props: { src: string; width: number }) => {
  const videoId = getVideoIdFromUrl(props.src);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(560); // Initial width

  const opts = {
    width: String(props.width),
  };

  return (
    <div ref={containerRef}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubeEmbed;
