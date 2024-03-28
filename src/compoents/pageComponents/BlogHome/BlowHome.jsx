import s from "./BlogHome.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";

const BlogHome = (props) => {
  return (
    <div className={s.blogHomeContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.listContainer}>
          <div className={s.postTitleContainer}>
            <p className={s.titleText}>Publicaciones:</p>
          </div>

          {props.postState.posts.map((post) => (
            <Link
              key={post.reference}
              className={s.postLink}
              to={`/${post.reference}`}
            >
              <p>
                *** {post.title} del {post.createdAt.slice(2, 10)} ***
              </p>
            </Link>
          ))}
        </div>

        <div className={s.allPostsLinkContainer}>
          <Link className={s.postLink} to="/allposts">
            <p style={{ textDecoration: "none" }}>
              Ver todas las publicaciones.
            </p>
          </Link>
        </div>

        {props.postState.isLogguedIn ? (
          <div className={s.addContainer}>
            <Link className={s.postLink} to="/add">
              <p>Agregar una publicación.</p>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default BlogHome;
