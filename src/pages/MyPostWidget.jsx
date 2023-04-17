import React from "react";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GiftBoxOutLined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../state";
import FlexBetween from "../components/FlexBetwen";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false); // if image is present on dropzone
  const [image, setImage] = useState(null); // state storing actual image
  const [post, setPost] = useState(""); // state storing post content in controlled input box
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData(); // useful to use when dealing with images
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      // please refer to Backend index.js file on routes with files
      // app.post route has an upload.single("picture") function where "picture" means to access "picture" key value
      // frontend sends name and values as key and values repectively in the form on an object
      formData.append("picture", image);
      formData.append("picturePath", image.name); // image filepath
    }

    const res = await fetch(`http:localhost/5000/posts`, {
      method: "POST",
      headers: {
        // "Content-type": "application/json"  // only use this when sending raw data, NOT FormData()
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const posts = await res.json();
    dispatch(setPosts({ posts })); // stores backend data to redux state
    setImage(null); // clears input
    setPost(""); // clears input
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box borderRadius="5px" border="1px solid" mt="1rem" padding="1rem">
          <Dropzone
            acceptedFiles=".jpg, .jpeg, .png" // list of accepted types of files
            multiple={false} // only accept 1 file
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            // onDrop happens when dropped file into the box
            // setFieldValue can actually also change the values of firstName, lastName, email, password, etc but "picture" arg here chooses to change the "picture" value
            // second arguemnt is the value you want to store
          >
            {
              // remember that first brackets is due to JSX
              // ({} => ) is destructuring arguments in arrow function
              // getRootProps is a props which remember is an object which can be spread
              ({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border="2px dashed"
                    padding="1rem"
                    width="100%"
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                        {/* edit icon is that pencil editting icon */}
                      </FlexBetween>
                    )}
                  </Box>
                  {/* Creating thrash delete icon */}
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )
            }
          </Dropzone>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
