import { useState } from "react";
import { moneyFormatter } from "../../shared/GlobalFunction";
import { useDispatch } from "react-redux";
import { cancelPayment, paidPayment } from "../../redux/actions/payment";
import { AnyAction } from "redux";

const PaymentItem = ({ payment }: any) => {
  console.log(payment);
  const formatter = moneyFormatter();
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [confirmCancelPayment, setConfirmCancelPayment] = useState(false);

  const dispatch = useDispatch();
  let statusText = "";
  let statusClass = "";
  let needPay = formatter.format(payment.amount - payment.received);
  if (payment.status == 0) {
    statusText = "Canceled";
    statusClass = "table-danger";
  } else if (payment.status == 1) {
    statusText = "Deposit";
    statusClass = "table-primary";
  } else if (payment.status == 2) {
    statusText = "Success";
    statusClass = "table-success";
  }

  const handlePaid = (id: any) => {
    window.location.reload();
    dispatch(paidPayment(id) as unknown as AnyAction);
  };
  const handleCancel = (id: any) => {
    window.location.reload();

    dispatch(cancelPayment(id) as unknown as AnyAction);
  };
  return (
    <tr className={statusClass}>
      <th scope="row">{payment.transactionId} </th>

      <td>{formatter.format(payment.amount)} </td>
      <td>{statusText}</td>
      <td>{payment.quantity}</td>
      <td>{formatter.format(payment.received)}</td>
      <td>{payment.user.name}</td>
      <td>{payment.tour.name}</td>
      <td className="d-flex gap-3 justify-content-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setConfirmPayment(true)}
          disabled={payment.status != "1"}
        >
          Paid
        </button>

        <div
          className={
            "position-fixed top-0 bottom-0 animation-popup background-popup index-top" +
            (confirmPayment ? " active" : "")
          }
          tabIndex={-1}
          style={{ left: "0", right: "0" }}
        >
          <div
            className={
              "modal-dialog mt-5 animation-popup background-popup index-top" +
              (confirmPayment ? " active" : "")
            }
            style={{ backgroundColor: "#fff", maxWidth: "480px" }}
          >
            <div className="modal-content">
              <div className="modal-header p-4">
                <h5 className="modal-title text-default">
                  Are your received enough money ?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setConfirmPayment(false)}
                ></button>
              </div>
              <div className="modal-body p-4 border-top text-default text-initial">
                {`Have you received enough money? Total is: `}
                <strong>{needPay}</strong>
              </div>
              <div className="modal-footer p-4 border-top d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => setConfirmPayment(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handlePaid(payment._id);
                  }}
                  type="button"
                  className="btn btn-success"
                >
                  Paid
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setConfirmCancelPayment(true);
          }}
          type="button"
          className="btn btn-danger"
          disabled={payment.status != "1"}
        >
          Cancel
        </button>
        <div
          className={
            "position-fixed top-0 bottom-0 animation-popup background-popup index-top" +
            (confirmCancelPayment ? " active" : "")
          }
          tabIndex={-1}
          style={{ left: "0", right: "0" }}
        >
          <div
            className={
              "modal-dialog mt-5 animation-popup background-popup index-top" +
              (confirmCancelPayment ? " active" : "")
            }
            style={{ backgroundColor: "#fff", maxWidth: "480px" }}
          >
            <div className="modal-content">
              <div className="modal-header p-4">
                <h5 className="modal-title text-default">
                  Are you sure cancel this payment ?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setConfirmCancelPayment(false)}
                ></button>
              </div>
              <div className="modal-body p-4 border-top text-default text-start">
                {`This tour will be cancel and can't revert`}
              </div>
              <div className="modal-footer p-4 border-top d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => setConfirmCancelPayment(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCancel(payment._id);
                  }}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default PaymentItem;
