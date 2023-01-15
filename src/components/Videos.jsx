import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = (props) => {
  const { videos } = props;
  // console.info(videos);
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent={"start"} gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
