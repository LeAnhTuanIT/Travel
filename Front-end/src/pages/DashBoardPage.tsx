import axios from "axios";
import React from "react";
import PaymentList from "../components/Admin/PaymentList";
import { isAdmin } from "../shared/GlobalFunction";
import { useSelector } from "react-redux";
import ErrorPage from "../components/Layout/ErrorPage";

const DashBoardPage = () => {
  const { user } = useSelector((state: any) => state.user);

  return isAdmin(user) ? (
    <div className="px-4 mx-auto" style={{ height: "75vh", width: "80vw" }}>
      <PaymentList></PaymentList>
    </div>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default DashBoardPage;
