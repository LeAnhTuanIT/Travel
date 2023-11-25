import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { isNum } from "react-toastify/dist/utils";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  function validate(phone: any) {
    var phonePattern = /^\d{3}\d{3}\d{4}$/;

    console.log(phonePattern.test(phone));
    // Kiểm tra chuỗi theo biểu thức chính quy
    if (phonePattern.test(phone)) {
      return true; // Chuỗi là số điện thoại hợp lệ
    } else {
      return false; // Chuỗi không phải số điện thoại hợp lệ
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validate(phoneNumber) === false) {
      toast.error("Please check your number phone !!");
      return;
    }

    if (!avatar) {
      toast.error("Please enter your avatar !!");
      return;
    }

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("avatar", avatar as any);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("phoneNumber", phoneNumber);
    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        console.log(res.statusText);
        toast.success(res.statusText);
        setName("");
        setPassword("");
        setAvatar(null);
        setEmail("");
        setPhoneNumber("")
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <div className="bg-grey-50 flex flex-column justify-center mb-5 w-100">
      <div className="w-100 m-auto">
        <h2 className="text-center text-3xl font-bold text-grey-900">
          Register your account
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
                Full Name
              </label>
              <div className="mt-1">
                <input
                  className="d-block w-100 px-3 py-2 border-r-20  rounded-md shadow-sm placeholder-grey focus:outline-none "
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="d-block text-sm font-medium text-grey fw-700 "
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  className="d-block w-100 px-3 py-2 border-r-20  rounded-md shadow-sm placeholder-grey focus:outline-none "
                  type="number"
                  name="phone"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

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

            <div className="">
              <label
                className="d-block fz-12 font-600 text-grey"
                htmlFor="avatar"
              ></label>

              <div className="mt-2 d-flex align-items-center">
                <span
                  className="d-inline-block overflow-hidden border-r-radius d-flex align-items-end justify-content-center"
                  style={{
                    height: "40px",
                    width: "40px",
                    border: "2px #000 solid",
                  }}
                >
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt=""
                      className="h-100 w-100 object-cover border-r-radius"
                      style={{ height: "28px", width: "28px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="object-cover border-r-radius"
                      style={{ height: "28px", width: "28px" }}
                    />
                  )}
                </span>

                <label
                  htmlFor="file-input"
                  className="hover-8 cursor-pointer ms-3 d-flex align-items-center justify-content-center px-3 py-1 border border-r-8 shadow-sm fz-12 fw-600 bg-white "
                >
                  <span>Upload a file</span>

                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="opacity-0"
                    style={{ width: "0px" }}
                  />
                </label>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="w-100 py-2 mt-3 position-relative d-flex justify-content-center px-2 text-white bg-primary"
              >
                Register
              </button>
            </div>

            <div className="d-flex align-items-center  mt-2 w-100">
              <h4 className="fz-16 m-0">Not have any account?</h4>
              <Link to="/Login" className="ps-2  fw-600 text-decoration-none">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
