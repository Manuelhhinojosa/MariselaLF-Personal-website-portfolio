import s from "./CV.module.css";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";
import cv from "../../../pdf/currículumMarisela.pdf";

const CV = () => {
  return (
    <div className={s.cvPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.cvContainer}>
          <iframe
            title="1"
            className={s.cvFile}
            src={cv}
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CV;
