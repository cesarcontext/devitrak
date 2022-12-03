import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { rightDoneMessage } from "../../../helper/swalFireMessage";
import { useAdminStore } from "../../../hooks/useAdminStore";
import { Navbar } from "../ui/Navbar";

export const ArticleContentCreation = () => {
  const { articleSetup } = useAdminStore();
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();

  const addImgURL = (event) => {
    setImg(URL.createObjectURL(event.target.files));
  };
  const handleArticleSubmitted = async (event) => {
    event.preventDefault();
    try {
      articleSetup({
        img,
        title,
        body,
      });
      rightDoneMessage(`Article created`);
    } catch (error) {
     rightDoneMessage(error.response.data.msg)
    }
  };
  let base64code = "";

  const onChangeImage = (event) => {
    const files = event.target.value;
    const file = files[0];
    getbase64(file);
  };

  const onLoad = (fileString) => {
    this.base64code = fileString;
  };

  const getbase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
      console.log(
        "🚀 ~ file: ArticleContentCreation.js ~ line 79 ~ getbase64 ~ onLoad",
        onLoad
      );
    };
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
        <input type="file" name="img" onChange={onChangeImage} />
        {console.log(base64code)}
        <img src={base64code} alt={img} />
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
          <button className="btn btn-create" type="submit">Save</button>
          <NavLink to="/admin/articles">
            <button className="btn btn-delete" style={{ backgroundColor: "red" }}>Cancel</button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};
