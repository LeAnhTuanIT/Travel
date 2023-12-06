import { useEffect, useState } from "react";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { moneyFormatter } from "../../shared/GlobalFunction";
import { useDispatch } from "react-redux";
import { deleteTours, getAllToursAdmin } from "../../redux/actions/tour";
import { AnyAction } from "redux";
const ListTour = (data: any) => {
  const items = data.data;
  const active = data.activeAdmin;
  const searchPage = data.searchPage;
  const [isDelete, setIsDelete] = useState(false);

  const twice = searchPage ? "6" : "4";
  const formatter = moneyFormatter();
  const dispatch = useDispatch();

  function handleDelete(id: any) {
    dispatch(deleteTours(id) as unknown as AnyAction);
    window.location.reload();
  }

  return (
    <div className="mt-12 container mb-12">
      {/* a tour */}
      {items.length != 0
        ? items.map((item: any, index: any) => {
          // const [html, setHtml] = useState<string>("")
          //   useEffect(() => {
          //   setHtml()
          //   }, [html])

            return (
              <div
                key={index}
                style={{ padding: "0 15px", margin: "15px auto" }}
                className={`mt-${twice} body-container-tour mb-12 m-9`}
              >
                <div style={{ border: "1px solid #f1f1f1" }}>
                  <Link to={`/tour-detail/${item._id}`}>
                    <div
                      style={{
                        backgroundImage: `url("${item.images[0]}")`,
                      }}
                      className="body-choice-img"
                    >
                      <span className="body-choice-price">
                        {formatter.format(item.price)} VND
                      </span>
                    </div>
                  </Link>

                  <div className="body-choice-destination">{item.name}</div>

                  <div
                    style={{ backgroundColor: `#${item.color}` }}
                    className="body-choice-feature"
                  >
                    <Link to="./Europe" className="body-choice-continent">
                      {item.destination}
                    </Link>
                    <Link to="./Cultural" className="body-choice-aim">
                      {item.aim}
                    </Link>
                  </div>
                  <div
                    style={{ padding: "20px" }}
                    className="body-choice-content-container"
                  >
                    <div className="body-choice-content">
                      {item.description.replace(/<[^>]+>/g, '')}
                      
                    </div>
                    <div className="w-100 d-flex justify-content-between gap-4 flex-wrap">
                      {active ? (
                        <>
                          <Link
                            to={`/tour-detail/${item._id}`}
                            className="body-choice-btn"
                          >
                            Details
                          </Link>

                          <Link
                            to={`/update-tour/${item._id}`}
                            className="body-choice-btn"
                          >
                            Update
                          </Link>
                          <Link
                            to=""
                            onClick={(e) => setIsDelete(true)}
                            className="body-choice-btn"
                          >
                            Delete
                          </Link>
                          <div
                            className={
                              "position-fixed top-0 bottom-0 animation-popup background-popup" +
                              (isDelete ? " active" : "")
                            }
                            tabIndex={-1}
                            style={{ left: "0", right: "0" }}
                          >
                            <div
                              className="modal-dialog mt-5"
                              style={{
                                backgroundColor: "#fff",
                                maxWidth: "400px",
                              }}
                            >
                              <div className="modal-content">
                                <div className="modal-header p-4">
                                  <h5 className="modal-title text-default">
                                    Are your sure delete this tour
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setIsDelete(false)}
                                  ></button>
                                </div>
                                <div className="modal-body p-4 border-top text-default">
                                  <p>
                                    You couldn't revert this action please be
                                    careful.
                                  </p>
                                </div>
                                <div className="modal-footer p-4 border-top d-flex justify-content-evenly">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => setIsDelete(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={handleDelete}
                                    type="button"
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link to={`/tour-detail/${item._id}`} className="body-choice-btn">
                            Details
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default ListTour;
