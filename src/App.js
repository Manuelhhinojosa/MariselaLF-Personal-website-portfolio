import { Routes, Route } from "react-router-dom";
import s from "./App.module.css";
import NavBar from "./compoents/generalComponents/NavBar/NavBar";
import { Home } from "./compoents/pageComponents/Home/Home";
import ErrorPage from "./compoents/pageComponents/ErrorPage/ErrorPage";
import About from "./compoents/pageComponents/About/About";
import { useState } from "react";
import { projectsData } from "./projectsData";
import Project from "./compoents/pageComponents/Project/Project";
import Contact from "./compoents/pageComponents/Contact/Contact";
import BlogHome from "./compoents/pageComponents/BlogHome/BlowHome";
import { Blog } from "./compoents/pageComponents/Blog/Blog";
import { Login } from "./compoents/pageComponents/Login/Login";
import EditForm from "./compoents/pageComponents/EditForm/EditForm";
import Form from "./compoents/pageComponents/Form/Form";

function App() {
  // NavBar state
  const [showNavBar, setShowNavBar] = useState(false);

  // auth
  const [isLogguedIn, setIsLogguedIn] = useState(false);
  const [user, setUser] = useState("");

  // NavBar props
  const navBarState = {
    showNavBar,
    setShowNavBar,
    isLogguedIn,
    setIsLogguedIn,
  };

  // blog props
  const verificationState = {
    isLogguedIn,
    setIsLogguedIn,
  };

  // form props
  const userState = {
    user,
    setUser,
    isLogguedIn,
    setIsLogguedIn,
  };

  return (
    <div className={s.appContainer}>
      <NavBar navBarState={navBarState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogmain" element={<BlogHome />} />
        <Route
          path="/blog"
          element={<Blog verificationState={verificationState} />}
        />
        {projectsData.map((project) => (
          <Route
            key={project.id}
            path={project.path}
            element={<Project project={project} />}
          />
        ))}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login userState={userState} />} />
        <Route path="/add" element={<Form userState={userState} />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
