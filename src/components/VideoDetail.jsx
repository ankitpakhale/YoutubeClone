import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos } from "./";
// import { fetchFromAPI } from "../utils/fetchFromAPI";
import { fetchFromAPI } from "../utils/fetchFileFromAPI";
import { FaClock, FaRegStopCircle } from "react-icons/fa";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  useEffect(() => {
    const watchLaterData = JSON.parse(localStorage.getItem(`watchLater${id}`));
    if (watchLaterData) {
      setIsWatchLater(true);
    }
  });

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  console.info(videoDetail, "videoDetail");

  const handleWatchLater = (title) => {
    console.info(videoDetail, "handle watch later");
    if (!isWatchLater) {
      localStorage.setItem(`watchLater${id}`, JSON.stringify(videoDetail));
      setIsWatchLater(true);
    } else {
      localStorage.removeItem(`watchLater${id}`, JSON.stringify(videoDetail));
      setIsWatchLater(false);
    }
    alert(
      isWatchLater
        ? `${title} | Removed from watch later`
        : `${title} | Added to watch later`
    );
  };

  const getWatchLater = () => {
    console.info(
      JSON.parse(localStorage.getItem(`watchLater${videoDetail.id}`))
    );
  };

  return (
    <Box minHeight="95vh" sx={{ overflow: "auto", height: "110vh" }}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "100%",
              position: "sticky",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircleIcon
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1">
                  <span
                    onClick={() => handleWatchLater(title)}
                    class="material-icons"
                  >
                    {isWatchLater ? <FaRegStopCircle /> : <FaClock />}
                  </span>
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
