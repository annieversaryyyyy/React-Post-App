import { useNavigate, useParams } from "react-router-dom";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import { useState, useEffect } from "react";
import Preloader from "../../components/Preloader/Preloader";
import "./EditPost.css";
import Toast from "../../components/Toast/Toast";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postCard, setPostCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let post = {};
      setLoading(true);
      try {
        const response = await axiosApi(`/posts/${id}.json`);
        Object.keys(response.data).forEach((key) => {
          if (key === "datetime") {
            response.data[key] = new Date();
          }
          return (post[key] = response.data[key]);
        });

        setPostCard(post);
      } catch (error) {
        alert("Что-то пошло не так...");
      } finally {
        setLoading(false);
      }
    };
    fetchData().catch((e) => console.log(e));
  }, [id]);

  const editPostValue = async (e) => {
    e.preventDefault();
    try {
      await axiosApi.put(`/posts/${id}.json`, postCard);
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const changeMessage = (e) => {
    const { name, value } = e.target;
    setPostCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Preloader />;

  if (!postCard) return <p>Post not found</p>;

  return (
    postCard && (
      <>
        <form onSubmit={editPostValue} className="formEdit">
          <h3 className="heading">Edit post</h3>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            required
            className="titleField"
            type="text"
            name="title"
            value={postCard.title}
            onChange={changeMessage}
            placeholder="What's on your mind?"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            required
            className="descrField"
            name="description"
            value={postCard.description}
            onChange={changeMessage}
            placeholder="Tell us more about it..."
          ></textarea>

          <button type="submit" className="btnEdit">
            Edit Post
          </button>
        </form>
        <Toast message="Post edited successfully!" visible={toastVisible} />
      </>
    )
  );
}

export default EditPost;
