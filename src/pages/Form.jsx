import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutLinedIcon from "@mui/icons-material/EditOutLined";
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

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData(); // formData is a HTML ellment <form>
    for (let value in values) {
      formData.append(value, values[value]);
      // note that values[value] is dynnamically accessing the value in values
      // so here is appending a <form> HTML element with both key-value pair of object values
    }
    formData.append("picturePath", values.picture.name); // appending <form> HTML element with "picture" key and values.picture.name as value
    console.log(formData);

    const savedUserResponse = await fetch(
      "http://localhost:5000/auth/register",
      {
        method: "POST",
        body: formData, // you can pass JSON.stringify in body or values in the formate of FormData()
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm(); // clears prev form values to prepare for next person's values

    if (savedUser) setPageType("login"); // redirect to login page after user successfully submits login details
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values), // remember that values is already an object
    });
    const loggedIn = await loggedInResponse.json();
    // console.log("hello");
    console.log(`checking user... ${loggedIn}`)
    onSubmitProps.resetForm(); // clear and reset form

    if (loggedIn) {
      // stores credentials into redux state store upon log in
      dispatch(
        setLogin({
          // remember that is is how you use redux dispatch
          // dispatch(reducerFn(payload)) // here the payload for setLogin is an object
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home"); // redirect to homepage after loggin
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // when using formik need to use async function
    if (isLogin) {
      await login(values, onSubmitProps);
    }
    if (isRegister) {
      await register(values, onSubmitProps);
    }
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
        values, // this is an object with firstName, lastName, email, etc as keys
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit, // this refers to the Formik onSubmit function meaning handleFormSubmit in this case
        setFieldValue, // adjust formik input
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
              <>
                <TextField
                  label="First Name" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.firstName} // rememeber, controlled form
                  name="firstName" // has to correspond to variable at initialValeusRegister
                  //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
                  helperText={touched.firstName && errors.firstName} // showing the error
                  sx={{ gridColumn: "span 2" }} // takes 2 out of 4 grids
                />
                <TextField
                  label="Last Name" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.lastName} // rememeber, controlled form
                  name="lastName" // has to correspond to variable at initialValeusRegister
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
                <TextField
                  label="Occupation" // placeholder
                  onBlur={handleBlur} // handle the situation when you click outside input
                  onChange={handleChange} // handle input change
                  value={values.occupation} // rememeber, controlled form
                  name="occupation" // has to correspond to variable at initialValeusRegister
                  //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
                  helperText={touched.occupation && errors.occupation} // showing the error
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
                  >
                    {
                      // remember that first brackets is due to JSX
                      // ({} => ) is destructuring arguments in arrow function
                      // getRootProps is a props which remember is an object which can be spread
                      ({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border="2px dashed"
                          padding="1rem"
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutLinedIcon />
                              {/* edit icon is that pencil editting icon */}
                            </FlexBetween>
                          )}
                        </Box>
                      )
                    }
                  </Dropzone>
                </Box>
              </>
            )}
            {/* ////////////////////// logical && ends here ////////////// */}

            <TextField
              label="Email" // placeholder
              onBlur={handleBlur} // handle the situation when you click outside input
              onChange={handleChange} // handle input change
              value={values.email} // rememeber, controlled form
              name="email" // has to correspond to variable at initialValeusRegister
              //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
              helperText={touched.email && errors.email} // showing the error
              sx={{ gridColumn: "span 4" }} // takes 4 out of 4 grids ie entire row by itself
            />
            <TextField
              label="Password" // placeholder
              type="password" // to hide the password (dots)
              onBlur={handleBlur} // handle the situation when you click outside input
              onChange={handleChange} // handle input change
              value={values.password} // rememeber, controlled form
              name="password" // has to correspond to variable at initialValeusRegister
              //   error={Boolean(touched.firstName) && Boolean(errors.firstName)}   // not sure how this handles the error but this returns the error
              helperText={touched.password && errors.password} // showing the error
              sx={{ gridColumn: "span 4" }} // takes 4 out of 4 grids ie entire row by itself
            />
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                margin: "2rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
              }}
            >
              {/* changing button DISPLAY TEXT to login or register */}
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            {/* <p>hello</p> */}
            <Typography
              onClick={() => {
                // this is how you store multiple functions on ONE onClick event
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{ textDecoration: "underline", color: palette.primary.main }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an acount? Login here"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
