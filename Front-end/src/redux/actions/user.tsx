import axios from "axios";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";
// load user


// create user
export const createUser = (newForm: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "CreateUserRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/user/create-user`,
      newForm,
      config
    );
    dispatch({
      type: "CreateUserSuccess",
      payload: data.user,
    });
  } catch (error: any) {
    dispatch({
      type: "CreateUserFail",
      payload: error.response.data.message,
    });
  }
};



// activate user
export const activateUser = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "ActivateUserRequest",
    });
    const { data } = await axios.post(`${server}/user/activation`);
    dispatch({
      type: "ActivateUserSuccess",
      payload: data.user,
    });
  } catch (error: any) {
    dispatch({
      type: "ActivateUserFail",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch: any) => {
  let token = getCookie("token");

  console.log(token)
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      headers: {
        Cookies: token,
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error: any) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
