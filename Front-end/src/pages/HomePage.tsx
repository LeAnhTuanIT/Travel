import React, { ChangeEventHandler, useState, useEffect } from "react";
import Slider from "react-slick";
import bgImage from "../assets/images/parallax-1.jpg";
import bgImage2 from "../assets/images/parallax-2.jpg";
import convenientImage1 from "../assets/images/continent-1.jpg";
import convenientImage2 from "../assets/images/continent-2.jpg";
import convenientImage3 from "../assets/images/continent-3.jpg";
import convenientImage4 from "../assets/images/continent-4.jpg";
import ItemTravel from "../components/Layout/ListTour";
// import "../../node_modules/slick-carousel/slick/slick-theme.css"
// import "../../node_modules/slick-carousel/slick/slick.css"\
// import '../assets/css/home.scss';
import "~/slick-carousel/slick/slick.css";
import "~/slick-carousel/slick/slick-theme.css";
import ListTour from "../components/Layout/ListTour";
import { Link } from "react-router-dom";
import ListTourX from "../components/Layout/ListTourX";
import { aimData, destinationData, countryData } from "../static/data";
import { useDispatch, useSelector } from "react-redux";
import { getAllTours, getPDF, getTourByName } from "../redux/actions/tour";
import { AnyAction } from "redux";
import axios from "axios";
import { server } from "../server";
import Newsletter from "../components/Layout/Newsletter";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
  };
  const { tours, isLoading } = useSelector((state: any) => state.tours);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTours() as unknown as AnyAction);
  }, [dispatch]);

  const [keyword, setKeyword] = useState("");
  const [destination, setDestination] = useState("");
  const [aim, setAim] = useState("");
  let [destinationCount, setDestinationCount] = useState(0);
  let [tourPackage, setTourPackage] = useState(0);
  let [hoursSupport, setHoursSupport] = useState(0);
  let [cruisesCount, setCruisesCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let flagDestinationCount = false;
      let flagTourPackage = false;
      let flagHoursSupport = false;
      let flagCruisesCount = false;

      if (destinationCount < 152 && !flagDestinationCount) {
        setDestinationCount((prevCount) => prevCount + 1);
      } else flagDestinationCount = true;

      if (tourPackage < 74 - 1 && !flagTourPackage) {
        setTourPackage((prevCount) => prevCount + 1);
      } else flagTourPackage = true;

      if (hoursSupport < 24 - 1 && !flagHoursSupport) {
        setHoursSupport((prevCount) => prevCount + 1);
      } else flagHoursSupport = true;

      if (cruisesCount < 86 - 1 && !flagCruisesCount) {
        setCruisesCount((prevCount) => prevCount + 1);
      } else flagCruisesCount = true;

      if (
        flagDestinationCount &&
        flagTourPackage &&
        flagHoursSupport &&
        flagCruisesCount
      )
        clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [destinationCount]);

  useEffect(() => {
    setData(tours.slice(0, 6));
  }, []);

  const [data, setData] = useState([]);

  const handleSearchChange = (e: any) => {
    const term = e.target.value;
    setKeyword(term);

    if (term !== "") {
      axios
        .get(`${server}/tour/search/${term}`) // Gửi yêu cầu GET đến API endpoint với từ khóa tìm kiếm
        .then((response) => {
          const filteredTour = response.data.tours; // Lấy danh sách tours từ kết quả trả về của API endpoint
          setData(filteredTour); // Cập nhật danh sách tours trên giao diện
        })
        .catch((error) => {
          console.error(error);
          // Xử lý lỗi nếu có
        });
    } else {
      setData(tours); // Đưa danh sách tours về trạng thái ban đầu
    }
  };

  const handleDestinationChange = (e: any) => {
    const term = e.target.value;
    if (term != "") {
      setDestination(term);

      const filteredTour =
        data &&
        data.filter((tour: any) => {
          console.log(tour);
          return tour.destination.toLowerCase().includes(term.toLowerCase());
        });
      console.log(filteredTour);
      setData(filteredTour);
    } else {
      setData(tours);
    }
  };

  const handleAimChange = (e: any) => {
    const term = e.target.value;
    if (term != "") {
      setAim(term);

      const filteredTour =
        data &&
        data.filter((tour: any) => {
          return tour?.aim.toLowerCase().includes(term.toLowerCase());
        });
      setData(filteredTour);
    } else {
      setData(tours);
    }
  };

  return (
    <div className="">
      <div className="main-container-head">
        <Slider {...settings} className="main-container-head">
          {/* travel 1  */}
          <div className="main-content-main">
            <img src={bgImage} alt="" className="main-header-img" />
            <div className="main-destination container">
              <div className="main-container-text">
                <div className="main-destination-container">
                  <span className="main-header-destination">PARIS</span>
                </div>
                <div className="main-header-quality">
                  <div className="main-big-quality">TOUR</div>
                  <div className="main-small-quality">EIFFEL</div>
                </div>
                <div className="main-header-place">
                  <span className="main-small-place">CITY</span>
                  <span className="main-big-place">TOUR</span>
                </div>
                <span className="main-header-price">
                  <div className="main-sale-animation">
                    <span
                      style={{ backgroundColor: "rgb(243, 164, 107)" }}
                      className="main-header-sale"
                    >
                      SALE
                    </span>
                  </div>
                  <div className="main-price-animation">1500</div>
                  <span className="main-header-icon">$</span>
                </span>
              </div>
            </div>
          </div>

          {/* travel 2 */}
          <div className="main-content-main">
            <img src={bgImage2} alt="" className="main-header-img " />
            <div className="container main-destination ">
              <div className="main-container-text-2 ">
                <div className="main-destination-container">
                  <span className="main-header-destination">ITALY</span>
                </div>
                <div className="main-header-quality">
                  <span className="main-big-quality">BEST</span>
                  <span className="main-small-quality">TOURS</span>
                </div>
                <div className="main-header-place">
                  <span className="main-small-place">CITY</span>
                  <span className="main-big-place">TOUR</span>
                </div>
                <span className="main-header-price">
                  <div className="main-sale-animation">
                    <span className="main-header-sale">SALE</span>
                  </div>
                  <div className="main-price-animation">2.400</div>
                  <span className="main-header-icon">$</span>
                </span>
              </div>
            </div>
          </div>
        </Slider>

        <div className="main-input-container">
          <div className="main-input-information">
            <div className="main-input-search">
              <span className="main-input-icon ti-search"></span>
              QUICK SEARCH
            </div>
            <div className="main-input-advanced">
              <span className="main-input-icon ti-layout-menu-v"></span>
              ADVANCED
            </div>
          </div>

          <div className="main-label-container">
            <input
              type="keyword"
              className="main-form-control"
              id="keyword"
              placeholder="Insert keyword"
              value={keyword}
              onChange={handleSearchChange}
            />

            <select
              className="main-form-select"
              aria-label="Default select example"
              onChange={handleDestinationChange}
            >
              <option>All Destination</option>
              {destinationData.map((destination) => (
                <option value={destination.value}>{destination.label}</option>
              ))}
            </select>

            <select
              className="main-form-select"
              aria-label="Default select example"
              onChange={handleAimChange}
            >
              <option selected value="">
                All Typologies
              </option>
              {aimData.map((aim) => (
                <option value={aim.value}>{aim.label}</option>
              ))}
            </select>

            <button type="submit" className="main-btn-label">
              SEARCH
            </button>
          </div>
        </div>
      </div>
      <ListTour data={data.length ? data : tours.slice(0, 6)}></ListTour>

      <div className="main-container-more">
        <Link to="/search-tours" className="main-more-big">
          ALL PACKAGES
        </Link>
        <a href="" className="main-more-small">
          PROMOTIONS
        </a>
      </div>

      <div className="main-middle">
        <div
          className="main-middle-image"
          style={{
            backgroundImage:
              "url(https://travel-my-uploads.s3.ap-southeast-1.amazonaws.com/uploads/parallax-3.jpg)",
          }}
        ></div>

        <div className="main-middle-information">
          <div className="main-middle-head">SUMMER PROMOTION</div>
          <div className="main-middle-content">
            SANTORINI - GREEK ISLAND TOUR
          </div>
          <div className="main-middle-detail">1000 $ for person - 6 nights</div>
          <div className="main-button-container">
            <a href="#" className="main-middle-button">
              MORE DETAILS
            </a>
          </div>
        </div>
      </div>

      <div className="main-tour-head">
        <span className="main-head-big">OUR DESTINATIONS</span>
        <span className="main-head-small">CHOOSE YOUR NEXT DESTINATION</span>
        <span className="main-head-bar"></span>
      </div>

      <div className="main-continents-container container mt-12">
        <Link to="#" className="main-continent mt-3 mb-9 m-10">
          <img src={convenientImage1} alt="" className="main-continent-img" />
          <div className="main-continent-place">OCEANIA</div>
        </Link>

        <a href="#" className="main-continent mt-3 mb-9 m-10">
          <img src={convenientImage2} alt="" className="main-continent-img" />
          <div className="main-continent-place">AFRICA</div>
        </a>

        <a href="#" className="main-continent mt-3 mb-9 m-10">
          <img src={convenientImage3} alt="" className="main-continent-img" />
          <div className="main-continent-place">AMERICA</div>
        </a>

        <a href="#" className="main-continent mt-3 mb-9 m-10">
          <img src={convenientImage4} alt="" className="main-continent-img" />
          <div className="main-continent-place">ASIA</div>
        </a>
      </div>

      <div className="main-footer-information">
        <div className="main-information-container container">
          <div className="main-information-details mt-3 mb-12">
            <span className="main-information-number">{destinationCount}</span>
            <div className="main-information">
              <span
                style={{ backgroundColor: "#ffd205" }}
                className="main-information-item"
              >
                DESTINATIONS
              </span>
            </div>
          </div>

          <div className="main-information-details mt-3 mb-12">
            <span className="main-information-number">{tourPackage}</span>
            <div className="main-information">
              <span
                style={{ backgroundColor: "#1bbc9b" }}
                className="main-information-item"
              >
                TOURS PACK
              </span>
            </div>
          </div>

          <div className="main-information-details mt-3 mb-12">
            <span className="main-information-number">{cruisesCount}</span>
            <div className="main-information">
              <span
                style={{ backgroundColor: "#14b9d5" }}
                className="main-information-item"
              >
                CRUISES
              </span>
            </div>
          </div>

          <div className="main-information-details mt-3 mb-12">
            <span className="main-information-number">{hoursSupport}</span>
            <div className="main-information">
              <span
                style={{ backgroundColor: "#f76570" }}
                className="main-information-item"
              >
                HOUR SUPPORT
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Newsletter />
      </div>

      <div className="main-footer ">
        <div className="main-footer-container container mt-12 ">
          <div className="main-footer-contact mt-3 mb-12 m-10 flex-1">
            <div className="main-footer-input">
              <div className="main-input-search">REQUEST</div>
              <div className="main-input-advanced">
                <span className="main-input-icon ti-world"></span>
                CONTACT
              </div>
            </div>

            <div className="main-footer-label">
              <input
                style={{ margin: "20px 0" }}
                type="text"
                className="main-form-control m-w-100"
                id="exampleFormControlInput1"
                placeholder="Name"
              />
              <input
                style={{ margin: "20px 0" }}
                type="email"
                className="main-form-control m-w-100"
                id="exampleFormControlInput1"
                placeholder="Email"
              />
              <input
                style={{ margin: "20px 0" }}
                type="text"
                className="main-form-control m-w-100"
                id="exampleFormControlInput1"
                placeholder="Guests"
              />

              <select
                style={{ margin: "20px 0" }}
                className="main-form-select m-w-100"
                aria-label="Default select example"
              >
                <option selected>Select Destination</option>
                <option>- London</option>
                <option>- Rome</option>
                <option>- New Delhi</option>
                <option>- Dubai</option>
              </select>
              <textarea
                className="main-form-textarea"
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="Messages"
              ></textarea>

              <button
                type="submit"
                onClick={() => dispatch(getPDF())}
                className="main-footer-btn"
              >
                SEND NOW
              </button>
            </div>
          </div>

          <ListTourX className="flex-3" data={tours.slice(0, 3)}></ListTourX>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
