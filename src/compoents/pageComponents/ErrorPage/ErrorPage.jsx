import s from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={s.errorPageContainer}>
      <div>
        <h1 className={s.text}>This URL does not exist</h1>
      </div>
    </div>
  );
};

export default ErrorPage;
