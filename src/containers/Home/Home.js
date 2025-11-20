import React, { useEffect, useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import "./Home.css";
import Post from "../../components/Post/Post";
import Preloader from "../../components/Preloader/Preloader";
import Pagination from "../../components/Pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

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

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPost = posts.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="pageWrapper">
        <div className="postsContainer">
          {currentPost.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              datetime={post.datetime}
              title={post.title}
            />
          ))}
        </div>

        <Pagination
          postsPerPage={postsPerPage}
          posts={posts.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default Posts;
