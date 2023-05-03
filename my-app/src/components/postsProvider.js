import React, { useState, useEffect } from "react";
import PostsContext from "../contexts/postsContext";

export default function PostsProvider(props) {
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(new Date().getTime());
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    fetch("http://localhost:7070/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const reversedData = data.reverse();
        const maxId = data.reduce((acc, curr) =>
          acc.id > curr.id ? acc : curr
        ).id;
        localStorage.setItem("maxId", maxId);
        setPosts(reversedData);
        setLoading(false);
      });
  };

  useEffect(loadData, []);
  useEffect(loadData, [updated]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        updated,
        setUpdated,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </PostsContext.Provider>
  );
}
