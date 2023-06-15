import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegister: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    change: (state, action) => {
        state.isRegister = action.payload;
    }
  },
});

export const {change} = AuthSlice.actions;

export default AuthSlice.reducer;
