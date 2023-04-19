import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetwen";
import Friend from "../components/Friend";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state";
import { useNavigate } from "react-router";

const UserPost = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  // isLiked here checks if the LOGGED IN USER has liked a post
  // use dynamic access of object sincec loggedInUserId will be changing depending on who logs in
  // refer to backend PostSchema "likes" which is a Map (ie object) of Boolean
  // will be something like this below...
  //   const likes = {
  //     userid1: true,
  //     userid2: false
  //   }
  const likeCount = Object.keys(likes).length; // Object.keys stores the keys of an object into an array

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const patchLike = async () => {
    const res = await fetch(`http://localhost:5000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const data = await res.json();
    dispatch(setPost({ post: data })); // remember that setPost (in redux store) is to update a single post by user
  };

  return <div></div>;
};

export default UserPost;
