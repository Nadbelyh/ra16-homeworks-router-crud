import { Link } from "react-router-dom";
import Post from "./post";

function PostsList({ posts }) {
  return posts.map((post) => (
    <div className="posts" key={post.id}>
      <Link
        className="text-decoration-none text-reset"
        to={`/posts/${post.id}`}
      >
        <Post post={post} />
      </Link>
    </div>
  ));
}

export default PostsList;
