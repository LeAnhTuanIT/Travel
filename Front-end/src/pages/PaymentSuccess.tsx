import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../server";

const PaymentSuccess = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();

  let amount = queryParameters.get("vnp_Amount");
  let transactionId = queryParameters.get("vnp_TransactionNo");
  let transactionStatus = queryParameters.get("vnp_TransactionStatus");
  let description = queryParameters.get("vnp_OrderInfo");
  let tourId = queryParameters.get("tourId");
  let userId = queryParameters.get("userId");
  let quantity = queryParameters.get("quantity");

  const isFail = transactionStatus != "00";

  const dataToApi = {
    received: Number(amount) / 100,
    transactionId: transactionId,
    description: description,
    userId: userId,
    tourId: tourId,
    quantity: quantity,
  };

  const sendRequest = async () => {
    await axios
      .post(`${server}/payment/create-payment-deposit`, dataToApi)
      .then((res: any) => {
        console.log("call deposit")
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error: any) => {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  let shouldLog = true;
  useEffect(() => {
    if(shouldLog) {
      shouldLog = false;
      if (isFail) {
        toast.error("Transaction Failed please check again");
        // navigate("/");
      } else {
        toast.success("Transaction Success");
        toast.info("We'll sent you the information Please check your mail.");
        sendRequest();
      }
    }
  
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "50vh",
      }}
    >
      <div className="row">
        <div className="card">
          <div className="card-body text-center">
            <h2>Congratulations!</h2>
            <p>Your payment was successful.</p>
            <p>Thank you for your purchase.</p>
            <Link to="#" className="btn btn-primary">
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
