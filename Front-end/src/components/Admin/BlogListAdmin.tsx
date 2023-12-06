import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { getAllBlogs } from "../../redux/actions/blog";
import BlogItem from "./BlogItem";


const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, isLoading } = useSelector((state: any) => state.blogs);
  const [blogsData, setblogsData] = useState(blogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setPaymentPerPage] = useState(8);
  const lastPostIndex = currentPage * blogsPerPage;
  const firstPostIndex = lastPostIndex - blogsPerPage;

  let currentBlogs = blogsData.slice(firstPostIndex, lastPostIndex);
  

  let pages = [];

  const totalPage = Math.ceil(blogsData.length / blogsPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  } 

  useEffect(() => {
    dispatch(getAllBlogs() as unknown as AnyAction);
  }, [dispatch]);
 
  console.log(blogs)

  return (
   <div className="">
    <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="blog_id"
            placeholder="Blog ID"
            // onChange={handleFindByTransaction}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            // onChange={handleFindByBuyer}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="tour"
            placeholder="Tour Name..."
            // onChange={handleFindByTourName}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">Blog ID</th> */}
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Content</th>
            <th scope="col">status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
        {currentBlogs.map((blog: any, index: number) => (
            <BlogItem blog={blog}></BlogItem>
          ))}
        </tbody>
      </table>
   </div>
  )
}

export default BlogList