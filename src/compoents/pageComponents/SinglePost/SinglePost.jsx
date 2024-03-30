import s from "./singlePost.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react"; // 1

export const SinglePost = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const getAllPostsUrl = "http://localhost:8000/posts/allposts";
  let reference = location.pathname.slice(1);
  let post = {};

  props.postState.posts.forEach((p) => {
    if (p.reference === reference) {
      post = p;
      return;
    }
  });

  let imageRef = useRef(null); // 2
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
              <p>{post.text}</p>
            </div>
          ) : (
            ""
          )}
          {/* end if post is text */}

          {/* if post is  media and media is image/gif */}

          {/* here */}

          {post.media.length > 0 ? (
            <div className={s.imgContainer}>
              <img src={post.media[index].url} ref={imageRef} alt="imgePost" />
              {/* ref attribure  3*/}

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

          {/* here */}

          {/* end if post is  media and media is image/gif */}

          <div className={s.likesContainer}>
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
            <div className={s.likesCountContainer}>
              A {post.likes} personas les ha gustado esta publicación.
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
