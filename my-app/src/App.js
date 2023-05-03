import { HashRouter, Routes, Route } from "react-router-dom";
import PostsProvider from "./components/postsProvider";
import MainPage from "./components/mainPage";
import AddPost from "./components/addPost";
import PostDetail from "./components/postDetail";
import "./App.css";

function App() {
  return (
    <PostsProvider>
      <div className="container">
        <HashRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/posts/new/" element={<AddPost />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
          </Routes>
        </HashRouter>
      </div>
    </PostsProvider>
  );
}

export default App;
