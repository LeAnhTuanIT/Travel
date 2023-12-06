import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: false,
  success: false,
  blogs: [],
  blog: {},
};

export const BlogsReducer = createReducer(initialState, {
  createBlogRequest: (state: any) => {
    state.isLoading = true;
  },
  createBlogSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.success = true;
  },
  createBlogFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getAllBlogsRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllBlogsSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.blogs = action.payload;
    state.success = true;
  },
  getAllBlogsFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  getBlogByIdRequest: (state: any) => {
    state.isLoading = true;
  },
  getBlogByIdSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.blog = action.payload;
    state.success = true;
  },
  getBlogByIdFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  paidBlogRequest: (state: any) => {
    state.isLoading = true;
  },
  paidBlogSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.success = true;
  },
  paidBlogFail: (state: any, action: any) => {
    state.isLoading = false;
    state.success = false;
  },

  
  cancelBlogRequest: (state: any) => {
    state.isLoading = true;
  },
  cancelBlogSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.success = true;
  },
  cancelBlogFail: (state: any, action: any) => {
    state.isLoading = false;
    state.success = false;
  },
});
