import s from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={s.errorPageContainer}>
      <div>
        <h1 className={s.text}>Esta URL no existe.</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
