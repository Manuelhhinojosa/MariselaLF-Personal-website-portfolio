const handleSignUp = async (e) => {
  e.preventDefault();
  const signUpURL = "http://localhost:8000/user/signup";
  const data = {
    username: "manuel",
    password: "manuel",
  };
  axios.post(signUpURL, data);
};
