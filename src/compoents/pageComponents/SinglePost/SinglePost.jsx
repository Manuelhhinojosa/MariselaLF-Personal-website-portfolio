import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SinglePost = (props) => {
  const location = useLocation();
  const id = location.pathname.slice(1);
  let post = {};

  props.postState.posts.map((p) => {
    p._id = id ? (post = p) : (post = {});
  });

  return (
    <div className={s.siglePostContainer}>
      <div className={s.top}>{<HomeButton />}</div>
      <div className={s.bottom}>
        <div className={s.postContainer}>
          {post.title}
          <Link to={`/blogmain`}>
            <p>volver</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
