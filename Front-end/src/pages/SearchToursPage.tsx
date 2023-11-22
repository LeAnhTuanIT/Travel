import React, { useState, useEffect } from "react";
import navbarImages from "../assets/images/parallax-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import ListTour from "../components/Layout/ListTour";
import { getAllTours } from "../redux/actions/tour";
import { AnyAction } from "redux";
import { aimData, destinationData, countryData } from "../static/data";
import { moneyFormatter } from "../shared/GlobalFunction";
const SearchToursPage = () => {
  const { tours, isLoading } = useSelector((state: any) => state.tours);
  const [searchPrice, setSearchPrice] = useState("0");
  const [searchAim, setSearchAim] = useState("");
  const [searchDestination, setSearchDestination] = useState("");
  const [searchKeyword, setSearchKeyWord] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage, setTourPerPage] = useState(4);
  const lastPostIndex = currentPage * toursPerPage;
  const firstPostIndex = lastPostIndex - toursPerPage;

  const highestTourPrice = tours.reduce(
    (highestPrice: any, currentTour: any) => {
      if (currentTour.score > highestPrice.score) {
        return currentTour;
      } else {
        return highestPrice;
      }
    },
    tours[0]
  );

  const formatter = moneyFormatter();

  let dataTours = tours;
  // filter by keyword
  if (searchPrice != "0") {
    dataTours = dataTours.filter((tour: any) => tour.price <= searchPrice);
  }
  if (searchDestination != "")
    dataTours = dataTours.filter(
      (tour: any) => tour.destination == searchDestination
    );
  if (searchAim != "") {
    dataTours = dataTours.filter((tour: any) => tour.aim == searchAim);
  }
  if (searchKeyword != "") {
    dataTours = dataTours.filter((tour: any) => tour.name.includes(searchKeyword));
  }

  let currentTours = dataTours.slice(firstPostIndex, lastPostIndex);

  const totalPage = Math.ceil(dataTours.length / toursPerPage);

  let pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTours() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <>
      <div
        style={{ backgroundImage: `url('${navbarImages}')` }}
        className="main-content position-relative"
      >
        <div className="main-content-container">
          <span className="main-content-text">SEARCH</span>
        </div>
      </div>
      <div className="navbar-opt ">
        <div className="navbar-opt-container container">
          <div className="navbar-option-container">
            <div className="navbar-option-choice">
              <span className="active navbar-option-content ">
                PRICE
                <span className="navbar-option-icon ti-angle-down"></span>
                <div className="navbar-option-detail">
                  <span className="active-option-detail navbar-detail-text ">
                    LOWEST PRICE
                  </span>
                  <span className="navbar-detail-text">HIGHEST PRICE</span>
                </div>
              </span>
            </div>
            <div className="navbar-option-choice">
              <span className="navbar-option-content">
                NAME
                <span className="navbar-option-icon ti-angle-down"></span>
                <div className="navbar-option-detail">
                  <span className="navbar-detail-text">DESC</span>
                  <span className="navbar-detail-text">ASC</span>
                </div>
              </span>
            </div>
          </div>

          <div className="navbar-display">
            <span className="navbar-display-icon ti-list-ol"></span>
            <span className="navbar-display-icon ti-menu"></span>
          </div>
        </div>
      </div>

      <div className="body-content mt-8">
        <div className="body-content-option mt-4 mb-12 m-12">
          <div className="body-content-header">
            <span className="body-content-title ">Select your destination</span>
            <div className="body-content-container">
              <input
                type="keyword"
                className="body-content-box"
                id="keyword"
                placeholder="Insert keyword"
                onChange={(e) => setSearchKeyWord(e.target.value)}
              />
            </div>
            <div className="body-content-container">
              <select
                name="choice-destination"
                id="destination"
                className="body-content-box"
                onChange={(e) => setSearchDestination(e.target.value)}
              >
                <option value="" className="body-box-option">
                  All Destination
                </option>
                {destinationData.map((destination: any) => (
                  <option value={destination.value} className="body-box-option">
                    {destination.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="body-content-container">
              <select
                name="choice-destination"
                id="destination"
                className="body-content-box"
                onChange={(e) => setSearchAim(e.target.value)}
              >
                <option value="" className="body-box-option">
                  All Aim
                </option>
                {aimData.map((destination: any) => (
                  <option value={destination.value} className="body-box-option">
                    {destination.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="body-range-container">
            <label htmlFor="customRange1" className="body-range-label">
              Max Price :{" "}
              <span className="js-price">
                {formatter.format(Number(searchPrice))}VND
              </span>
            </label>
            <input
              type="range"
              className="body-content-range"
              id="customRange1"
              min="0"
              max={highestTourPrice ? highestTourPrice.price : "100000"}
              value={searchPrice}
              onChange={(e: any) => setSearchPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="body-container-choice mt-8 container mb-12 m-10 d-flex justify-content-center">
          <ListTour data={currentTours} searchPage={true}></ListTour>

          <div>
            <ul className="pagination d-flex justify-content-center">
              <li className="page-item">
                <div
                  className="cursor-pointer page-link"
                  onClick={() => {
                    if (currentPage != 1) {
                      return setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  Previous
                </div>
              </li>
              {pages.map((page, index) => {
                return (
                  <li className="page-item">
                    <div
                      className="cursor-pointer page-link"
                      key={index}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </div>
                  </li>
                );
              })}
              <li className="page-item">
                <div
                  className="cursor-pointer page-link"
                  onClick={() => {
                    if (currentPage != totalPage) {
                      return setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  Next
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchToursPage;
