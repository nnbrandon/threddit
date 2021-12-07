import { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PostList from "../components/PostList/PostList";

function HomePage({ showNavbar, updateIsHome, onClickNav }) {
  useEffect(() => {
    updateIsHome(true);
  }, []);

  const RenderPostList = useCallback(
    (props) => {
      return (
        <PostList
          {...props}
          id="home"
          isHome
          subreddit=""
          showNavbar={showNavbar}
          onClickNav={onClickNav}
        />
      );
    },
    [showNavbar, onClickNav]
  );

  return (
    <Router>
      <Route path="/" render={RenderPostList} />
    </Router>
  );
}

export default HomePage;
