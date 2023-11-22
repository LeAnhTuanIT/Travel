import React from "react";
import SignUp from "../components/SignUp/SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div
      style={{ minHeight: "calc(100vh - 270px)" }}
      className="d-flex align-items-center justify-content-center "
    >
      <SignUp></SignUp>
    </div>
  );
};

export default SignUpPage;
