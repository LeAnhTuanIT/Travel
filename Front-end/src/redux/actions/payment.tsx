import axios from "axios";
import { AnyAction, Dispatch } from "redux";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";

// create product
export const createPayment =
  (dataPayment: Object) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({
        type: "createPaymentRequest",
      });

      const config = {
        ...dataPayment,
      };

      console.log(config);

      const { data } = await axios.post(
        `${server}/payment/create-payment-deposit`,
        config
      );
      dispatch({
        type: "createPaymentSuccess",
        payload: data.payment,
      });
    } catch (error: any) {
      dispatch({
        type: "createPaymentFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllPayments = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch({
      type: "getAllPaymentsRequest",
    });

    const { data } = await axios.get(`${server}/payment/get-all-payments`);
    console.log(data);
    dispatch({
      type: "getAllPaymentsSuccess",
      payload: data.payments,
    });
  } catch (error: any) {
    console.log(error)

    dispatch({
      type: "getAllPaymentsFail",
      payload: error.response.data.message,
    });
  }
};

// create product
export const paidPayment =
  (id: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "paidPaymentRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      await axios.put(`${server}/payment/paid/${id}`, {}, config);
      dispatch({
        type: "paidPaymentSuccess",
      });
    } catch (error: any) {
      dispatch({
        type: "paidPaymentFail",
        payload: error.response.data.message,
      });
    }
  };

  export const cancelPayment =
  (id: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "cancelPaymentRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      await axios.put(`${server}/payment/cancel/${id}`, {},config);
      dispatch({
        type: "cancelPaymentSuccess",
      });
    } catch (error: any) {
      dispatch({
        type: "cancelPaymentFail",
        payload: error.response.data.message,
      });
    }
  };
