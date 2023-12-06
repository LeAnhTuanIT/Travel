import axios from "axios";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";
import { AnyAction, Dispatch } from "redux";

// create review
export const createReviewTour =
  (newReview: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "createReviewRequest",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/review/create-review-tour`,
        newReview,
        config
      );
      dispatch({
        type: "reviewCreateSuccess",
        payload: data.review,
      });
    } catch (error: any) {
      dispatch({
        type: "createReviewFail",
        payload: error.response.data.message,
      });
    }
  };



  export const createReviewBLog =
  (newReview: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "createReviewRequest",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/review/create-review-blog`,
        newReview,
        config
      );
      dispatch({
        type: "reviewCreateSuccess",
        payload: data.review,
      });
    } catch (error: any) {
      dispatch({
        type: "createReviewFail",
        payload: error.response.data.message,
      });
    }
  };

  // get all reviews
export const getAllReviews = () => async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({
        type: "getAllReviewsRequest",
        });
    
        const { data } = await axios.get(`${server}/review/get-all-reviews`);
        dispatch({
        type: "getAllReviewsSuccess",
        payload: data.reviews,
        });
    } catch (error: any) {
        dispatch({
        type: "getAllReviewsFail",
        payload: error.response.data.message,
        });
    }
};