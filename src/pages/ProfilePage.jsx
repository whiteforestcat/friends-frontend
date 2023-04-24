import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import FriendsList from "./FriendsList";
import MyPostWidget from "./MyPostWidget";
import AllPosts from "./AllPosts";
import UserWidgets from "./UserWidgets";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); // gets the userId from URL
  // refer to App.jsx profile page route. useParams() will contain all params (ie :xxx) in the URL path
  // since we are implementing in ProfilePage, useParams() will be an object of {userId: xxx}
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const getUser = async () => {
    const res = await fetch(`http://localhost:5000/users${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    // this prevents error due to slight delay in sotring state
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={_id} picturePath={picturePath} />
          {/* _id and picturePath here are taken from store */}
          <Box m="2rem 0" />
          {/* displaying own profile page */}
          <FriendsList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <AllPosts userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
