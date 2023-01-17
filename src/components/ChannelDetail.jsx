import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFileFromAPI";
import { Videos, ChannelCard } from "./";

const ChannelDetail = () => {
  const { id } = useParams();

  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const tempVideos = [];

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );

    // fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
    //   (data) =>
    //     data?.items.map((i) =>
    //       i.id.videoId
    //         ? console.info(i, "matched")
    //         : console.info(i, "lllllllllll")
    //     )
    // );
    // console.info(tempVideos);
  }, [id]);

  console.info(videos, "videos");

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(232,203,192,1) 0%, rgba(126,173,182,1) 50%, rgba(99,111,164,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />

        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
