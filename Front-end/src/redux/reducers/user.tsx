import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  
  // CreateUserRequest: (state: any) => {
  //   state.loading = true;
  // },
  // CreateUserSuccess: (state: any, action) => {
  //   state.isAuthenticated = true;
  //   state.loading = false;
  //   state.user = action.payload;
  // },
  // CreateUserFail: (state: any, action) => {
  //   state.loading = false;
  //   state.error = action.payload;
  //   state.isAuthenticated = false;
  // },
  
  
  
  LoadUserRequest: (state: any) => {
    state.loading = true;
  },
  LoadUserSuccess: (state: any, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state: any, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // update user information
  updateUserInfoRequest: (state: any) => {
    state.loading = true;
  },
  updateUserInfoSuccess: (state: any, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  updateUserInfoFailed: (state: any, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
