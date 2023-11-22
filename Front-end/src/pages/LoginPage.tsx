import React, {useEffect} from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div
      style={{ minHeight: "calc(100vh - 270px)" }}
      className="d-flex align-items-center justify-content-center "
    >
      <Login></Login>
    </div>
  );
};

export default LoginPage;
