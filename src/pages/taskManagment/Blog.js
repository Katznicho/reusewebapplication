import React from "react";
import Widget from "../../components/social-feed/widget";

import { Loader, Section } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { get_blogs } from "../../actions/firebaseAction";
import moment from "moment";

const Blog = () => {
  const dispatch = useDispatch();

  const { firebase } = useSelector((state) => ({
    firebase: state.firebase,
  }));

  const { get_blogs_loading, blogs } = {
    ...firebase,
  };

  console.log(blogs);

  React.useEffect(() => {
    dispatch(get_blogs());
  }, [dispatch]);

  return (
    <Widget>
      <div className="mt-4 w-full p-4 rounded-lg bg-white border border-grey-100 dark:bg-grey-895 dark:border-grey-890">
        <Section title="SnapSkin" description="All Admin created blogs" />
      </div>

      {get_blogs_loading ? (
        <Loader />
      ) : (
        <>
          {blogs &&
            blogs.map((blog) => (
              <div
                className="w-full items-center bg-white rounded-lg border grid grid-cols-2"
                key={blog.id}
              >
                <div className="w-full">
                  <img
                    className="object-cover w-full h-96"
                    src={blog?.data.image}
                    alt={blog?.data.description}
                    width="100%"
                  />
                </div>
                <div className="flex flex-col p-4  items-center justify-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {`Blog created by ${blog?.data.name}`}
                  </h5>
                  <p>{moment(blog?.data.createdAt).fromNow()}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {blog?.data.description}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </Widget>
  );
};
export default Blog;
