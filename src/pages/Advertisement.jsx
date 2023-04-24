import React from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetwen";
import WidgetWrapper from "../components/WidgetWrapper";

const Advertisement = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        src="http://localhost:5000/assets/info2.jpeg" // GET fetching from backend
        alt="advert"
        width="100%"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>KFC</Typography>
        <Typography color={medium}>kfc.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        it's finger lickin' good.
      </Typography>
    </WidgetWrapper>
  );
};

export default Advertisement;
