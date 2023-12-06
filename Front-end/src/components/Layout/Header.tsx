import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "@/css/header.scss"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { backend_url } from "../../server";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { deleteCookie } from "../../shared/GlobalFunction";
const Header = () => {
  let { isAuthenticated, user } = useSelector((state: any) => state.user);
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  const navigate = useNavigate();
  const handleLogout = () => {
    deleteCookie("token", "/");
    setIsAuth(false);
    // navigate("/");
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="header-sub">
        <div className="header-sub-container container">
          <div className="header-information">
            <Link to="#" className="header-options">
              <span className="ti-credit-card"></span>
              Payment Options
            </Link>
            <Link to="" className="header-term">
              <span className="ti-check-box"></span>
              Terms Conditions
            </Link>
            <Link to="" className="header-place">
              US
            </Link>
            <Link to="" className="header-place">
              IT
            </Link>
            <Link to="" className="header-place">
              ES
            </Link>
          </div>

          <div className="header-user">
            <div className="header-booking">My Bookings</div>
            <div className="header-mail">
              <span className="header-mail-notice">3</span>
              <FontAwesomeIcon icon={faEnvelope} />
              <div className="header-mail-show">
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-newdelhi-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Best Travel Plugin
                    </Link>
                    <Link to="" className="header-main-detail">
                      CHECK FEATURES
                    </Link>
                  </div>
                </div>
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-london-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Multi Purpose
                    </Link>
                    <Link to="" className="header-main-detail">
                      Multi Purpose
                    </Link>
                  </div>
                </div>
                <div className="header-show-content">
                  <img
                    src="/src/assets/images/package-rome-150x150.jpg"
                    alt=""
                    className="header-show-img"
                  />
                  <div className="header-show-main">
                    <Link to="" className="header-main-content">
                      Multi Purpose
                    </Link>
                    <Link to="" className="header-main-detail">
                      VERY EASY TO USE
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/package/create" className="header-review">
              Add Your Package
            </Link>
            <div className="header-account">
              {isAuth ? (
                <>
                  <img
                    className="header-account-avatar"
                    src={`${user.avatar}`}
                    alt=""
                  />
                  <div className="header-account-user">
                  <Link
                      to="/update-user"
                      className="header-account-name limit-line-1"
                    >
                      {user.name}
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="header-account-name"
                    >
                      Log Out
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="header-account-undefine"
                  />

                  <div className="header-account-user">
                    <Link to="/Login" className="header-account-name">
                      User Name
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-solid-color"></div>

      <div className="header-main">
        <div className="header-main-container container">
          <Link to="/" className="">
            <img
              className="header-main-img"
              src="/src/assets/images/logo.png"
              alt=""
            />
          </Link>

          <span className="ti-menu header-main-icon js-btn-menu"></span>
          <div className="disable-mob header-main-content-menu js-content-menu">
            <span className="ti-close header-main-close-item js-btn-close"></span>
            <div className="header-content-container">
              <Link to="/" className="header-content-main">
                HOME
              </Link>
            </div>

            <div className="header-content-container">
              <Link to="/" className="header-content-main">
                PACKAGES
              </Link>
              <div className="header-content-detail">
                <Link to="/" className="header-content-word">
                  SEARCH
                </Link>
              </div>
            </div>
            <div className="header-content-container">
              <Link to="/" className="header-content-main">
                SHOP
              </Link>
              <div className="header-content-detail">
                <Link to="/" className="header-content-word">
                  SHOP
                </Link>
                <Link to="" className="header-content-word">
                  CART
                </Link>
                <Link to="#" className="header-content-word">
                  CHECKOUT
                </Link>
                <Link to="/" className="header-content-word">
                  My ACCOUNT
                </Link>
              </div>
            </div>
            <div className="header-content-container">
              <Link to="" className="header-content-main">
                ABOUT US
              </Link>
            </div>
            <div className="header-content-container">
              <Link to="" className="header-content-main">
                PAGES
              </Link>
              <div className="header-content-detail">
                <Link to="" className="header-content-word">
                  BEST DESTINATION
                </Link>
                <Link to="" className="header-content-word">
                  STAFF
                </Link>
                <Link to="" className="header-content-word">
                  SERVICES
                </Link>
                <Link to="" className="header-content-word">
                  PRICES
                </Link>
                <Link to="" className="header-content-word">
                  FQA
                </Link>
                <Link to="" className="header-content-word">
                  CONTACT 1<span className="ti-arrow-circle-right "></span>
                  <span className="header-content-more">
                    <span className="header-more-detail">Contact 1</span>
                    <span className="header-more-detail">Contact 2</span>
                  </span>
                </Link>
                <Link to="" className="header-content-word">
                  COMING SOON
                </Link>
              </div>
            </div>

            <div className="header-content-container">
              <Link to="blog-page" className="header-content-main">
                BLOG
              </Link>
            </div>

            <div className="header-content-container">
              <Link to="/create-blog" className="header-content-main">
                POST BLOG
              </Link>
              {/* <div className="header-content-detail">
                <Link to="" className="header-content-word">
                 
                </Link>
                <Link to="" className="header-content-word">
                  Contact 2
                </Link>
              </div> */}
            </div>

            <div className="header-content-container">
              <span className="header-content-booking">BOOK NOW</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
