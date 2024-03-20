import s from "./BlogHome.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";

const BlogHome = () => {
  return (
    <div className={s.blogHomeContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.listContainer}> </div>
      </div>
    </div>
  );
};

export default BlogHome;
