import React from "react";
import { Box, Stack } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videos, direction }) => {
  console.info(videos, "this is videos component");
  if (!videos?.length) return "Loading...";

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent={"start"}
      gap={2}
    >
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
