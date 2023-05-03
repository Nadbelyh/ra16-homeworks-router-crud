import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./post";
import PostsContext from "../contexts/postsContext";
import PostForm from "./postForm";
import { ReactComponent as CloseButton } from "../assets/close.svg";

function PostDetail() {
  const { postId } = useParams();
  const { posts, setUpdated } = useContext(PostsContext);
  const [currentPost, setCurrentPost] = useState();
  const [edit, setEdit] = useState(false);
  const [formContent, setFormContent] = useState("");
  const navigate = useNavigate();

  const findCurrentPost = () => {
    const res = posts.find((post) => post.id === +postId);
    setCurrentPost(res);
  };

  useEffect(findCurrentPost, [postId, posts]);

  const redirect = () => navigate("/");

  const handleDeletePost = () => {
    fetch(`${"http://localhost:7070/posts"}/${postId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      setUpdated(new Date().getTime());
      redirect();
    });
  };

  const handleFormChange = (evt) => {
    setFormContent(evt.target.value);
  };

  const handleEditPost = (evt) => {
    evt.preventDefault();
    fetch("http://localhost:7070/posts", {
      method: "POST",
      body: JSON.stringify({ id: postId, content: formContent }),
    }).then(() => {
      setUpdated(new Date().getTime());
      setEdit(false);
    });
  };

  return (
    <>
      {currentPost && !edit && (
        <>
          <button className="svgButton" onClick={redirect}>
            <CloseButton></CloseButton>
          </button>
          <Post post={currentPost} />
          <div className="row">
            <div className="col">
              <button
                className="button"
                onClick={() => {
                  setEdit(true);
                  setFormContent(currentPost.content);
                }}
              >
                Изменить
              </button>
            </div>
            <div>
              <button className="button danger" onClick={handleDeletePost}>
                Удалить
              </button>
            </div>
          </div>
        </>
      )}
      {currentPost && edit && (
        <>
          <button className="svgButton" onClick={redirect}>
            <CloseButton></CloseButton>
          </button>
          <PostForm
            handleSubmit={handleEditPost}
            controlId={"editPost"}
            ariaLabel={"Edit post"}
            placeholder={"Отредактируйте пост"}
            value={formContent}
            handleChange={handleFormChange}
            buttonText={"Сохранить"}
          />
        </>
      )}
    </>
  );
}

export default PostDetail;
