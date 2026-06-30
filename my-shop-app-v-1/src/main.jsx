import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureStore } from "@reduxjs/toolkit";
import { cartLinesReducer } from "@/slices/cartSlice";
import postsReducer from "@/slices/postSlice";
import authReducer from "@/slices/authSlice";
import { routeTree } from "./routeTree.gen";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, //5 minutes
      retry: 2,
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartLinesReducer,
    auth: authReducer,
    postsList: postsReducer,
  },
});

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
