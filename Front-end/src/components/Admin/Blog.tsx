import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlog } from "../../redux/actions/blog";
import { AnyAction } from "redux";
import { Link } from "react-router-dom";
import BlogList from "../../pages/BlogList";

const BLog = () => {
  const { blogs, isLoading } = useSelector((state: any) => state.blogs);
  const { user } = useSelector((state: any) => state.user);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog() as unknown as AnyAction);
  }, [dispatch]);
 

  console.log(blogs)
  return (
    <div className="mt-12 container mb-12 d-flex align-items-center">
      <div className="w-100 d-flex gap-4">  
      </div>
      <BlogList data={blogs ? blogs : []} activeAdmin={true}></BlogList>
    </div>
  );
};

export default BLog;
