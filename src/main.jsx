import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"; // to store redux states in local storage
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// remember to delete local storage, user will have to clear cache

const persistConfig = { key: "root", storage, version: 1 };
const persistReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // to ignore this warnings
      },
    });
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
