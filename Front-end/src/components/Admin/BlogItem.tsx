import { useState, useEffect } from "react";
import { moneyFormatter } from "../../shared/GlobalFunction";
import { useDispatch, useSelector } from "react-redux";
import { cancelBlog, getBlogById, paidBlog } from "../../redux/actions/blog";
import { AnyAction } from "redux";

const BlogItem = ({ blog }: any) => {


  const [html, setHtml] = useState<string>("")
  useEffect(() => {
    setHtml(blog.content)
  }, [html])

  const [confirmBlog, setConfirmBlog] = useState(false);
  const [confirmCancelBlog, setConfirmCancelBlog] = useState(false);

  const dispatch = useDispatch();
  let statusText = "";
  let statusClass = "";
  if (blog.status == "0") {
    statusText = "Canceled";
    statusClass = "table-danger";
  } else if (blog.status =="1") {
    statusText = "Deposit";
    statusClass = "table-primary";
  } else if (blog.status == "2") {
    statusText = "Success";
    statusClass = "table-success";
  }

  const handlePaid = (id: any) => {
    window.location.reload();
    dispatch(paidBlog(id) as unknown as AnyAction);
  };
  const handleCancel = (id: any) => {
    window.location.reload();

    dispatch(cancelBlog(id) as unknown as AnyAction);
  };

  const handelNav = () => {
    window.location.href = `/blog-detail/${blog._id}`;
    
  }
  return (
    <tr className={statusClass}>
      {/* <th scope="row">{blog._id} </th> */}

      <td>{blog.title}</td>
      <td>{blog.description}</td>
      <td dangerouslySetInnerHTML={{__html: html}}></td>
      <td>{statusText}</td>
      <td className="d-flex gap-3 justify-content-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setConfirmBlog(true)}
          disabled={blog.status != "1"}
        >
          Paid
        </button>

        <div
          className={
            "position-fixed top-0 bottom-0 animation-popup background-popup index-top" +
            (confirmBlog ? " active" : "")
          }
          tabIndex={-1}
          style={{ left: "0", right: "0" }}
        >
          <div
            className={
              "modal-dialog mt-5 animation-popup background-popup index-top" +
              (confirmBlog ? " active" : "")
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
                  onClick={() => setConfirmBlog(false)}
                ></button>
              </div>
              <div className="modal-body p-4 border-top text-default text-initial">
                {`Have you received enough money? Total is: `}
                <strong>{blog._id}</strong>
              </div>
              <div className="modal-footer p-4 border-top d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={(e) => setConfirmBlog(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handlePaid(blog._id);
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
            setConfirmCancelBlog(true);
          }}
          type="button"
          className="btn btn-danger"
          disabled={blog.status != "1"}
        >
          Cancel
        </button>
        <div
          className={
            "position-fixed top-0 bottom-0 animation-popup background-popup index-top" +
            (confirmCancelBlog ? " active" : "")
          }
          tabIndex={-1}
          style={{ left: "0", right: "0" }}
        >
          <div
            className={
              "modal-dialog mt-5 animation-popup background-popup index-top" +
              (confirmCancelBlog ? " active" : "")
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
                  onClick={() => setConfirmCancelBlog(false)}
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
                  onClick={(e) => setConfirmCancelBlog(false)}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleCancel(blog._id);
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
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => handelNav()}
        >
          Detail
        </button>
      </td>
    </tr>
  );
};

export default BlogItem;
