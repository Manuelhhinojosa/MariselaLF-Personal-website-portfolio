import { useNavigate } from "react-router-dom";

import s from "./Form.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import { useState, useRef } from "react";
import axios from "axios";

const Form = (props) => {
  // init state
  // // state to add a post
  const user = props.userState.user;
  const [title, setTitle] = useState("");
  const [mediaPost, setMediaPost] = useState("");
  const [textPost, setTextPost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const likes = 0;

  // navigate hook for redericting
  const navigate = useNavigate();

  // // state for form ref
  const titleRef = useRef("");
  const mediaRef = useRef("");
  const textRef = useRef("");
  const descriptionRef = useRef("");

  // adding post
  const addPost = (e) => {
    e.preventDefault();

    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      titleRef.current.focus();
      return;
    } else if (mediaRef.current.value === "" && textRef.current.value === "") {
      titleRef.current.focus();
      return;
    } else if (mediaRef.current.value && textRef.current.value) {
      titleRef.current.focus();
      return;
    }

    const formData = new FormData();

    formData.append("user", user);
    formData.append("title", title);
    formData.append("text", textPost);
    formData.append("description", descriptionPost);
    formData.append("likes", likes);
    formData.append("media", mediaPost);

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const url = "http://localhost:8000/posts/create";

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response);

        titleRef.current.value = "";
        mediaRef.current.value = "";
        textRef.current.value = "";
        descriptionRef.current.value = "";

        setTitle("");
        setMediaPost("");
        setTextPost("");
        setDescriptionPost("");

        navigate("/blogmain");
      })
      .catch((error) => {
        console.log("error starts here");
        console.log(error);
        console.log("error ends here");
      });
  };

  return (
    <div className={s.formPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.formContainer}>
          <form className={s.form}>
            <input
              type="text"
              placeholder="titulo"
              name="title"
              autoComplete="off"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              ref={titleRef}
            />
            <div>
              <label id="media">media</label>
              <input
                type="file"
                name="media"
                autoComplete="off"
                id="media"
                onChange={(e) => {
                  setMediaPost(e.target.files[0]);
                }}
                ref={mediaRef}
              />
            </div>
            <div className={s.postOptions}>+++ ó +++</div>
            <textarea
              placeholder="qué estás pensando?"
              name="textPost"
              cols="30"
              rows="10"
              onChange={(e) => {
                setTextPost(e.target.value);
              }}
              ref={textRef}
            ></textarea>
            <textarea
              placeholder="descipción"
              name="description"
              cols="auto"
              rows="auto"
              onChange={(e) => {
                setDescriptionPost(e.target.value);
              }}
              ref={descriptionRef}
            ></textarea>
            <button onClick={addPost}>agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
