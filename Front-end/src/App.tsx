import { useEffect, StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/main.scss";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AdminNav from "./components/Layout/AdminNav";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  DashBoardPage,
  TourDetailPage,
  CreateTourPage,
  TourPage,
  PaymentSuccess,
  SearchToursPage,
  ChartPage,
  UpdateTourPage,
  BlogPage,
  BlogDetailPage,
  BlogAdmin,
  CreateBlog,
} from "./Routes";
import { ToastContainer } from "react-toastify";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
import { isAdmin } from "./shared/GlobalFunction";
import UpdateUserPage from "./pages/UpdateUserPage";
function App() {
  const { loading, user } = useSelector((state: any) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? null : (
        <BrowserRouter>
          {isAdmin(user) ? <AdminNav></AdminNav> : <></>}
          <Header></Header>
          <StrictMode>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/sign-up" element={<SignUpPage />}></Route>
              <Route
                path="/tour-detail/:id"
                element={<TourDetailPage />}
              ></Route>
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              ></Route>


              <Route path="/admin/blog" element={<BlogAdmin />}></Route>
              <Route path="/admin/payments" element={<DashBoardPage />}></Route>
              <Route path="/admin/chart" element={<ChartPage />}></Route>
              <Route path="/search-tours" element={<SearchToursPage />}></Route>
              <Route path="/tour-dashboard" element={<TourPage />}></Route>
              <Route path="/create-tour" element={<CreateTourPage />}></Route>
              <Route path="/create-blog" element={<CreateBlog />}></Route>
              <Route path="/update-user" element={<UpdateUserPage />}></Route>
              <Route path="/blog-page" element={<BlogPage/>}></Route>
              <Route path="/blog-detail/:id" element={<BlogDetailPage />}></Route>
              <Route
                path="/update-tour/:id"
                element={<UpdateTourPage />}
              ></Route>
              <Route
                path="/payment_success"
                element={<PaymentSuccess />}
              ></Route>
            </Routes>
          </StrictMode>
          <Footer></Footer>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
