import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import s from "./Form.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import axios from "axios";

const Form = (props) => {
  // inital state
  const [title, setTitle] = useState("");
  const [textPost, setTextPost] = useState("");
  const [descriptionPost, setDescriptionPost] = useState("");
  const [mediaPost, setMediaPost] = useState([]);
  const user = props.userState.user;
  const reference = Math.floor(Math.random() * 10000000000).toString();
  const likes = 0;
  const [video, setVideo] = useState("");

  // useRef state
  const titleRef = useRef("");
  const mediaRef = useRef(null);
  const videoRef = useRef("");
  const textRef = useRef("");
  const descriptionRef = useRef("");
  const navigate = useNavigate();

  // assigning selected files to mediaPsot var
  const handleSetMedia = (e) => {
    const files = e.target.files;
    const filesArr = Array.from(files);
    setMediaPost(filesArr);
  };

  const addPost = (e) => {
    e.preventDefault();

    if (title === "" || descriptionPost === "") {
      titleRef.current.focus();
      return;
    } else if (mediaPost.length === 0 && textPost === "" && video === "") {
      titleRef.current.focus();
      return;
    }

    const formData = new FormData();

    formData.append("reference", reference);
    formData.append("user", user);
    formData.append("title", title);
    formData.append("text", textPost);
    formData.append("description", descriptionPost);
    formData.append("likes", likes);
    formData.append("video", video);
    mediaPost.forEach((file) => formData.append("media", file));

    // console.log("here is the formData info:");
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const url = "https://marisela-api.vercel.app/posts/create";

    axios
      .post(url, formData)
      .then((response) => {
        titleRef.current.value = "";
        mediaRef.current.value = "";
        textRef.current.value = "";
        descriptionRef.current.value = "";
        videoRef.current.value = "";

        setTitle("");
        setMediaPost([]);
        setTextPost("");
        setDescriptionPost("");
        setVideo("");

        const getAllPostsUrl = "https://marisela-api.vercel.app/posts/allposts";

        axios.get(getAllPostsUrl).then((response) => {
          props.userState.setPosts(response.data.reverse());
        });
        navigate("/allposts");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/blogmain`);
  };

  return (
    <div className={s.formPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.formContainer}>
          <form className={s.form} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Título (Campo obligatorio)"
              name="title"
              autoComplete="off"
              onChange={(e) => setTitle(e.target.value)}
              ref={titleRef}
            />
            <textarea
              placeholder="Descripción (Campo obligatorio)"
              name="description"
              cols="auto"
              rows="auto"
              onChange={(e) => setDescriptionPost(e.target.value)}
              ref={descriptionRef}
            ></textarea>

            <div className={s.directionsText}>
              *** Elige sólo uno de los siguientes campos. ***
            </div>

            <input
              className={s.videoInput}
              type="text"
              placeholder="Liga para video"
              name="video"
              autoComplete="off"
              onChange={(e) => setVideo(e.target.value)}
              ref={videoRef}
            />

            <div>
              <label htmlFor="media">Media</label>
              <input
                type="file"
                name="media"
                autoComplete="off"
                id="media"
                multiple
                ref={mediaRef}
                onChange={(e) => handleSetMedia(e)}
              />
            </div>
            <textarea
              placeholder="Texto"
              name="textPost"
              cols="30"
              rows="10"
              onChange={(e) => setTextPost(e.target.value)}
              ref={textRef}
            ></textarea>

            <button onClick={addPost}>Agregar publicación</button>
            <button onClick={handleCancel}>Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
