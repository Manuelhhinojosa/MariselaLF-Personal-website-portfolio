import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const getAllPostsUrl = "http://localhost:8000/posts/allposts";

export const SinglePost = (props) => {
  const navigate = useNavigate();
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
            {/* here  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

            <div
              className={s.likesBtnContainer}
              onClick={() => {
                axios
                  .patch(`http://localhost:8000/posts/${post._id}`)
                  .then((result) => {
                    axios.get(getAllPostsUrl).then((res) => {
                      const updatedPosts = res.data;
                      props.postState.setPosts(updatedPosts.reverse());
                    });
                  })
                  .catch((error) => {
                    console.log("this is the error:", error);
                  });
              }}
            >
              Me gusta
            </div>

            {/* here */}
            <div className={s.likesCountContainer}>{post.likes}</div>
          </div>

          {props.postState.isLogguedIn ? (
            <div className={s.barContainer}>
              <Link
                style={{ textDecoration: "none" }}
                to={"/edit"}
                state={post}
              >
                <div className={s.editContainer}>Editar</div>
              </Link>
              <div
                className={s.deleteContainer}
                onClick={() => {
                  axios
                    .delete(`http://localhost:8000/posts/${post._id}`)
                    .then((result) => {
                      axios.get(getAllPostsUrl).then((r) => {
                        const updatedPosts2 = r.data;
                        props.postState.setPosts(updatedPosts2.reverse());
                        navigate("/blogmain");
                      });
                    })
                    .catch((error) => {
                      console.log("this is the error:", error);
                    });
                }}
              >
                Eliminar
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={s.linkContainer}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/blogmain`}
              state={post}
            >
              <p className={s.backText}> Volver</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
