import s from "./Blog.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Blog = (props) => {
  const getAllPostsUrl = "http://localhost:8000/posts/allposts";

  const index1 = 0;
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

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
                  <p>
                    {post.text.split("\n").map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </p>
                </div>
              ) : (
                ""
              )}
              {/* end if post is text */}

              {/* if post is video */}

              {post.video ? (
                <div className={s.videoContainer}>
                  <iframe
                    allowFullScreen
                    src={post.video}
                    frameborder="0"
                  ></iframe>
                </div>
              ) : (
                ""
              )}

              {/* end if post is video */}

              {/* if post is  media and media is image/gif */}

              {post.media.length === 1 ? (
                <div className={s.imgContainer}>
                  <img src={post.media[index1].url} alt="imgePost" />
                </div>
              ) : (
                ""
              )}

              {post.media.length === 2 ? (
                <div className={s.imgContainer}>
                  <img src={post.media[index2].url} alt="imgePost" />

                  {post.media.length === 2 ? (
                    <div className={s.btnsContainer}>
                      <button
                        className={s.sliderButton}
                        onClick={() => {
                          setIndex2((prevIndex) => Math.max(prevIndex - 1, 0));
                        }}
                      >
                        {`<<<`}
                      </button>

                      <div className={s.mediaAmount}>{`${index2 + 1} de ${
                        post.media.length
                      }`}</div>

                      <button
                        className={s.sliderButton}
                        onClick={() => {
                          setIndex2((prevIndex) =>
                            Math.min(prevIndex + 1, post.media.length - 1)
                          );
                        }}
                      >
                        {`>>>`}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {post.media.length === 3 ? (
                <div className={s.imgContainer}>
                  <img src={post.media[index3].url} alt="imgePost" />

                  {post.media.length === 3 ? (
                    <div className={s.btnsContainer}>
                      <button
                        className={s.sliderButton}
                        onClick={() => {
                          setIndex3((prevIndex) => Math.max(prevIndex - 1, 0));
                        }}
                      >
                        {`<<<`}
                      </button>

                      <div className={s.mediaAmount}>{`${index3 + 1} de ${
                        post.media.length
                      }`}</div>

                      <button
                        className={s.sliderButton}
                        onClick={() => {
                          setIndex3((prevIndex) =>
                            Math.min(prevIndex + 1, post.media.length - 1)
                          );
                        }}
                      >
                        {`>>>`}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {/* end if post is  media and media is image/gif */}

              <div className={s.likesContainer}>
                <div
                  className={s.btnContainer}
                  onClick={() => {
                    axios
                      .patch(`http://localhost:8000/posts/${post._id}`)
                      .then((result) => {
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

                <div className={s.likesCountContaier}>
                  {post.likes === 0 ? `0 Me gusta.` : ""}

                  {post.likes === 1 ? `${post.likes} Me gusta.` : ""}

                  {post.likes > 1 ? `${post.likes} Me gusta.` : ""}
                </div>
              </div>

              {props.verificationState.isLogguedIn ? (
                <div className={s.barContainer}>
                  <Link
                    style={{ textDecoration: "none" }}
                    className={s.linkContainer}
                    to="/edit"
                    state={post}
                  >
                    <div className={s.btnContainer}>Editar</div>
                  </Link>
                  <div
                    className={s.btnContainer}
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8000/posts/${post._id}`)
                        .then((result) => {
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
