import { NavLink } from "react-router-dom";
import "./Post.css";
import dayjs from "dayjs";

function Post({ datetime, id, title }) {
  const formattedDate = datetime
    ? dayjs(datetime).format("DD.MM.YYYY | HH:mm")
    : "";
  return (
    <>
      <div className="post-card" key={id}>
        <p className="post-date">Created at: {formattedDate}</p>
        <p className="post-text">{title}</p>
        <NavLink className="post-button" to={`posts/${id}`}>
          Read more...
        </NavLink>
      </div>
    </>
  );
}

export default Post;
