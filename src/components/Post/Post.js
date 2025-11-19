import { NavLink } from "react-router-dom";
import "./Post.css";
import dayjs from "dayjs";

function Post({ datetime, id, title }) {
  const formattedDate = datetime
    ? dayjs(datetime).format("DD.MM.YYYY | HH:mm")
    : "";
  return (
    <>
      <div className="postCard" key={id}>
        <p className="postDate">Created at: {formattedDate}</p>
        <p className="postText">{title}</p>
        <NavLink className="postButton" to={`posts/${id}`}>
          Read more...
        </NavLink>
      </div>
    </>
  );
}

export default Post;
