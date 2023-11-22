import React, { useEffect } from "react";
import ListTour from "../Layout/ListTour";
import { useDispatch, useSelector } from "react-redux";
import { getAllToursAdmin } from "../../redux/actions/tour";
import { AnyAction } from "redux";
import { Link } from "react-router-dom";

const Tour = () => {
  const { tours, isLoading } = useSelector((state: any) => state.tours);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllToursAdmin(user?._id) as unknown as AnyAction);
  }, [dispatch]);

  return (
    <div className="mt-12 container mb-12 d-flex align-items-center">
      <div className="w-100 d-flex gap-4">
        <h5 className="fw-bold fz-16 m-0 d-flex align-items-center">Total {tours.length}</h5>
        <Link
          className="text-decoration-none text-white btn"
          style={{ backgroundColor: "#1bbc9b", borderRadius: "8px" }}
          to="/create-tour"
        >
          Create tour
        </Link>
      </div>
      <ListTour data={tours ? tours : []} activeAdmin={true}></ListTour>
    </div>
  );
};

export default Tour;
