import { useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import { useNavigate } from "react-router-dom";
import "./AddPost.css";
import Toast from "../../components/Toast/Toast";

function AddPost() {
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });

  const newPost = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...postData,
      id: crypto.randomUUID(),
      datetime: new Date().toISOString(),
    };

    try {
      await axiosApi.post("/posts.json", dataToSend);

      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
        navigate("/");
      }, 1000);

      setPostData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <form onSubmit={newPost} className="form">
        <input
          type="text"
          name="title"
          required
          value={postData.title}
          onChange={onChangeInput}
          placeholder="What's on your mind?"
        />
        <input
          type="text"
          name="description"
          value={postData.description}
          onChange={onChangeInput}
          placeholder="Tell us more about it..."
        />
        <button type="submit">Add post</button>
      </form>
      <Toast message="Post created successfully!" visible={toastVisible} />
    </>
  );
}

export default AddPost;
