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
              <p className={s.name}> Marisela L. Fierro</p>
              Soy artista visual, docente e investigadora novel con interés por
              el estudio de la creatividad en procesos educativos y artísticos
              contemporáneos. Tengo formación en Artes Visuales por la
              Universidad de Guadalajara (UdeG), Maestría en Educación y
              Expresión para las Artes y Maestría en Psicología Educativa por la
              misma institución. Trabajo como docente en la Prepa ITESO, en la
              Escuela Preparatoria 7 y en la Maestría en Educación y Expresión
              para las Artes. Tengo experiencia en el diseño de asignaturas
              relacionadas con el arte, así como en proyectos de mediación
              artística y arte colaborativo. Imparto cursos, talleres, asesorías
              y charlas a profesores y estudiantes de arte en varias
              instituciones.
              <br />
              <br />
              <br />
              <br />
              Como creadora experimento con dibujo, fotografía técnicas mixtas,
              objetos, texto y animación. En mis obras, indago en temas
              autobiográficos, relaciones interpersonales, procesos educativos y
              en algunas ciencias como la geografía y la psicología, generando
              conexiones por medio de la yuxtaposición de conceptos codificados.
              He participado en exposiciones colectivas en Guadalajara,
              Guanajuato y los Ángeles y en diversas publicaciones editoriales
              independientes y de instituciones como el Museo de Arte de Zapopan
              o la UdeG.
              <br />
              <br />
              <br />
              Líneas de investigación: Arte contemporáneo, Educación artística,
              Mediación artística, Género e inclusión.
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
