import s from "./Login.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data = { username: username, password: password };

  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const loginURL = "http://localhost:8000/user/login";

    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      usernameRef.current.focus();
      return;
    }

    axios
      .post(loginURL, data)
      .then((result) => {
        const user = result.data;
        props.userState.setUser(user._id);
        props.userState.setIsLogguedIn(true);
        navigate("/blogmain");
      })
      .catch((error) => {
        console.log("this is the error", error);
        usernameRef.current.value = "";
        passwordRef.current.value = "";
        usernameRef.current.focus();
      });
  };

  return (
    <div className={s.loginPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.loginFormContainer}>
          <form action="" className={s.loginForm}>
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              ref={usernameRef}
            />

            <input
              type="password"
              name="password"
              placeholder="Contaseña"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              ref={passwordRef}
            />
            <button onClick={handleSignIn}>Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};
