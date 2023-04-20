import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import UserPost from "./UserPost";

const AllPosts = ({ userId, isProfile = false }) => {
  // isProfile is set default value to false
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // user feed posts on homepage
  const getPosts = async () => {
    const res = await fetch(`http://localhost:5000/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  // user's posts when navigating to user's profile page
  const getUserPosts = async () => {
    const res = await fetch(`http://localhost:5000/posts/${userId}/posts`, {
      // userId here is referring to the props
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    // if isProfile is not propped down, value will be false and will trigger getPosts() ie all post feed
    // with this you can control whether to display feed or when user wants to post new thing
    if (isProfile) {
      getUserPosts();
      console.log("getIserPosts() is here");
    } else {
      getPosts();
      console.log("getPosts() is here");
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          // instead of putting here item, we desctructure it
          // neater in this way, otherwise have to keep writing item._id, item.firstName, etc
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => {
          return (
            <UserPost
              // rather than using the same prop names as destrcutured ones
              // instead can rename props better and refactor to make use of destructured props better
              // this makes the code neater
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          );
        }
      )}
    </>
  );
};

export default AllPosts;
