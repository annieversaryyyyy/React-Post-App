import React from "react";
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
        <button className="post-button">Read More</button>
      </div>
    </>
  );
}

export default Post;
