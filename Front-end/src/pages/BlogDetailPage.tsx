import Slider from "react-slick";
import parse from 'html-react-parser';
import React, { useEffect, useState, useRef } from "react";
import { Form, ListGroup } from 'reactstrap';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import {
  getBlogById,
} from "../redux/actions/blog";
import { AnyAction } from "redux";
import { useParams } from "react-router-dom";
import "../assets/css/blogdetail.scss";
import { toast } from "react-toastify";
import {createReviewBLog } from "../redux/actions/review";


const BlogDetailPage = () => {


  const { user } = useSelector((state: any) => state.user);
  

  const { blog } = useSelector((state: any) => state.blogs);

  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogById(id) as unknown as AnyAction);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
  };

  const [html, setHtml] = useState<string>("")
  useEffect(() => {
    setHtml(blog.content)
  }, [html])


  const [blogRating, setBlogRating] = useState(0);
  const reviewsMsgRef = useRef<HTMLInputElement>(null);

  function handleRatingSubmit(e: any) {
    e.preventDefault();
    if(!blogRating || blogRating <= 0 || blogRating > 5) {
      toast.error("Please enter your rating !!");
      return;
    }

    if(user._id == null) {
      toast.error("Please login to rating !!");
      return;
    }

    if(!reviewsMsgRef.current?.value|| undefined) {
      toast.error("Please enter your comment !!");
      return;
    }
    
    const data = {
      rating: blogRating,
      comments: reviewsMsgRef.current.value,
      blogId: blog._id,
      userId: user._id,
    };

    dispatch(createReviewBLog(data) as unknown as AnyAction);
    toast.success("Rating success !!");
    window.location.reload();
  }

  console.log(blog)
  return blog ? (
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
      </div>
          <span className="item-header-text">{blog.title}</span>
        </div>

        

      
      <div className="item-content" style={{ marginBottom: "60px" }}>
        <div className="item-content-container container">
          <div className="item-content-main mt-8 m-10">
            <div className="item-content-detail">
              <div className="item-content-text" dangerouslySetInnerHTML={{__html: html}}></div>
            </div>

            <div className="item-content-view">
              <div className="item-view-head">VIEW THE PHOTOS</div>
            </div>
            <Form onSubmit={handleRatingSubmit}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setBlogRating(1)}>
                        1 <i className="ri-star-fill start"></i>
                      </span>
                      <span onClick={() => setBlogRating(2)}>
                        2 <i className="ri-star-fill start"></i>
                      </span>
                      <span onClick={() => setBlogRating(3)}>
                        3 <i className="ri-star-fill start"></i>
                      </span>
                      <span onClick={() => setBlogRating(4)}>
                        4 <i className="ri-star-fill start"></i>
                      </span>
                      <span onClick={() => setBlogRating(5)}>
                        5 <i className="ri-star-fill start"></i>
                      </span>
                    </div>
                    <div className="reviews__input">
                      <input
                        type="text"
                        placeholder="share your thoughts"
                        ref={reviewsMsgRef}
                        required
                      />
                      <button className="btn primary__btn" type="submit">
                        Submit
                      </button>
                    </div>
            </Form>

            <ListGroup className="user__reviews">
                    {blog.reviews?.map((review: any, index: any) => (
                      <div className="reviews__item" key={index}>
                        <img src={review.user.avatar} alt="" className="img-review"/>

                        <div className="w-100">
                          <div
                            className="d-flex align-items-center 
                          justify-content-between"
                          >
                            <div>
                              <h5>{review.user.name}</h5>
                              <p>
                                {review.createAt.toString().substring(0, 10)}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              {review.rating} <i className="ri-star-fill"></i>
                            </span>
                          </div>
                          <h6>{review.comments}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                  </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default BlogDetailPage;
