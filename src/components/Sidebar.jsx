import { useSelect } from "@mui/base";
import { Opacity } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";
import { categories } from "../utils/constants";

const Sidebar = (props) => {
  const { selectedCategory, setSelectedCategory } = props;
  return (
    <Stack
      direction={"row"}
      sx={{
        overflow: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setSelectedCategory(category.name)}
          className="category-btn"
          style={{
            background: category.name === selectedCategory && "#fc1503",
            color: "#fff",
          }}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "#fff" : "#fc1503",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              marginLeft: "15px",
              opacity: category.name === selectedCategory ? "1" : "0.5",
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
