import {
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { devitrackApi } from "../../devitrakApi";
import { useDispatch, useSelector } from "react-redux";
import { Card, Empty } from "antd";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { onAddArticleInfo } from "../../store/slides/articleHandlerSlide";
import DevitrakLogo from "../../assets/devitrak_logo.svg";
import DevitrakName from "../../assets/Layer_1.svg";
import { useState } from "react";
const MainPage = () => {
  const { eventInfoDetail } = useSelector((state) => state.event);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listOfArticlesQuery = useQuery({
    queryKey: ["articles"],
    queryFn: () => devitrackApi.get("/article/articles"),
  });

  if (listOfArticlesQuery.data) {
    const findArticlesPerEvent = () => {
      const find = listOfArticlesQuery.data.data.articles.filter(
        (article) =>
          article.event === eventInfoDetail.eventName && article.active === true
      );
      return find;
    };

    const sanitizedData = (props) => ({
      __html: DOMPurify.sanitize(props),
    });

    const articleClicked = async (props) => {
      dispatch(onAddArticleInfo(props));
      return navigate(`/information/${props._id}`);
    };
    return (
      <>
        <Grid margin={"3rem auto 5rem"} container>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            alignSelf={"stretch"}
            justifyContent={"center"}
            item
            xs={10}
            margin={"10px auto 0px"}
          >
            <Typography
              color={"var(--gray-900, #101828)"}
              textAlign={"center"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"24px"}
              fontStyle={"normal"}
              fontWeight={600}
              lineHeight={"32px"}
              style={{
                textWrap: "balance",
              }}
            >
              More information
            </Typography>
          </Grid>
          <Grid
              display={"flex"}
              alignItems={"center"}
              alignSelf={"stretch"}
              justifyContent={"center"}
              item
              xs={10}
              margin={"1rem auto"}
          >
            <Typography
              color={"var(--gray-600, #475467)"}
              textAlign={"center"}
              /* Display xs/Semibold */
              fontFamily={"Inter"}
              fontSize={"16px"}
              fontStyle={"normal"}
              fontWeight={400}
              lineHeight={"24px"}
              style={{
                textWrap: "balance",
              }}
            >
              View the articles below to find answers to the most common
              questions
            </Typography>
          </Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            alignSelf={"stretch"}
            justifyContent={"center"}
            item
            xs={10}
            margin={"1rem auto"}
          >
            <OutlinedInput
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              endAdornment={<InputAdornment position="end"></InputAdornment>}
              style={{
                borderRadius: "12px",

                margin: "0.1rem auto 1rem",
              }}
              placeholder="Search"
              fullWidth
            />
          </Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            margin={"0 auto"}
            item
            xs={10}
          >
            {findArticlesPerEvent() || findArticlesPerEvent()?.length > 0 ? (
              findArticlesPerEvent()?.map((article, index) => {
                return (
                  <>
                    <Card
                      key={article._id}
                      style={{
                        marginTop: 16,
                        width: "100%",
                        whiteSpace: "wrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        "-webkit-line-clamp": "3" /* number of lines to show */,
                        "-webkit-box-orient": "vertical",
                      }}
                      cover={
                        <Grid container>
                          <Grid
                            display={"flex"}
                            alignitems={"center"}
                            justifyContent={"flex-end"}
                            item
                            xs={12}
                          >
                            <img
                              style={{
                                width: "10%",
                                // height: "20%",
                                padding: "15px 0",
                              }}
                              alt="logo"
                              src={DevitrakLogo}
                            />
                            <img
                              style={{
                                width: "25%",
                                // height: "35%",
                                padding: "15px 10px 15px 0",
                              }}
                              alt="name"
                              src={DevitrakName}
                            />
                          </Grid>
                        </Grid>
                      }
                      actions={[
                        <Grid
                          key={`button-action-article-${article.title}`}
                          container
                        >
                          <Grid
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            item
                            xs={12}
                          >
                            <Button
                              onClick={() => articleClicked(article)}
                              style={{
                                border: "solid 1px var(--gray-900, #f0f0f0)",
                                margin: "0 0 0 0.5rem",
                              }}
                            >
                              <Typography
                                textTransform={"none"}
                                color={"var(--gray-900, #101828)"}
                                textAlign={"center"}
                                /* Display xs/Semibold */
                                fontFamily={"Inter"}
                                fontSize={"12px"}
                                fontStyle={"normal"}
                                fontWeight={500}
                                lineHeight={"18px"}
                                style={{
                                  textWrap: "balance",
                                }}
                              >
                                More
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>,
                      ]}
                    >
                      {/* <Meta title={article.title} /> */}
                      <div
                        dangerouslySetInnerHTML={sanitizedData(article.body)}
                      ></div>
                    </Card>
                  </>
                );
              })
            ) : (
              <Empty description={"No articles created for this event."} />
            )}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default MainPage;
