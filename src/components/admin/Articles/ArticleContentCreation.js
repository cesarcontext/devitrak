import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { Navbar } from "../ui/Navbar";

export const ArticleContentCreation = () => {
  const { articleSetup } = useAdminStore();
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate()

  const addImgURL = (event) => {
    setImg(URL.createObjectURL(event.target.files[0]));
  };
  const handleArticleSubmitted = async (event) => {
    event.preventDefault();
    try {
       articleSetup({
      img,
      title,
      body,
    });
    Swal.fire({
      title: "",
      width: 600,
      padding: "3em",
      text: `Article created`,
      icon: "success",
      color: "#rgb(30, 115, 190)",
      background: "#fff",
      confirmButtonColor: "rgb(30, 115, 190)",
      backdrop: `
      rgb(30, 115, 190)
        url("../image/logo.jpg")
        left top
        no-repeat
      `,
    });
navigate("/admin/articles")
    } catch (error) {
      Swal.fire({
      title: "Upss something went wrong!!",
      width: 600,
      padding: "3em",
      text: `${error.response.data.msg}`,
      icon: "error",
      color: "#rgb(30, 115, 190)",
      background: "#fff",
      confirmButtonColor: "rgb(30, 115, 190)",
      backdrop: `
      rgb(30, 115, 190)
        url("../image/logo.jpg")
        left top
        no-repeat
      `,
    });
    }
   
    
};
  return (
    <div>
      <Navbar />
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
        <input type="file" name="img" onChange={addImgURL} />
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
    </div>
  );
};
