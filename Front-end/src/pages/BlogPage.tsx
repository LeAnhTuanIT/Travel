import React, { useEffect } from "react";
import Blog from "../components/Admin/Blog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/Layout/ErrorPage";
import { isAdmin } from "../shared/GlobalFunction";

const BlogPage = () => {
  const { user } = useSelector((state: any) => state.user);

  return isAdmin(user) ? (
    <div>
      <Blog></Blog>
    </div>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default BlogPage;
