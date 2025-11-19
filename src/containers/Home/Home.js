import React, { useEffect, useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import "./Home.css";
import Post from "../../components/Post/Post";
import Preloader from "../../components/Preloader/Preloader";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    getPosts().catch((e) => console.log(e));
  }, []);

  if (loading) return <Preloader />;

  if (!posts.length) {
    return <p className="postStatus">No posts here yet - be the first!</p>;
  }

  return (
    <div className="postsContainer">
      {posts.map((post) => (
        <Post id={post.id} datetime={post.datetime} title={post.title} />
      ))}
    </div>
  );
}

export default Posts;
