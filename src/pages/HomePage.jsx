import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import UserWidgets from "./UserWidgets";
import MyPostWidget from "./MyPostWidget";
import AllPosts from "./AllPosts";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={_id} picturePath={picturePath} />
          {/* _id and picturePath here are taken from store */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget userId={_id} picturePath={picturePath} />
          <AllPosts userId={_id}/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
