import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const SinglePost = (props) => {
  let location = useLocation();
  let reference = location.pathname.slice(1);
  let post = {};

  props.postState.posts.forEach((p) => {
    if (p.reference === reference) {
      post = p;
      return;
    }
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
