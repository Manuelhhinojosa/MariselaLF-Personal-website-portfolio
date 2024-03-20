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

    const editURL = `http://localhost:8000/posts/${post._id}`;
    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .put(editURL, formData, config)
      .then((result) => {
        const getAllPostsUrl = "http://localhost:8000/posts/allposts";
        axios.get(getAllPostsUrl).then((response) => {
          const allPostsAfterEditing = response.data;
          props.verificationState.setPosts(allPostsAfterEditing.reverse());
        });

        navigate("/allposts");
      })
      .catch((error) => {
        console.log("this is the error", error);
      });
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
              placeholder={post.title}
              name="title"
              autocomplete="off"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              ref={titleRef}
            />

            {post.media ? (
              <div className={s.imgPost}>
                <img src={post.media.url}></img>
              </div>
            ) : (
              ""
            )}

            {post.text ? <div className={s.textPost}>{post.text}</div> : ""}

            <textarea
              placeholder={post.description}
              name="description"
              cols="auto"
              rows="auto"
              onChange={(e) => {
                setDescriptionPost(e.target.value);
              }}
              ref={descriptionRef}
            ></textarea>

            <button onClick={handleEdit}>edit post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
