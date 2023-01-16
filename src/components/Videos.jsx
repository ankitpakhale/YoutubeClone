import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos }) => {
  // co nsole.info(videos, "this is videos");
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent={"start"} gap={2}>
      {videos
        ? videos.map((item, idx) => (
            <Box key={idx + 1}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          ))
        : console.info("null fetched")}
    </Stack>
  );
};

export default Videos;
