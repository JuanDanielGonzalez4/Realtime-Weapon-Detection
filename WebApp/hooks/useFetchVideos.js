import { useState, useEffect } from "react";
import { getSignedVideoUrl } from "../src/services/Videos";

export const useFetchVideos = () => {
  const [videoUrls, setVideoUrls] = useState([]);

  const fetchSignedVideoUrl = async () => {
    const urls = await getSignedVideoUrl();
    if (urls) {
      setVideoUrls(urls);
    }
  };

  useEffect(() => {
    fetchSignedVideoUrl();
  }, []);

  return videoUrls;
};
