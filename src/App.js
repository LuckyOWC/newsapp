import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./Componets/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import News from "./Componets/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Notebook from "./Componets/Notebook";
import User from "./Componets/User";
import Jokes from "./Componets/Jokes";
import Posts from "./Componets/Posts";
import TicTac from "./Componets/TicTac";
import PostData from "./Componets/PostData";
import Game from "./Componets/Game";
import Book from "./Componets/Book";
import Universities from "./Componets/Universities";
const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API; // Declare apiKey correctly
  const [progress, setProgress] = useState(0); // Use useState for progress

  return (
    <div>
      <Router>
        <NavBar />

        <LoadingBar
          height="2px"
          color="red"
          progress={progress}
          onLoaderFinished={() => setProgress(0)} // Reset progress when done
        />
        {/* Routes should be wrapped inside a Routes component */}
        <Routes>
          {/* Define your routes here */}
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress} // Pass setProgress directly
                apiKey={apiKey}
                key="general"
                pageSize={6}
                country="us"
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="business"
                pageSize={6}
                country="us"
                category="business"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="entertainment"
                pageSize={6}
                country="us"
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="technology"
                pageSize={6}
                country="us"
                category="technology"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="health"
                pageSize={6}
                country="us"
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="science"
                pageSize={6}
                country="us"
                category="science"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                key="sports"
                pageSize={6}
                country="us"
                category="sports"
              />
            }
          />
          <Route exact path="/Notebook" element={<Notebook />} />

          <Route exact path="/User" element={<User />} />
          <Route exact path="/Jokes" element={<Jokes />} />
          <Route exact path="/Posts" element={<Posts />} />
          <Route exact path="/TicTac" element={<TicTac />} />
          <Route exact path="/PostData" element={<PostData />} />
          <Route exact path="/Game" element={<Game />} />
          <Route exact path="Book" element={<Book />} />
          <Route exact path="Universities" element={<Universities />} />
        </Routes>
      </Router>
      <div className="contaner-fluid">Copyright © NewsMonkey.com</div>
    </div>
  );
};

export default App;
