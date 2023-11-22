import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center w-100 bg-image"
      style={{
        backgroundImage: `url("https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/401-Unauthorized-t.jpg")`,
        width: "75vw",
        height: "75vh",
      }}
    >
      <Link
        className="text-decoration-none btn text-white"
        style={{ backgroundColor: "#1bbc9b" }}
        to="/"
      >
        This is not your page Please Click here to logout
      </Link>
    </div>
  );
};

export default ErrorPage;
