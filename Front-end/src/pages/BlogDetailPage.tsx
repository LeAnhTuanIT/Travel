import Slider from "react-slick";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import ListTour from "../components/Layout/ListTour";
// import ListTourX from "../components/Layout/ListTourX";
import { validatePhoneNumber, moneyFormatter } from "../shared/GlobalFunction";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogById,
} from "../redux/actions/blog";
import { AnyAction } from "redux";
import { useParams } from "react-router-dom";
import { backend_url, server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const BlogDetailPage = () => {
  const { user } = useSelector((state: any) => state.user);
  const formatter = moneyFormatter();
  let { id } = useParams();
  const [description, setDescription] = useState("abc");
  const [quantity, setQuantity] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phoneNumber : "");
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const { blog, blogs, isLoading, redirectUrl } = useSelector(
    (state: any) => state.tours
  );

//   const depositPrice = (blog.price * quantity * 20) / 100;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(getBlogById(id) as unknown as AnyAction);
  }, [dispatch]);

//   useEffect(() => {
//     console.log(user)
//     dispatch(getAllTours() as unknown as AnyAction);
//   }, [dispatch]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter your name !!");
      return;
    }

    if (!email) {
      toast.error("Please enter your email !!");
      return;
    }
    console.log("hello");
    console.log(phoneNumber);
    if (validatePhoneNumber(phoneNumber) === false) {
      toast.error("Please check your number phone !!");
      return;
    }

    if (!description) {
      toast.error("Please enter your description !!");
      return;
    }

    if (!quantity || quantity <= 0 || quantity > 20) {
      toast.error("Your quantity is illegal  !!");
      return;
    }

    const data = {
    //   amount: depositPrice,
      orderDescription: description,
      blog: blog._id,
      userId: user ? user._id : null,
      quantity: quantity,
    };
    console.log(blog._id)
    console.log(data)
    // dispatch(createPaymentUrl(data) as unknown as AnyAction);
  }

  return blog ?  (
    <>
      <div className="item-header">
        <div
          className="main-middle-image"
          style={{
            backgroundImage: `url("${
              blog.images ? blog?.images[0] : null
            }")`,
          }}
        >
          <span className="item-header-text">{blog.name}</span>
        </div>

        <div className=" item-feature container">
          <div className="item-feature-content">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ backgroundColor: `#${blog.color}` }}
              className="item-feature-icon"
            />
            <div className="item-feature-text">
              <div className="item-feature-header text-capitalize">
                {blog.continent}
              </div>
              <div className="item-feature-sub">{blog.country}</div>
            </div>
          </div>

          <div className="item-feature-content">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ backgroundColor: `#${blog.color}` }}
              className="item-feature-icon"
            />
            <div className="item-feature-text">
              <div className="item-feature-header text-capitalize">
                {blog.aim}
              </div>
              <div className="item-feature-sub">
                Lorem ipsum dolor sit amet, consec dolor sit amet anis po.
              </div>
            </div>
          </div>

          <div
            style={{ backgroundColor: `#${blog.color}` }}
            className="item-feature-price"
          >
            {formatter.format(blog.price)}{" "}
            <span className="item-price-icon">VND</span>
          </div>
        </div>
      </div>

      <div className="item-content" style={{ marginBottom: "40px" }}>
        <div className="item-content-container container">
          <div className="item-content-main mt-8 m-10">
            <div className="item-content-detail">
              <div className="item-content-text">{blog.description}</div>
            </div>

            <div className="item-content-view">
              <div className="item-view-head">VIEW THE PHOTOS</div>
            </div>

            <div className="item-view-container">
              <Slider {...settings} className="item-img-container">
                {blog.images
                  ? blog.images.map((image: any) => (
                      <img
                        src={`${image}`}
                        alt=""
                        width={250}
                        height={400}
                        className="bg-image"
                      />
                    ))
                  : null}
              </Slider>

              <div className="item-view-choice ">
                <span className="item-choice-img view-active">
                  TOUR GALLERY
                </span>
                <span className="item-choice-img">TOUR MAP</span>
              </div>
            </div>
            {/* <ListTourX
              className="flex-3"
              data={tours.length != 0 ? tours.slice(0, 3) : []}
            ></ListTourX> */}
          </div>

          <div className="item-content-contact mt-4 m-9">
            <div className="item-contact-advice">
              <div className="item-contact-content">
                Ctus at sollicitudin elementum. Sed dolor turpis, condimentum
                sit amet maximus sit amet, lorem commodo lectus at sollicitudin.
              </div>
              <div className="item-contact-expert">
                <img
                  src="http://www.nicdarkthemes.com/themes/travel/wp/demo/travel/wp-content/uploads/sites/2/2018/03/testimonial-1.jpg"
                  alt=""
                  className="item-contact-img"
                />
                <div className="item-contact-information">
                  <div className="item-contact-name">JANE GOLEMAN</div>
                  <div className="item-contact-quote">
                    I love discover the world !
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ marginTop: "96px", height: "auto" }}
              className="main-footer-contact mt-12 "
            >
              <div className="main-footer-input">
                <div className="main-input-search">BOOK THIS TOUR</div>
                <div className="main-input-advanced">DEPOSIT 20%</div>
              </div>
              <div className="main-footer-label">
                <input
                  style={{ margin: "20px 0" }}
                  type="text"
                  className="main-form-control m-w-100"
                  value={name}
                  disabled={user}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}

                />
                <input
                  style={{ margin: "20px 0" }}
                  type="email"
                  className="main-form-control m-w-100"
                  value={email}
                  disabled={user}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  style={{ margin: "20px 0" }}
                  type="text"
                  placeholder="Your phone number"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  disabled={user}
                  className="main-form-control m-w-100"
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
                <input
                  style={{ margin: "20px 0" }}
                  type="number"
                  className="main-form-control m-w-100"
                  onChange={(e: any) => setQuantity(e.target.value)}
                  value={quantity}
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                />

                {/* <textarea
                  className="main-form-textarea"
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  placeholder="Descriptions"
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                ></textarea> */}
                <div className="d-flex justify-content-between">
                  <h6 className="text-white">Price: </h6>
                  <h6 className="text-white">
                    {/* {blog.price ? formatter.format(depositPrice) : null} VND */}
                  </h6>
                </div>
                <button type="submit" className="main-footer-btn">
                  BOOKING NOW
                </button>
              </div>
            </form>
            <div className="item-head">BEST PROMOTIONS</div>

            <div className="item-sub-promotion">
              <div className="item-promotion-li">
                <div className="item-promotion-container-img">
                  <div className="item-promotion-sale">SALE</div>
                  <img
                    className="item-promotion-img"
                    src="http://www.nicdarkthemes.com/themes/travel/wp/demo/travel/wp-content/uploads/sites/2/2018/03/package-newdelhi-150x150.jpg"
                    alt=""
                  />
                </div>

                <div className="item-promotion-information">
                  <div className="item-promotion-place">New Delhi</div>
                  <div className="item-promotion-price">500 $</div>
                </div>
              </div>

              <div className="item-promotion-li">
                <div className="item-promotion-container-img">
                  <img
                    className="item-promotion-img"
                    src="http://www.nicdarkthemes.com/themes/travel/wp/demo/travel/wp-content/uploads/sites/2/2018/03/package-rome-150x150.jpg"
                    alt=""
                  />
                </div>

                <div className="item-promotion-information">
                  <div className="item-promotion-place">Rome</div>
                  <div className="item-promotion-price">1500 $</div>
                </div>
              </div>
            </div>

            <div className="item-highlight">
              <a href="#" className="item-highlight-link">
                England
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default BlogDetailPage;
