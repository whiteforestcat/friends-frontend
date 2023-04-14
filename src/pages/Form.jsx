import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/material/EditOutlined";
import { Formik } from "formik"; // form library
import * as yup from "yup"; // form validation library  like checking input field is number or string, etc
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone"; // to enable drop down of image or files
import FlexBetween from "../components/FlexBetwen";

const registerSchema = yup.object().shape({
  // .requried("required") means a required field

  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  // initial values in input fields
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  // initial values in input fields
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login"); // to control if page is at login page or profile page, etc
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-widthL 600px)");
  const isLogin = pageType === "login"; // these 2 variables are storing conditions
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {
    // when using formik need to use async function
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* here formik is passing the handleFormSubmit function to <form> */}
      {({
        // these are all keywords in formik
        values, // this is an object with firstName as key
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,  // adjust formik input
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // here is splitting grid into 4 sections, with min of 0 grid and max of 4 grids
            // update sx here if styling is not good
          >
            {isRegister && (
              <div>
                <TextField
                  label="First Name" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.firstName} // rememeber, controlled form
                  name="firstname" // has to correspond to variable at initialValeusRegister
                  //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
                  helperText={touched.firstName && errors.firstName} // showing the error
                  sx={{ gridColumn: "span 2" }} // takes 2 out of 4 grids
                />
                <TextField
                  label="Last Name" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.lastName} // rememeber, controlled form
                  name="lastname" // has to correspond to variable at initialValeusRegister
                  //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
                  helperText={touched.lastName && errors.lastName} // showing the error
                  sx={{ gridColumn: "span 2" }} // takes 2 out of 4 grids
                />
                <TextField
                  label="Location" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.location} // rememeber, controlled form
                  name="location" // has to correspond to variable at initialValeusRegister
                  //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
                  helperText={touched.location && errors.location} // showing the error
                  sx={{ gridColumn: "span 4" }} // takes 4 out of 4 grids ie entire row by itself
                />
                <Box
                  gridColumn="span 4"
                  border="1px solid"
                  borderRadius="5px"
                  padding="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png" // list of accepted types of files
                    multiple={false} // only accept 1 file
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                    // onDrop happens when dropped file into the box
                    // setFieldValue can actually also change the values of firstName, lastName, email, password, etc but "picture" arg here chooses to change the "picture" value
                    // second arguemnt is the value you want to store
                  ></Dropzone>
                </Box>
              </div>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
