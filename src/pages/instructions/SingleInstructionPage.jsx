import { Button, Grid, Typography } from "@mui/material";
import { Card } from "antd";
import DOMPurify from "dompurify";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onResetArticleInfo } from "../../store/slides/articleHandlerSlide";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

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
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch",
            width: "100%",
          }}
        >
          <Icon
            icon="pepicons-pencil:angle-left-circle"
            width={25}
            color={"var(--gray-900, #101828)"}
          />
          &nbsp;
          <Typography
            textTransform={"none"}
            fontFamily={"Inter"}
            fontSize={"20px"}
            fontStyle={"normal"}
            fontWeight={600}
            lineHeight={"30px"}
            color={"var(--gray-900, #101828)"}
          >
            Back
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
          cover={article.image !== "" && <img alt="post-img" src={article.image} />}
        >
          <div dangerouslySetInnerHTML={sanitizedData(article?.body)}></div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleInstructionPage;
