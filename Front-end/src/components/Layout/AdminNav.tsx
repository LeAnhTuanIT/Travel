import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <div className="categories">
      <ul className="categories__list d-flex flex-column gap-3 align-items-center">
        <li className="categories__item">
          <Link
            to="/admin/payments"
            className="categories__item--active gap-2 border-m d-flex flex-column justify-content-center align-items-center"
          >
            <i className="fa-solid fa-house"></i>
            <h6 className="text-default">Payment</h6>
          </Link>
        </li>
        <li className="categories__item">
          <Link
            to="/tour-dashboard"
            className="categories__item--link gap-2 border-m d-flex flex-column justify-content-center align-items-center"
          >
            <i className="fa-solid fa-road"></i>
            <h6 className="text-default">Dash</h6>
          </Link>
        </li>
        <li className="categories__item">
          <Link
            to="/admin/chart"
            className="categories__item--link gap-2 border-m d-flex flex-column justify-content-center align-items-center"
          >
            <i className="fa-solid fa-lightbulb"></i>
            <h6 className="text-default">Chart</h6>
          </Link>
        </li>

        <li className="categories__item">
          <Link
            to="/admin/blog"
            className="categories__item--link gap-2 border-m d-flex flex-column justify-content-center align-items-center"
          >
            <i className="fa-solid fa-newspaper"></i>
            <h6 className="text-default">Revenue</h6>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
