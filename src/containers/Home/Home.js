import React, { useEffect, useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import "./Home.css";
import Post from "../../components/Post/Post";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axiosApi.get("/posts.json");
        if (!data) {
          setPosts([]);
          return;
        }
        const loadedPosts = Object.entries(data).map(([id, post]) => ({
          id,
          title: post.title,
          description: post.description,
          datetime: post.datetime,
        }));
        setPosts(loadedPosts.reverse());
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts().catch((e) => console.log(e));
  }, []);

  if (!posts.length) {
    return <p className="post-status">Постов пока нет...</p>;
  }
  return (
    <div className="posts-container">
      {posts.map((post) => (
  
          <Post
            key={post.id}
            id={post.id}
            description={post.description}
            datetime={post.datetime}
            title={post.title}
          />
      ))}
    </div>
  );
}

export default Posts;
