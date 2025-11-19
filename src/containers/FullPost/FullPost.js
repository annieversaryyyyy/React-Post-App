import { useEffect, useState } from "react";
import { axiosApi } from "../../AxiosApi/AxiosApi";
import dayjs from "dayjs";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import "./FullPost.css";
import Preloader from "../../components/Preloader/Preloader";
import Toast from "../../components/Toast/Toast";

function FullPost() {
  const [postCard, setPostCard] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const getFullData = async () => {
      setLoading(true);
      try {
        const { data } = await axiosApi.get(`/posts/${id}.json`);
        const formattedPost = {
          ...data,
          datetime: dayjs(data.datetime).format("DD.MM.YYYY | HH:mm:ss"),
        };
        setPostCard(formattedPost);
      } catch (error) {
        alert("Something went wrong while fetching the post...");
      } finally {
        setLoading(false);
      }
    };
    getFullData().catch((e) => console.log(e));
  }, [id]);

  const deletePost = async () => {
    await axiosApi.delete(`posts/${id}.json`);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
      navigate("/");
    }, 1000);
  };

  if (loading) return <Preloader />;

  return (
    postCard && (
      <>
        <div className="fullpost" key={postCard.id}>
          <p className="fullpostDate">{postCard.datetime}</p>
          <h1 className="fullpostTitle">{postCard.title}</h1>
          <p className="fullpostText">{postCard.description}</p>

          <div className="fullpostActions">
            <button className="fullpostDelete" onClick={deletePost}>
              Delete
            </button>
            <NavLink className="fullpostEdit" to={`/posts/${id}/edit`}>
              Edit
            </NavLink>
          </div>
        </div>
        <Toast message="Post deleted successfully!" visible={toastVisible} />
      </>
    )
  );
}

export default FullPost;
