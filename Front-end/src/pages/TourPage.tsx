import React, { useEffect } from "react";
import Tour from "../components/Admin/Tour";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/Layout/ErrorPage";
import { isAdmin } from "../shared/GlobalFunction";

const TourPage = () => {
  const { user } = useSelector((state: any) => state.user);

  return isAdmin(user) ? (
    <div>
      <Tour></Tour>
    </div>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default TourPage;
