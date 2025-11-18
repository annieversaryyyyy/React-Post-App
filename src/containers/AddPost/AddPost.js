import React, { useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import { useNavigate } from "react-router-dom";
import './AddPost.css'

function AddPost() {
  const navigate = useNavigate();
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
      setPostData({
        title: "",
        description: "",
      });

      navigate("/");
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
    <form onSubmit={newPost} className="form">
      <input
        type="text"
        name="title"
        value={postData.title}
        onChange={onChangeInput}
        placeholder="Заголовок"
      />
      <input
        type="text"
        name="description"
        value={postData.description}
        onChange={onChangeInput}
        placeholder="Описание"
      />
      <button type="submit">добавить пост</button>
    </form>
  );
}

export default AddPost;
