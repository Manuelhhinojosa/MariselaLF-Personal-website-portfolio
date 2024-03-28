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
          <div className={s.titleContainer}>
            <p>{post.title}</p>
          </div>

          <div className={s.descriptionContainer}>
            <p>{post.description}</p>
          </div>

          <div className={s.dateContainer}>
            <p> {post.createdAt.slice(0, 10)}</p>
          </div>

          {/* if post is text  */}
          {post.text ? (
            <div className={s.textContainer}>
              <p>{post.text}</p>
            </div>
          ) : (
            ""
          )}
          {/* end if post is text */}

          {/* if post is  media and media is image/gif */}
          {post.mimetype === "image/jpeg" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/png" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/heic" ? (
            <div className={s.imgErrorContainer}>
              File type .heic not supported by browsers. To be used only iOS &
              Mac mobile/web apps. Convert to jpeg/png/...
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/gif" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/bmp" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/x-png" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/apng" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/avif" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/svg+xml" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {post.mimetype === "image/webp" ? (
            <div className={s.imgContainer}>
              <img src={post.media.url} alt="imgePost" />
            </div>
          ) : (
            ""
          )}
          {/* end if post is  media and media is image/gif */}

          <div className={s.likesContainer}>
            <div className={s.likesBtnContainer}>Me gusta</div>
            <div className={s.likesCountContainer}>{post.likes}</div>
          </div>

          {props.postState.isLogguedIn ? (
            <div className={s.barContainer}>
              <div className={s.editContainer}>Editar</div>
              <div className={s.deleteContainer}>Eliminar</div>
            </div>
          ) : (
            ""
          )}

          <div className={s.linkContainer}>
            <Link style={{ textDecoration: "none" }} to={`/blogmain`}>
              <p className={s.backText}> Volver</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
