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
import { Card, Divider, Empty } from "antd";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { onAddArticleInfo } from "../../store/slides/articleHandlerSlide";
import DevitrakLogo from "../../assets/devitrak_logo.svg";
import DevitrakName from "../../assets/Layer_1.svg";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SupportMainPage from "../support/SupportMainPage";
const { Meta } = Card;
const MainPage = () => {
  const { eventInfoDetail } = useSelector((state) => state.event);
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
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
    const itemPerPage = 4;
    const indexOfLast = current * itemPerPage;
    const indexOfFirst = indexOfLast - itemPerPage;
    const currentData = findArticlesPerEvent().slice(indexOfFirst, indexOfLast);
    const totalPages = findArticlesPerEvent().length / itemPerPage;

    const dataToRender = () => {
      if (search === "") {
        return currentData;
      } else {
        const searchFound = findArticlesPerEvent()?.filter(
          (article) =>
            article.title.toLowerCase().match(search) ||
            article.body.toLowerCase().match(search)
        );
        return searchFound;
      }
    };
    const sanitizedData = (props) => ({
      __html: DOMPurify.sanitize(props),
    });

    const articleClicked = async (props) => {
      dispatch(onAddArticleInfo(props));
      return navigate(`/information/${props._id}`);
    };
    const handlePrevPage = () => {
      if (current > 0) {
        return setCurrent(current - 1);
      } else {
        return setCurrent(0);
      }
    };
    const handleNextPage = () => {
      if (current > Math.ceil(findArticlesPerEvent().length)) {
        return setCurrent(Math.ceil(findArticlesPerEvent().length));
      } else {
        return setCurrent(current + 1);
      }
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
            {findArticlesPerEvent() || dataToRender().length > 0 ? (
              dataToRender().map((article, index) => {
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
                          ></Grid>
                          <Grid
                            display={"flex"}
                            alignitems={"center"}
                            justifyContent={"flex-end"}
                            item
                            xs={12}
                          >
                            {article.image !== "" ? (
                              <img alt="post-img" src={article.image} />
                            ) : (
                              <>
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
                              </>
                            )}
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
                                border: "transparent",
                                margin: "0 0 0 0.5rem",
                              }}
                            >
                              <Typography
                                textTransform={"none"}
                                color={"var(--blue-dark-700, #004EEB)"}
                                textAlign={"left"}
                                /* Display xs/Semibold */
                                fontFamily={"Inter"}
                                fontSize={"16px"}
                                fontStyle={"normal"}
                                fontWeight={600}
                                lineHeight={"24px"}
                                style={{
                                  textWrap: "balance",
                                }}
                              >
                                Read post{" "}
                                <Icon
                                  icon="iconoir:arrow-br"
                                  color="#6941c6"
                                  width="20"
                                  height="20"
                                  rotate={3}
                                />
                              </Typography>
                            </Button>
                          </Grid>
                        </Grid>,
                      ]}
                    >
                      <Meta
                        style={{
                          margin: "0 auto 0.5rem",
                        }}
                        title={article.title}
                      />
                      <div
                        style={{
                          height: "15dvh",
                          height: "15svh",
                          overflow: "hidden",
                          zIndex: "0",
                        }}
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
          <Grid container>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              margin={"0 auto"}
              item
              xs={10}
            >
              <Divider />
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              margin={"0 auto"}
              item
              xs={10}
            >
              <Button
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-300, #D0D5DD)",
                  background: "var(--base-white, #FFF)",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                disabled={current === 1 ? true : false}
                variant="contained"
                onClick={() => handlePrevPage()}
              >
                <Icon
                  icon="heroicons-solid:arrow-narrow-right"
                  color={"#344054"}
                  rotate={2}
                  width={20}
                  height={20}
                />
              </Button>
              <div>
                <Typography>
                  Page {Math.ceil(totalPages) > 0 ? current : 0} of{" "}
                  {Math.ceil(totalPages)}
                </Typography>
              </div>
              <Button
                style={{
                  display: "flex",
                  padding: "8px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  border: "1px solid var(--gray-300, #D0D5DD)",
                  background: "var(--base-white, #FFF)",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                disabled={current === Math.ceil(totalPages) ? true : false}
                variant="contained"
                onClick={() => handleNextPage()}
              >
                <Icon
                  icon="heroicons-solid:arrow-narrow-right"
                  color={"#344054"}
                  width={20}
                  height={20}
                />
              </Button>
            </Grid>
          </Grid>
          <Grid
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            item
            xs={10}
            margin={"1.5rem auto 0"}
          >
            <Grid item xs={12}>
              <Typography
                color={"var(--gray-700, #344054)"}
                textAlign={"center"}
                fontFamily={"Inter"}
                fontSize={"24px"}
                fontStyle={"normal"}
                fontWeight={600}
                lineHeight={"32px"}
                style={{
                  textWrap: "balance",
                }}
              >
                Contact support
              </Typography>
            </Grid>
            <SupportMainPage />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default MainPage;
