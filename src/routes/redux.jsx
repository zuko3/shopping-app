import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchPostsList, setToggle, resetPostsList } from "@/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";

function handleFetchPostsList(dispatch) {
  dispatch(fetchPostsList());
}

function handleToggle(dispatch, value) {
  dispatch(setToggle(!value));
}

export const Route = createFileRoute("/redux")({
  component: function Index() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state?.postsList?.entites);
    const status = useSelector((state) => state?.postsList?.status);
    const toggle = useSelector((state) => state?.postsList?.toggle);

    useEffect(
      function () {
        handleFetchPostsList(dispatch);
        return function () {
          dispatch(resetPostsList());
        };
      },
      [dispatch],
    );

    return (
      <div className="flex flex-col gap-4">
        <div>Hello "/redux"!</div>
        <div>
          <button
            onClick={() => handleToggle(dispatch, toggle)}
            className="bg-black self-start text-white px-2 py-2 rounded hover:bg-gray-800"
          >
            Toggle section
          </button>
        </div>
        {status === "pending" && <p>Loading ....</p>}
        {status === "succeeded" && toggle && (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="border-t border-gray-200  bg-white p-2"
              >
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
});
