import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import Spinners from "./Spinners";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      props.setProgress(10);
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

      const data = await fetch(url);
      props.setProgress(30);
      const parseData = await data.json();
      props.setProgress(70);

      if (parseData.status === "error") {
        console.error("Error fetching news:", parseData.message);
      } else {
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;

    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parseData = await data.json();

      if (parseData.status === "error") {
        console.error("Error fetching news:", parseData.message);
      } else {
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch more news:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "65px 0 0" }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {loading && <Spinners />}

      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={articles.length} // Length of the current data
        next={fetchMoreData} // Function to fetch more data
        hasMore={articles.length < totalResults} // Check if there's more data to load
        loader={<Spinners />} // Show Spinners while loading more
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={
                    element.title ? element.title.slice(0, 35) : "No Title"
                  }
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : "No Description"
                  }
                  imageUrl={element.urlToImage}
                  publishedAt={element.publishedAt}
                  author={element.author}
                  content={element.content}
                  url={element.url}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
