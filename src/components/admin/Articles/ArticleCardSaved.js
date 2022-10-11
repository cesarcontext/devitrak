import React, { useEffect, useState } from "react";
import { devitrackApiArticle } from "../../../apis/devitrackApi";

export const ArticleCardSaved = () => {
  const [dataReceived, setDataReceived] = useState(null);

  useEffect(() => {
    try {
      const response  = devitrackApiArticle.get("/articles")
      .then( response => setDataReceived(response.data.articles))
      if (response) {
        console.log("data received", dataReceived);
      }
   
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        gridAutoRows: " minmax(2fr, auto)",
      }}
    >
      {dataReceived?.map((article, index) => {
        const active = article.active        
        return (
          <div
            key={index}
            className="card"
            style={{ width: "18rem", margin: "0 auto" }}
          >
            <img
              src={`${article.img}`}
              alt={article.img}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.body}</p>
              <a href="#" className="btn btn-primary">
                <span>{active !== false ? <span style={{ color: "#fff"}}>PUBLISHED</span> : <span style={{ color: "#000"}}>PUBLISH</span>}</span>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
