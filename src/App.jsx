import { Button, Container, Typography } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { styled } from "@mui/material/styles";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(``);
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  async function loadData(currentCategory) {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${queryValue.current}&page=${
        pageNumber.current
      }&pageSize=${PAGE_SIZE}&country=us&apiKey=${import.meta.env.VITE_NEWS_FEED_API_KEY}`
    );

    const data = await response.json();

    if (data.status === "error") {
      throw new Error("An error has occured");
    }

    const articles = data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage, url } =
        article;
      return {
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
        url,
      };
    });
    return articles;
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    //use then because loadData returns a promise// loadData().then(setArticles); // short hand
    setLoading(true);
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // debounce function to prevent too many api calls
  const debouncedLoadData = debounce(fetchAndUpdateArticles, 1000);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };

  const handlePreviousClick = () => {
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };

  return (
    <>
      <Container>
        <NewsHeader
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handleCategoryChange}
        />
        {error.length === 0 ? (
          <NewsFeed articles={articles} loading={loading} />
        ) : (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Footer>
          <Button
            variant="outlined"
            onClick={handlePreviousClick}
            disabled={pageNumber.current === 1 || loading}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextClick}
            disabled={articles.length < PAGE_SIZE || loading}
          >
            Next
          </Button>
        </Footer>
      </Container>
    </>
  );
}

export default App;
