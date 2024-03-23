import s from "./HomeButton.module.css";
import { Link } from "react-router-dom";

const HomeButton = (props) => {
  return (
    <div className={s.home}>
      <Link className={s.homeLink} to="/">
        <p className={s.buttonText}>Inicio</p>
      </Link>
    </div>
  );
};

export default HomeButton;
