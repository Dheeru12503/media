import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WecomeMessage";
import Loader from "./Loader";

const PostList = () => {
  const { postList,fetching } = useContext(PostListData);
  return (
    <>
  
      <div className="PostList">
        {fetching && <Loader></Loader>}
        {!fetching && postList.length === 0 && <WelcomeMessage />}
        {postList.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostList;
