import { createReducer } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialState = {
  isLoading: true,
  error: false,
  success: false,
  reviews: [],
  review: {},
  redirectUrl: "",
};

export const reviewReducer = createReducer(initialState, {
  tourCreateRequest: (state: any) => {
    state.isLoading = true;
  },
  tourCreateSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.tour = action.payload;
    state.success = true;
  },
  tourCreateFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  updateTourRequest: (state: any) => {
    state.isLoading = true;
  },
  updateTourSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.tour = action.payload;
    state.success = true;
  },
  updateTourFail: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  // get all tours of admin
  getAllToursAdminRequest: (state: any) => {
    state.isLoading = true;
    (state.error = false), (state.success = false);
  },
  getAllToursAdminSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.tours = action.payload;
  },
  getAllToursAdminFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all tours
  getAllToursRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllToursSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.tours = action.payload;
  },
  getAllToursFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  getTourByIdRequest: (state: any) => {
    state.isLoading = true;
  },
  getTourByIdSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.tour = action.payload;
  },
  getTourByIdFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteTourRequest: (state: any) => {
    state.isLoading = true;
  },
  deleteTourSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteTourFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state: any) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.allTours = action.payload;
  },
  getAllProductsFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  createPaymentUrlRequest: (state: any) => {
    state.isLoading = true;
  },
  createPaymentUrlSuccess: (state: any, action: any) => {
    state.isLoading = false;
    state.redirectUrl = action.payload.vnpUrl;
    console.log(action.payload.vnpUrl);
  },
  createPaymentUrlFailed: (state: any, action: any) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state: any) => {
    state.error = null;
  },
});
