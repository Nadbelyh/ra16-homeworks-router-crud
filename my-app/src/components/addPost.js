import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostsContext from "../contexts/postsContext";
import PostForm from "./postForm";
import { ReactComponent as CloseButton } from "../assets/close.svg";

function AddPost() {
  const [postContent, setPostContent] = useState("");
  const { setUpdated } = useContext(PostsContext);
  const navigate = useNavigate();

  const handleFormChange = (evt) => {
    setPostContent(evt.target.value);

    localStorage.setItem("postContent", evt.target.value);

    if (evt.target.value === "") {
      localStorage.removeItem("postContent");
    }
  };

  const handleAddPost = (evt) => {
    evt.preventDefault();
    const id = localStorage["maxId"] + 1;
    localStorage.setItem("maxId", id);
    fetch("http://localhost:7070/posts", {
      method: "POST",
      body: JSON.stringify({ id: id, content: postContent }),
    }).then(() => {
      setPostContent("");
      localStorage.removeItem("postContent");
      setUpdated(new Date().getTime());
      redirect();
    });
  };

  const redirect = () => navigate("/");

  useEffect(() => {
    const localStorageText = localStorage["postContent"];
    if (localStorageText) {
      setPostContent(localStorageText);
    }
  }, []);

  return (
    <>
      <button className="svgButton" onClick={redirect}>
        <CloseButton></CloseButton>
      </button>
      <PostForm
        handleSubmit={handleAddPost}
        controlId={"newPost"}
        ariaLabel={"New post"}
        placeholder={"Что у вас нового"}
        value={postContent}
        handleChange={handleFormChange}
        buttonText={"Опубликовать"}
      />
    </>
  );
}

export default AddPost;
