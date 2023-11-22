import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { destinationData, aimData, countryData } from "../static/data";
import { createTour, getAllTours, updateTour } from "../redux/actions/tour";
import { AnyAction } from "redux";
import { toast } from "react-toastify";
import { isAdmin } from "../shared/GlobalFunction";
import ErrorPage from "../components/Layout/ErrorPage";
import { moneyFormatter } from "../shared/GlobalFunction";
import { backend_url } from "../server";
const UpdateTourPage = () => {
  const { error, success } = useSelector((state: any) => state.tours);
  const { id } = useParams();

  const formatter = moneyFormatter();
  const { user } = useSelector((state: any) => state.user);
  const { tours } = useSelector((state: any) => state.tours);
  const [images, setImages] = useState<File[]>([]);
  const [currentTourImages, setCurrentTourImages] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [aim, setAim] = useState("");
  const [price, setPrice] = useState("1");
  const [color, setColor] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTour = tours.find((tour: any) => tour._id == id);


  useEffect(() => {
    dispatch(getAllTours() as unknown as AnyAction);
    setName(currentTour ? currentTour.name : "");
    setCurrentTourImages(currentTour ? currentTour.images : []);
    setPrice(currentTour ? currentTour.price : "");
    setDescription(currentTour ? currentTour.description : "");
    setDestination(currentTour ? currentTour.destination : "");
    setCountry(currentTour ? currentTour.country : "");
    setAim(currentTour ? currentTour.aim : "");
    setColor(currentTour ? currentTour.color : "");
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Update tour success");
      navigate("/tour-dashboard");
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
      name == "" ||
      description == "" ||
      destination == "" ||
      aim == "" ||
      price == "" ||
      country == "" ||
      color == ""
    ) {
      toast.error("Not Enough Information, Please check Again !!");
      return;
    }

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("id", id ? id : "");
    newForm.append("name", name);
    newForm.append("destination", destination);
    newForm.append("description", description);
    newForm.append("aim", aim);
    newForm.append("price", price);
    newForm.append("country", country);
    newForm.append("color", color);
    newForm.append("userId", user._id);

    dispatch(updateTour(newForm) as unknown as AnyAction);
  };

  return isAdmin(user) ? (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="main-footer-contact mb-12 m-10 flex-1 my-5 mx-auto"
      style={{ width: "75vw" }}
    >
      <div className="main-footer-input">
        <div className="main-input-search">Update </div>
        <div className="main-input-advanced">
          <span className="main-input-icon ti-world"></span>
          Tour
        </div>
      </div>

      <div className="main-footer-label">
        <input
          style={{ margin: "20px 0" }}
          type="text"
          className="main-form-control m-w-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          placeholder="Name"
        />
        <input
          style={{ margin: "20px 0" }}
          type="text"
          className="main-form-control m-w-100"
          id="price"
          name="price"
          placeholder="Price"
          value={formatter.format(Number(price))}
          onChange={(e: any) => {
            const moneyFormatPrice = e.target.value.replace(/,/g, "");
            console.log(e.target.value);
            if (!isNaN(moneyFormatPrice)) {
              return setPrice(moneyFormatPrice);
            }
          }}
        />
        <input
          style={{ margin: "20px 0" }}
          type="text"
          className="main-form-control m-w-100"
          id="color"
          name="color"
          value={color}
          placeholder="Main Color"
          onChange={(e) => setColor(e.target.value)}
        />
        <div className="d-flex gap-3">
          <div
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: `#${color}`,
            }}
          ></div>
          <a href="https://mycolor.space/?hex=%23845EC2&sub=1">
            Get Color from here !!!
          </a>
        </div>
        <select
          style={{ margin: "20px 0" }}
          className="main-form-select m-w-100"
          aria-label="Default select example"
          id="destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option selected value={""}>
            Select Destination
          </option>
          {destinationData.map((destination) => (
            <option value={destination.value}>{destination.label}</option>
          ))}
        </select>

        <select
          style={{ margin: "20px 0" }}
          className="main-form-select m-w-100"
          aria-label="Default select example"
          id="aim"
          name="aim"
          value={aim}
          onChange={(e) => setAim(e.target.value)}
        >
          <option selected value={""}>
            Select Aim
          </option>
          {aimData.map((aim) => (
            <option value={aim.value}>{aim.label}</option>
          ))}
        </select>

        <select
          style={{ margin: "20px 0" }}
          className="main-form-select m-w-100"
          aria-label="Default select example"
          id="destination"
          name="destination"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option selected value={""}>
            Select Country
          </option>
          {countryData.map((country) => (
            <option value={country.value}>{country.label}</option>
          ))}
        </select>

        <textarea
          className="main-form-textarea"
          id="description"
          name="description"
          cols={30}
          rows={10}
          placeholder="Messages"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label
          style={{ width: "fit-content", marginTop: "12px" }}
          htmlFor="file-input"
          className="hover-8 cursor-pointer ms-3 d-flex align-items-center justify-content-center px-3 py-1 border border-r-8 shadow-sm fz-12 fw-600 bg-white "
        >
          <span>Upload a file</span>

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

          {currentTourImages.map((image: any) => (
            <img src={`${backend_url}${image}`} alt="" width={200} />
          ))}
        </div>
        <button type="submit" className="main-footer-btn">
          Update
        </button>
      </div>
    </form>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default UpdateTourPage;
