import { useEffect } from "react";
import PostList from "../components/PostList/PostList";

function HomePage({ showNavbar, updateIsHome, onClickNav }) {
  useEffect(() => {
    updateIsHome(true);
  }, []);

  return (
    <PostList
      id="home"
      isHome
      subreddit=""
      showNavbar={showNavbar}
      onClickNav={onClickNav}
    />
  );
}

export default HomePage;
