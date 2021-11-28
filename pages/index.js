import PostList from "../components/PostList/PostList";

function HomePage(props) {
  return <PostList {...props} isHome />;
}

export default HomePage;
