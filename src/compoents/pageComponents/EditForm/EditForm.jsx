import s from "./EditForm.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const EditForm = (props) => {
  const location = useLocation();
  const post = location.state;

  // // state to edit a post

  const [title, setTitle] = useState(post.title);
  const [descriptionPost, setDescriptionPost] = useState(post.description);

  // // state for form rem
  const titleRef = useRef("");
  const descriptionRef = useRef("");

  // navigate hook for redericting
  const navigate = useNavigate();

  // // handle edit
  const handleEdit = (e) => {
    e.preventDefault();

    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      titleRef.current.focus();
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", descriptionPost);

    const editURL = `https://marisela-api.vercel.app/posts/${post._id}`;
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .put(editURL, formData, config)
      .then((result) => {
        const getAllPostsUrl = "https://marisela-api.vercel.app/posts/allposts";
        axios.get(getAllPostsUrl).then((response) => {
          const allPostsAfterEditing = response.data;
          props.verificationState.setPosts(allPostsAfterEditing.reverse());
        });

        navigate(`/${post.reference}`);
      })
      .catch((error) => {
        console.log("this is the error", error);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/${post.reference}`);
  };

  return (
    <div className={s.editFormContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.formContainer}>
          <form className={s.form}>
            <input
              type="text"
              placeholder={`${post.title} (Campo obligatorio)`}
              name="title"
              autocomplete="off"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              ref={titleRef}
            />

            {post.text.length > 0 ? (
              <div className={s.textPost}>
                {post.text.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div> // here
            ) : (
              ""
            )}

            {post.media.length > 0 ? (
              <div className={s.imgPost}>
                <img alt="Element to be edited" src={post.media[0].url}></img>
              </div>
            ) : (
              ""
            )}

            {post.video ? (
              <div className={s.videoPost}>
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

            <textarea
              placeholder={`${post.description} (Campo obligatorio)`}
              name="description"
              cols="auto"
              rows="auto"
              onChange={(e) => {
                setDescriptionPost(e.target.value);
              }}
              ref={descriptionRef}
            ></textarea>
            <button onClick={handleEdit}>Editar publicación</button>
            <button onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
