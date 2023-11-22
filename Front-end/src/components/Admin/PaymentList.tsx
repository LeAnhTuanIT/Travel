import { useEffect, useState } from "react";
import {
  cancelPayment,
  getAllPayments,
  paidPayment,
} from "../../redux/actions/payment";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { moneyFormatter } from "../../shared/GlobalFunction";
import PaymentItem from "./PaymentItem";

const PaymentList = () => {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state: any) => state.payments);
  const [paymentsData, setPaymentsData] = useState(payments);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentPerPage] = useState(8);
  const lastPostIndex = currentPage * paymentsPerPage;
  const firstPostIndex = lastPostIndex - paymentsPerPage;
  let currentPayments = paymentsData.slice(firstPostIndex, lastPostIndex);
  const formatter = moneyFormatter();

  let pages = [];

  const totalPage = Math.ceil(paymentsData.length / paymentsPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  } 

  useEffect(() => {
    dispatch(getAllPayments() as unknown as AnyAction);
  }, [dispatch]);



  function handleFindByTransaction(e: any) {
    e.preventDefault();
    if (e.target.value != "") {
      let currentPayments = paymentsData.filter((payment: any) =>
        payment.transactionId.includes(e.target.value)
      );

      currentPayments = currentPayments.sort((payment: any, lastPayment: any) => payment.transactionId - lastPayment.transactionId )
      setPaymentsData(currentPayments);
    } else {
      setPaymentsData(payments);
    }
  }

  function handleFindByBuyer(e: any) {
    e.preventDefault();
    if (e.target.value != "") {
      let currentPayments = paymentsData.filter((payment: any) =>
        payment.user.name.includes(e.target.value)
      );
      
      currentPayments = currentPayments.sort((payment: any, lastPayment: any) => payment.transactionId - lastPayment.transactionId )
      setPaymentsData(currentPayments);
    } else {
      setPaymentsData(payments);
    }
  }

  function handleFindByTourName(e: any) {
    e.preventDefault();
    if (e.target.value != "") {
      let currentPayments = paymentsData.filter((payment: any) =>
        payment.tour.name.includes(e.target.value)
      );
      
      currentPayments = currentPayments.sort((payment: any, lastPayment: any) => payment.transactionId - lastPayment.transactionId )
      setPaymentsData(currentPayments);
    } else {
      setPaymentsData(payments);
    }
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="transaction_id"
            placeholder="Transaction ID..."
            onChange={handleFindByTransaction}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="buyer"
            placeholder="Buyer..."
            onChange={handleFindByBuyer}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="tour"
            placeholder="Tour Name..."
            onChange={handleFindByTourName}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Quantity</th>
            <th scope="col">Received</th>
            <th scope="col">Buyer</th>
            <th scope="col">Tour</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {currentPayments.map((payment: any, index: number) => (
            <PaymentItem payment={payment}></PaymentItem>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default PaymentList;
