import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import Friend from "../components/Friend";

const FriendsList = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();

  const getFriends = async () => {
    // getting friends list of logged in user
    const res = await fetch(`http://localhost:5000/user/${userId}/friends`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    dispatch(setFriends(data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => {
          return (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation} // subtitle to display user description like occupation
              userPicturePath={friend.picturePath} // display small profile picutre icon
            />
          );
        })}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendsList;
