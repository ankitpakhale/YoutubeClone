import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Sidebar, VideoCard, VideoDetail, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFileFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState(null);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  console.info(selectedCategory, "selectedCategory");

  const HandleVideos = () => {
    setVideos(null);
    if (selectedCategory === "watchLater") {
      var watchLaterList = [],
        keys = Object.keys(localStorage),
        i = keys.length;
      while (i--) {
        watchLaterList.push(JSON.parse(localStorage.getItem(keys[i])));
      }
      console.info(watchLaterList, "values");
      if (watchLaterList) {
        // setWatchLaterVideos(watchLaterList);
        setVideos(watchLaterList);
      }
    } else {
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
        setVideos(data.items)
      );
    }
  };

  useEffect(() => {
    HandleVideos();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1xp solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 JSM Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          mb={2}
          sx={{
            color: "#fff",
          }}
        >
          {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />

        {/* {selectedCategory !== "watchLater" && <Videos videos={videos} />}
        {selectedCategory === "watchLater" &&
          watchLaterVideos.map((data) => {
            <VideoDetail video={data} />;
          })} */}
      </Box>
    </Stack>
  );
};

export default Feed;
