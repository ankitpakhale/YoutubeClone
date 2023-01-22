import { Stack } from "@mui/material";
import React from "react";
import { categories } from "../utils/constants";
import { FaTasks } from "react-icons/fa";

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
      <button
        onClick={() => setSelectedCategory("watchLater")}
        className="category-btn"
        style={{
          background: "#fc1503",
          color: "#fff",
        }}
      >
        <span>
          <FaTasks />
        </span>
        <span
          style={{
            marginLeft: "15px",
            opacity: "1",
          }}
        >
          Watch Later
        </span>
      </button>

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
