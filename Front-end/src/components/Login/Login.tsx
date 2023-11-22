import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Success");
        navigate("/");
        window.location.reload();
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || err.message);
      });
  };
  return (
    <div className="bg-grey-50 flex flex-column justify-center mb-5 w-100">
      <div className="w-100 m-auto">
        <h2 className="text-center text-3xl font-bold text-grey-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-4 w-50 p-0" style={{ maxWidth: "550px" }}>
        <div className="bg-white p-4 shadow border-r-20">
          <form onSubmit={handleSubmit} className="">
            <div className="">
              <label
                htmlFor="email"
                className="d-block text-sm font-medium text-grey fw-700 "
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  className="d-block w-100 px-3 py-2 border-r-20  rounded-md shadow-sm placeholder-grey focus:outline-none "
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="d-block text-sm font-medium text-grey fw-700 "
              >
                Password
              </label>
              <div className="mt-1 position-relative">
                <input
                  className="d-block w-100 px-3 py-2 border-r-20  rounded-md shadow-sm placeholder-grey focus:outline-none "
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <FontAwesomeIcon
                    className="position-absolute trans-y-50"
                    style={{ top: "50%", right: "20px" }}
                    icon={faEye}
                    onClick={() => setVisible(!visible)}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="position-absolute trans-y-50"
                    style={{ top: "50%", right: "20px" }}
                    icon={faEyeSlash}
                    onClick={() => setVisible(!visible)}
                  />
                )}
              </div>
            </div>

            <div className="d-flex align-center justify-content-between mt-2">
              <div className="d-flex">
                <input
                  className="ms-2 py-3 "
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label
                  className="ms-2 d-block fz-16 text-grey fw-600"
                  htmlFor="remember-me"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="fz-16 fw-600 text-decoration-none">
                  Forgot your password
                </a>
              </div>
            </div>

            <div className="">
              <button
                type="submit"
                className="w-100 py-2 mt-3 position-relative d-flex justify-content-center px-2 text-white bg-primary"
              >
                Login
              </button>
            </div>

            <div className="d-flex align-items-center  mt-2 w-100">
              <h4 className="fz-16 m-0">Not have any account?</h4>
              <Link to="/sign-up" className="ps-2  fw-600 text-decoration-none">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
