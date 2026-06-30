import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import * as postAPI from "@/apis/postAPI";

export const fetchPostsList = createAsyncThunk(
  "postsList/fetchPostsList",
  async function () {
    const response = await postAPI.fetchPostsList();
    const jsonResponse = response.json();
    return jsonResponse;
  },
);

export const resetPostsList = createAction("postsList/resetPostsList");

const postSlice = createSlice({
  name: "postsList",
  initialState: {
    entites: [],
    status: "idle",
    toggle: true,
  },
  reducers: {
    setToggle(state, action) {
      // here action.type  = postsList/setToggle
      state.toggle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entites = action.payload;
      })
      .addCase(fetchPostsList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPostsList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(resetPostsList, (state) => {
        state.status = "idle";
        state.entites = [];
      });
  },
});

export const { setToggle } = postSlice.actions;
export default postSlice.reducer;

// reducers:
// The reducers field is for actions that belong to this slice.
// Redux Toolkit automatically creates the action creators for you.

// extraReducers:
// extraReducers handles actions that are created outside this slice.
// ie. createAsyncThunk, createAction, actions from another slice
