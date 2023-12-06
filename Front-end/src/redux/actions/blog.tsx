import axios from "axios";
import { server } from "../../server";
import { getCookie } from "../../shared/GlobalFunction";
import { AnyAction, Dispatch } from "redux";

// create product
export const createBlog =
  (newForm: FormData) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "createBlogRequest",
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
        `${server}/blogs/create-blog`,
        newForm,
        config
      );
      dispatch({
        type: "BlogCreateSuccess",
        payload: data.Blog,
      });
    } catch (error: any) {
      dispatch({
        type: "createBlogFail",
        payload: error.response.data.message,
      });
    }
  };

// create product
export const updateBlog =
  (newForm: FormData) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");

      dispatch({
        type: "updateBlogRequest",
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
        `${server}/Blog/update-Blog`,
        newForm,
        config
      );
      dispatch({
        type: "updateBlogSuccess",
        payload: data.Blog,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "updateBlogFail",
        payload: error.response.data.message,
      });
    }
  };

export const deleteBlog =
  (idBlog: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "deleteBlogRequest",
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
        `${server}/blog/delete-blog/${idBlog}`,
        config
      );
      dispatch({
        type: "deleteBglogSuccess",
        payload: data.blog,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: "deleteBlogFail",
        payload: error.response.data.message,
      });
    }
  };
// get All Products of a shop
export const getAllBLogsAdmin = (id: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllBLogsAdminRequest",
    });

    const { data } = await axios.get(`${server}/Blog/get-all-blog-admin/${id}`);
    dispatch({
      type: "getAllBLogsAdminSuccess",
      payload: data.blogs,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllBlogsAdminFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllBlogs = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllBlogsRequest",
    });

    const { data } = await axios.get(`${server}/blogs/get-all-blog`);
    dispatch({
      type: "getAllBlogsSuccess",
      payload: data.blogs,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllBlogsFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllBlog = () => async (dispatch: any) => {
  try {
    dispatch({
      type: "getAllBlogsRequest",
    });

    const { data } = await axios.get(`${server}/blogs/get-all-blog`);
    dispatch({
      type: "getAllBlogsSuccess",
      payload: data.blogs,
    });
  } catch (error: any) {
    dispatch({
      type: "getAllBlogsFailed",
      payload: error.response.data.message,
    });
  }
};


export const getBlogById = (blogId: any) => async (dispatch: any) => {
  try {
    dispatch({
      type: "getBlogByIdRequest",
    });

    const { data } = await axios.get(`${server}/blogs/get-blog/${blogId}`);
    dispatch({
      type: "getBlogByIdSuccess",
      payload: data.blog,
      
    });
  } catch (error: any) {
    dispatch({
      type: "getBlogByIdFail",
      payload: error.response.data.message,
    });
  }
};



// create product
export const paidBlog =
  (id: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "paidBlogRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      await axios.put(`${server}/blogs/paid/${id}`, {}, config);
      dispatch({
        type: "paidBlogSuccess",
      });
    } catch (error: any) {
      dispatch({
        type: "paidBlogFail",
        payload: error.response.data.message,
      });
    }
  };

  export const cancelBlog =
  (id: any) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      let token = getCookie("token");
      dispatch({
        type: "cancelBlogRequest",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookies: token,
          "Access-Control-Allow-Credentials": true,
        },
        withCredentials: true,
      };

      await axios.put(`${server}/blogs/cancel/${id}`, {},config);
      dispatch({
        type: "cancelBlogSuccess",
      });
    } catch (error: any) {
      dispatch({
        type: "cancelBlogFail",
        payload: error.response.data.message,
      });
    }
  };