import s from "./About.module.css";
import aboutImg from "../../../images/aboutPage/aboutImg.png";
import HomeButton from "../../generalComponents/HomeButton/HomeButton";

const About = () => {
  return (
    <div className={s.aboutPageContainer}>
      <div className={s.top}>
        <HomeButton />
      </div>
      <div className={s.bottom}>
        <div className={s.aboutContainer}>
          <div className={s.aboutTextContainer}>
            <p className={s.text}>
              <span className={s.name}> Marisela L. Fierro</span> (Reside en
              Zapopan, Jalisco, México)
              <br />
              <br />
              <br />
              Es artista y docente desde hace más de 15 años. Tiene interés por
              el estudio de la creatividad en procesos educativos y artísticos
              contemporáneos, así como en el desarrollo de proyectos de
              mediación artística y pedagogía contemporánea del arte. Su
              formación es en Artes Visuales por la Universidad de Guadalajara;
              es egresada de la Maestría en Educación y Expresión para las Artes
              y de la Maestría en Psicología Educativa en la misma institución.
              Ha dado cursos, talleres y charlas a docentes y alumnos de
              preparatorias y licenciaturas en arte.
              <br />
              <br />
              <br />
              <br />
              Como creadora experimenta con dibujo, fotografía, técnicas mixtas,
              objetos, textos y animación. Es parte de proyectos editoriales
              colaborativos. Dirige, edita y diseña la revista DADA/Fanzine que
              se distribuye en preparatorias y centros universitarios de la
              UdeG. Este proyecto tiene el propósito de promover y difundir las
              artes y la literatura de la comunidad.
            </p>
          </div>
          <div className={s.aboutImgContainer}>
            <img className={s.aboutImg} src={aboutImg} alt="about" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
