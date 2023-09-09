import { Button, Grid, Typography } from "@mui/material";
import { Card } from "antd";
import DOMPurify from "dompurify";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onResetArticleInfo } from "../../store/slides/articleHandlerSlide";
import { useNavigate } from "react-router-dom";

const SingleInstructionPage = () => {
  const { article } = useSelector((state) => state.articleHandler);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sanitizedData = (props) => ({
    __html: DOMPurify.sanitize(props),
  });

  const handleBack = () => {
    dispatch(onResetArticleInfo());
    navigate("/information");
  };
  return (
    <Grid container>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        alignSelf={"stretch"}
        justifyContent={"center"}
        item
        xs={11}
        margin={"10px auto 0px"}
      >
        <Button
          onClick={handleBack}
          style={{
            display: "flex",
            padding: "12px 20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
            borderRadius: "8px",
            border: "1px solid var(--blue-dark-600, #155EEF)",
            background: "var(--blue-dark-600, #155EEF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            width: "100%",
          }}
        >
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"16px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"24px"}
            color={"var(--base-white, #FFF)"}
          >
            Return{" "}
          </Typography>
        </Button>
      </Grid>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        alignSelf={"stretch"}
        justifyContent={"center"}
        item
        xs={11}
        margin={"10px auto 0px"}
      >
        <Card
          key={article?.title}
          style={{
            marginTop: 16,
            marginBottom: "15svh",
            width: "100%",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
          }}
        >
          <div dangerouslySetInnerHTML={sanitizedData(article?.body)}></div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleInstructionPage;
