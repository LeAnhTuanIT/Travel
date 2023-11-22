import axios from "axios";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";
import { AnyAction, Dispatch } from "redux";

// create product
export const createTour =
  (newForm: FormData) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "createTourRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `${server}/tour/create-tour`,
        newForm,
        config
      );
      dispatch({
        type: "tourCreateSuccess",
        payload: data.tour,
      });
    } catch (error: any) {
      dispatch({
        type: "createTourFail",
        payload: error.response.data.message,
      });
    }
  };

// create product
export const updateTour =
  (newForm: FormData) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "updateTourRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      console.log(newForm.getAll("images"));

      const { data } = await axios.put(
        `${server}/tour/update-tour`,
        newForm,
        config
      );
      dispatch({
        type: "updateTourSuccess",
        payload: data.tour,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "updateTourFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteTours =
  (idTours: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "deleteTourRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      const { data } = await axios.delete(
        `${server}/tour/delete-tour/${idTours}`,
        config
      );
      dispatch({
        type: "deleteTourSuccess",
        payload: data.tour,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "deleteTourFail",
        payload: error.response.data.message,
      });
    }
  };
// get All Products of a shop
export const getAllToursAdmin = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllToursAdminRequest",
    });

    const { data } = await axios.get(`${server}/tour/get-all-tour-admin/${id}`);
    dispatch({
      type: "getAllToursAdminSuccess",
      payload: data.tours,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllToursAdminFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllTours = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllToursRequest",
    });

    const { data } = await axios.get(`${server}/tour/get-all-tour`);
    dispatch({
      type: "getAllToursSuccess",
      payload: data.tours,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllToursFailed",
      payload: error.response.data.message,
    });
  }
};

export const getPDF = () => async (dispatch: any) => {
  try {
    const response = await axios.get(`${server}/payment/pdfmaker`, {
      responseType: "blob",
    });
    console.log("1");
    const url = window.URL.createObjectURL(new Blob([response.data]));
    console.log("2");

    const link = document.createElement("a");
    console.log("3");

    link.href = url;
    console.log("4");

    link.setAttribute("download", "invoice.pdf");
    console.log("5");

    document.body.appendChild(link);
    console.log("6");

    link.click();
  } catch (error) {
    console.error(error);
  }
};

export const getTourById = (tourId: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getTourByIdRequest",
    });

    const { data } = await axios.get(`${server}/tour/get-tour/${tourId}`);
    dispatch({
      type: "getTourByIdSuccess",
      payload: data.tour,
    });
  } catch (error: any) {
    dispatch({
      type: "getTourByIdFailed",
      payload: error.response.data.message,
    });
  }
};

export const createPaymentUrl =
  (dataToApi: Object) => async (dispatch: any) => {
    try {
      dispatch({
        type: "createPaymentUrlRequest",
      });

      let token = getCookie("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
        paymentInfo: dataToApi,
      };
      const { data } = await axios.post(
        `${server}/tour/create_payment_url`,
        config
      );

      console.log(data.vnpUrl);
      window.location = data.vnpUrl;

      dispatch({
        type: "createPaymentUrlSuccess",
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: "createPaymentUrlFailed",
        payload: error.response.data.message,
      });
    }
  };
// // delete product of a shop
// export const deleteProduct = (id: any) => async (dispatch: any) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error: any) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all products
// export const getAllProducts = () => async (dispatch: any) => {
//   try {
//     dispatch({
//       type: "getAllProductsRequest",
//     });

//     const { data } = await axios.get(`${server}/product/get-all-products`);
//     dispatch({
//       type: "getAllProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error: any) {
//     dispatch({
//       type: "getAllProductsFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
