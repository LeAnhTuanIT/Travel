import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { destinationData, aimData, countryData } from "../static/data";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import { createBlog } from './../redux/actions/blog';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const CreateBlog = () => {

  // text editor
  const [value, setValue] = useState('');

  //



  const { error, success } = useSelector((state: any) => state.tours);
  const { user } = useSelector((state: any) => state.user);

  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Create new tour sucess");
      navigate("/");
    }
  }, [dispatch, error, success, user]);

  const handleImageChange = (e: any) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages: any) => [...prevImages, ...files]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newForm = new FormData();

    if (
      title == "" ||
      description == "" ||
      value == ""
    ) {
      toast.error("Not Enough Information, Please check Again !!");
      return;
    }

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("title", title);
    newForm.append("description", description);
    newForm.append("content", value);
    newForm.append("user_id", user._id);
    console.log(newForm)
    
    dispatch(createBlog(newForm) as unknown as AnyAction);
  };

  return  (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="main-footer-contact mb-12 m-10 flex-1 my-5 mx-auto"
      style={{ width: "75vw" }}
    >
      <div className="main-footer-input">
        <div className="main-input-search">Create </div>
        <div className="main-input-advanced">
          <span className="main-input-icon ti-world"></span>
          BLog
        </div>
      </div>

      <div className="main-footer-label">
        <input
          style={{ margin: "20px 0" }}
          type="text"
          className="main-form-control m-w-100"
          onChange={(e) => setTitle(e.target.value)}
          id="Title"
          name="Title"
          placeholder="Title"
        />
        <input
          style={{ margin: "20px 0" }}
          type="text"
          className="main-form-control m-w-100"
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          placeholder="Description"
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} className="bg-white" />
        
        <label
          style={{ width: "fit-content", marginTop: "12px" }}
          htmlFor="file-input"
          className="hover-8 cursor-pointer ms-3 d-flex align-items-center justify-content-center px-3 py-1 border border-r-8 shadow-sm fz-12 fw-600 bg-white "
        >
          <span>Upload a Banner</span>

          <input
            type="file"
            name="avatar"
            id="file-input"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageChange}
            className="opacity-0"
            style={{ width: "0px" }}
          />
        </label>

        <div className="d-flex ">
          {images.map((image) => (
            <img src={URL.createObjectURL(image)} alt="" width={200} />
          ))}
        </div>
        
        <button type="submit" className="main-footer-btn">
          Create
        </button>
      </div>
    </form>
  ) 
};

export default CreateBlog;
