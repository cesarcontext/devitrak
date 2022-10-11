import React, { useState } from "react";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const ArticleContentCreation = () => {
  const { articleSetup } = useAdminStore()
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addImgURL = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleArticleSubmitted = async (event) => {
    event.preventDefault();
    articleSetup({
      img,
      title,
      body
    })
  };
  return (
    <form
      onSubmit={handleArticleSubmitted}
      style={{
        width: "60%",
        // height: "40vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        justifyItems: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <input
        type="file"
        name="img"
        onChange={addImgURL}
      />
      {console.log(img)}
      <img src={img} alt={img} />
      <input
        type="text"
        value={title}
        name="title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        style={{
          width: "100%",
          height: "100%",
          padding: "15px",
        }}
        typeof="string"
        value={body}
        name="body"
        onChange={(event) => setBody(event.target.value)}
      />
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};
