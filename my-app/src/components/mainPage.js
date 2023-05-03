import { useContext } from "react";
import { Link } from "react-router-dom";
import PostsContext from "../contexts/postsContext";
import PostsList from "./postList";

function MainPage() {
  const { posts, error, loading } = useContext(PostsContext);

  return (
    <>
      {!loading && !error && (
        <div className="row">
          <div className="col">
            <Link to="/posts/new">
              <button className="button">Создать пост</button>
            </Link>
          </div>
        </div>
      )}
      {!loading && posts && <PostsList posts={posts} />}
    </>
  );
}

export default MainPage;
