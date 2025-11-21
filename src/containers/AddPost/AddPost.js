import { useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";
import Toast from "../../components/Toast/Toast";
import Preloader from "../../components/Preloader/Preloader";

function AddPost() {
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const newPost = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...postData,
      id: crypto.randomUUID(),
      datetime: new Date().toISOString(),
    };
    setLoading(true);
    try {
      await axiosApi.post("/posts.json", dataToSend);
      setToastVisible(true);
      setPostData({
        title: "",
        description: "",
      });
      setTimeout(() => {
        setToastVisible(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Preloader />;

  return (
    <>
      <form onSubmit={newPost} className="formAddPost">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          className="titleField"
          required
          value={postData.title}
          onChange={onChangeInput}
          placeholder="What's on your mind?"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          className="descrField"
          value={postData.description}
          onChange={onChangeInput}
          placeholder="Tell us more about it..."
        />
        <button type="submit" className="btnAdd">
          Add post
        </button>
      </form>
      <Toast message="Post created successfully!" visible={toastVisible} />
    </>
  );
}

export default AddPost;
