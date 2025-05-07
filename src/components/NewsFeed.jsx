import { Box, CircularProgress, Typography } from "@mui/material";
import NewsArticle from "./NewsArticle";
import LoadingArticle from "./LoadingArticle";

const NewsFeed = ({ articles, loading }) => {
  if (!loading && !articles.length) {
    return (
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        marginTop={4}
      >
        No news found.
      </Typography>
    );
  }

  return (
    <>
      {loading &&
        [...Array(5)].map((_, index) => <LoadingArticle key={index} />)}

      {!loading &&
        articles.map((article) => (
          <NewsArticle key={JSON.stringify(article)} {...article} />
        ))}
    </>
  );
};

export default NewsFeed;
