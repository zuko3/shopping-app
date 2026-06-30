import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
  },
  reducers: {
    setLoggedInStatus(state, action) {
      state.loggedIn = action.payload;
    },
  },
});

export const { setLoggedInStatus } = authSlice.actions;
export default authSlice.reducer;
