import React from "react";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      {/* borderRadius = 50% will create a circle */}
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:5000/assets/${image}`}
      />
    </Box>
  );
};
export default UserImage;
