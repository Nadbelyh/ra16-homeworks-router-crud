const dayjs = require("dayjs");
require("dayjs/locale/ru");
dayjs.locale("ru");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

function Post({ post }) {
  return (
    <div className="post">
      <div>
        <div className="post-info">
          <div className="image"></div>
          <div style={{ marginTop: "10px" }}>
            <div className="name">Имя Фамилия</div>
            <div style={{ display: "flex" }}>
              <div className="status">Основатель группы</div>
              <div className="date">{dayjs(post.created).fromNow()}</div>
            </div>
          </div>
        </div>
        <div className="post-content">{post.content}</div>
      </div>
    </div>
  );
}

export default Post;
