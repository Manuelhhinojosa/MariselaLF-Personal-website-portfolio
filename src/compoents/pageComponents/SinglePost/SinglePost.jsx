import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import axios from "axios";

export const SinglePost = (props) => {
  return (
    <div className={s.siglePostContainer}>
      <div className={s.top}>{<HomeButton />}</div>
      <div className={s.bottom}>
        <div className={s.postContainer}>{window.location.href.slice(22)}</div>
      </div>
    </div>
  );
};
