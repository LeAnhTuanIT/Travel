import axios from "axios";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";
// load user

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
