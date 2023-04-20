import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
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
  const main = palette.neutral.main;
  const primary = palette.primary.main;

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

  return (
    <WidgetWrapper margin="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/assets/${picturePath}`}
        />
      )}
      {/* styling button */}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            {/* like button */}
            <IconButton onClick={patchLike}>
              {
                // if post is liked, fav icon will have border outlined
                isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )
              }
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/* new comment box */}
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* all comments from everyone */}
      {isComment && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => {
            return (
              <Box key={index}>
                <Divider />
                <Typography sx={{ color: main, margin: "0.5rem", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            );
          })}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserPost;
