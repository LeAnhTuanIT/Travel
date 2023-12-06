import { isAdmin } from "../shared/GlobalFunction";
import { useSelector } from "react-redux";
import ErrorPage from "../components/Layout/ErrorPage";
import BlogList from "../components/Admin/BlogListAdmin";

const DashBoardPage = () => {
  const { user } = useSelector((state: any) => state.user);

  return isAdmin(user) ? (
    <div className="px-4 mx-auto" style={{ height: "75vh", width: "80vw" }}>
      <BlogList></BlogList>
    </div>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default DashBoardPage;
