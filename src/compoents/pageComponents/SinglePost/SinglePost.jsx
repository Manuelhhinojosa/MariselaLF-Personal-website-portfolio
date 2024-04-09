import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SinglePost = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const getAllPostsUrl =
    "https://mariselafierroapi-5307e550f9a3.herokuapp.com/posts/allposts";
  let reference = location.pathname.slice(1);
  let post = {};

  props.postState.posts.forEach((p) => {
    if (p.reference === reference) {
      post = p;
      return;
    }
  });

  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, post.media.length - 1));
  };

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
                title={post.reference}
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

          {post.media.length > 0 ? (
            <div className={s.imgContainer}>
              <img src={post.media[index].url} alt="imgePost" />

              {post.media.length > 1 ? (
                <div className={s.btnsContainer}>
                  <button className={s.sliderButton} onClick={handlePrev}>
                    {`<<<`}
                  </button>

                  <div className={s.mediaAmount}>{`${index + 1} de ${
                    post.media.length
                  }`}</div>

                  <button className={s.sliderButton} onClick={handleNext}>
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
              className={s.likesBtnContainer}
              onClick={() => {
                axios
                  .patch(
                    `https://mariselafierroapi-5307e550f9a3.herokuapp.com/posts/${post._id}`
                  )
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
            <div className={s.likesCountContainer}>
              {post.likes === 0 ? `0 Me gusta.` : ""}

              {post.likes === 1 ? `${post.likes} Me gusta.` : ""}

              {post.likes > 1 ? `${post.likes} Me gusta.` : ""}
            </div>
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
                    .delete(
                      `https://mariselafierroapi-5307e550f9a3.herokuapp.com/posts/${post._id}`
                    )
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
