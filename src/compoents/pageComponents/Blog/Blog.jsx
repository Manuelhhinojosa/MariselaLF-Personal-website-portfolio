import s from "./Blog.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import axios from "axios";
import { Link } from "react-router-dom";

const getAllPostsUrl = "http://localhost:8000/posts/allposts";

export const Blog = (props) => {
  return (
    <div className={s.blogPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.postsContainer}>
          {props.verificationState.posts.map((post) => (
            <div className={s.postContainer}>
              <div className={s.titleContainer}>
                <p>{post.title}</p>
              </div>

              <div className={s.descriptionContainer}>
                <p>{post.description}</p>
              </div>

              <div className={s.dateContainer}>
                {post.createdAt.slice(0, 10)}
              </div>

              {/* if post is text */}
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
                  File type .heic not supported by browsers. To be used only iOS
                  & Mac mobile/web apps. Convert to jpeg/png/...
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

              {/* if post is media and media audio */}
              {/* end if post is media and media isaudio */}

              {/* if post is media and media is video */}
              {/* end if post is media and media is video */}

              <div className={s.likesContainer}>
                <div
                  className={s.btnContainer}
                  onClick={() => {
                    axios
                      .patch(`http://localhost:8000/posts/${post._id}`)
                      .then((result) => {
                        console.log(result);
                        axios.get(getAllPostsUrl).then((res) => {
                          const updatedPosts = res.data;
                          props.verificationState.setPosts(
                            updatedPosts.reverse()
                          );
                        });
                      })
                      .catch((error) => {
                        console.log("this is the error:", error);
                      });
                  }}
                >
                  Me gusta
                </div>

                <div className={s.likesCountContaier}>{post.likes}</div>
              </div>

              {props.verificationState.isLogguedIn ? (
                <div className={s.barContainer}>
                  <Link className={s.link} to="/edit" state={post}>
                    <div className={s.btnContainer}>Editar</div>
                  </Link>
                  <div
                    className={s.btnContainer}
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8000/posts/${post._id}`)
                        .then((result) => {
                          console.log(result);
                          axios.get(getAllPostsUrl).then((r) => {
                            const updatedPosts2 = r.data;
                            props.verificationState.setPosts(
                              updatedPosts2.reverse()
                            );
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
