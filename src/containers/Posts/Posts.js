import React, { useEffect, useState } from "react";
import "./Posts.css";
import { axiosApi } from "../../AxiosApi/AxiosApi";

function Posts({ props }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axiosApi.get( "/posts.json");
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts().catch((e) => console.log(e));
  }, []);

  return (
    <div className="post-card">
      <p className="post-date">Created at:</p>
      <p className="post-text">Some text</p>
      <button className="post-button">Read More</button>
    </div>
  );
}

export default Posts;
