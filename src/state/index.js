import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // states will be accessible to all components throughout app
  mode: "light", // darkk mode or light mode
  user: null, // follows the user Schema in backend
  token: null, // for auth
  posts: [],
};

export const authSlice = createSlice({
  name: "auth", // name used to identify in store
  initialState,
  reducers: {
    // functions
    setMode: (state) => {
      // refer to video if have error
      state.mode = state.mode === "light" ? "dark" : "light"; // if light mode, setMode will chaneg to dark mode. vice versa
      // note that this is a ternary operator where ( state.mode === "light" ?) is the condition
      // so here is assigning state.mode to a ternary operator
    },
    setLogin: (state, action) => {
      // action.payload is user input in the funtion
      // action.payload is an object
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      // clear user and token upon logout
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        // if user is true
        state.user.friends = action.payload.friends; // storing friends in redux state
      } else {
        console.log("user friends do not exist");
      }
    },
    setPosts: (state, action) => {
      // ensure that payload input is an object format so that easier to deal with
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          // removes post which do not match
          return action.payload.post;
        }
        state.posts = updatedPosts;
      });
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
