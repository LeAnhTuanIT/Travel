import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import { toast } from "react-toastify";
const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            toast.success("Your account has been created successfully");
            console.log(res);
          })
          .catch((err) => {
            // toast.error("User already exist");
            console.log(err);
            setError(true);
          })
          .finally(() => {
            navigate("/Login");
          });
      };

      sendRequest();
    
  };
  },[]);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <h1>User already exist</h1>
      ) : (
        <h1>Your account has been created successfully</h1>
      )}
    </div>
  );
};

export default ActivationPage;
