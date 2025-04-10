import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

export const PostList = createContext({
  
  isAuthenticated: false,
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    axios
      .delete(
        `http://localhost:3000/api/v1/deletepost/${action.payload.postId}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    newPostList = currPostList.filter(
      (post) => post._id !== action.payload.postId
    );
  }
  if (action.type === "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [profileImage, setprofileImage] = useState();
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const addInitialPost = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`http://localhost:3000/api/v1/getallpost`, { signal })
      .then((res) => {
        // Check if the request was already completed before attempting to parse the response
        if (!res.ok) {
          throw new Error("Request failed");
        }
        return res.json();
      })
      .then((res) => {
        addInitialPost(res.data);
        setFetching(false);
      })
      .catch((error) => {
        // Handle fetch errors, including aborts
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
        setFetching(false); // Make sure to set fetching state to false in case of errors
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token?.split(".").length == 3) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <PostList.Provider
      value={{
        profileImage,
        setprofileImage,
        postList,
        fetching,
        addPost,
        deletePost,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
