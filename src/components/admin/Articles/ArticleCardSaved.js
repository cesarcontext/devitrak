import React, { useEffect, useState } from "react";
import { devitrackApiArticle } from "../../../apis/devitrackApi";
import { useAdminStore } from "../../../hooks/useAdminStore";

export const ArticleCardSaved = ({ searchTerm }) => {
  const { user } = useAdminStore();
  const [dataReceived, setDataReceived] = useState([]);
  const adminUserRole = user.role;
  const callApiArticle = async () => {
    await devitrackApiArticle
      .get("/articles")
      .then((response) => setDataReceived(response.data.articles));
  };

  useEffect(() => {
    const controller = new AbortController();
    callApiArticle();
    return () => {
      controller.abort();
    };
  }, []);
  dataReceived?.map(item => {
    console.log(Buffer.from(item.img.data).toString("base64"))
  })
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        gridAutoRows: " minmax(2fr, auto)",
      }}
    >
      {dataReceived
        ?.filter((card) =>
          card.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((article, index) => {
          const active = article.active;
          return (
            <div
              key={index}
              className="card"
              style={{
                width: "98%",
                height: "100%",
                margin: "2% auto",
                paddingTop: "25px",
                paddingLeft: "25px",
                paddingRight: "25px",
              }}
            >
              <img src={`data:image/jpeg;base64,${Buffer.from(article.img.data).toString("base64")}`} alt=""/>
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.body}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <hr />
                  <button className="btn btn-create" style={{ width: "35%" }}>
                    <span>
                      {active !== false ? (
                        <span style={{ color: "#fff" }}>PUBLISHED</span>
                      ) : (
                        <span style={{ color: "#000" }}>UNPUBLISH</span>
                      )}
                    </span>
                  </button>
                  {adminUserRole === "Approver" ||
                  adminUserRole === "Administrator" ? (
                    <>
                      <button className="btn btn-edit" style={{ width: "30%" }}>
                        <span>Edit</span>
                      </button>
                      <button className="btn btn-delete" style={{ width: "30%" }}>
                        <span>Delete</span>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
