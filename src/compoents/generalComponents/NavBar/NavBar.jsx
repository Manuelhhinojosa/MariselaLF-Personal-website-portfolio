import { Link } from "react-router-dom";
import s from "./NavBar.module.css";
import emailImg from "../../../images/contactBar/email.png";
import linkedInImg from "../../../images/contactBar/linkedin.png";
import igImg from "../../../images/contactBar/ig.png";
import twitterImg from "../../../images/contactBar/twitter.png";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();

  const handleNavBar = () => {
    props.navBarState.setShowNavBar(!props.navBarState.showNavBar);
  };
  return (
    <div className={s.navBarContainer}>
      <div className={s.topNavBarContainer}>
        <div className={s.moreContainer}>
          <p className={s.p} onClick={handleNavBar}>
            {props.navBarState.showNavBar ? "Ocultar" : "Ver más"}
          </p>
        </div>
        <div
          className={s.pageMenuContainer}
          style={props.navBarState.showNavBar ? {} : { display: "none" }}
        >
          {/*  */}

          <div className={s.pageMenuContainerTop}>
            <Link className={s.link} to="/about">
              <div className={s.menuItemContainer}>Acerca de</div>
            </Link>

            <Link className={s.link} to="/blogmain">
              <div className={s.menuItemContainer}>Blog</div>
            </Link>
          </div>

          {/*  */}

          <div className={s.pageMenuContainerBottom}>
            <div className={s.pageMenuContainerBottom1}>
              <div>Proyectos:</div>
              <br />
              <Link className={s.link} to="/lacuerpaquesomos">
                <div className={s.menuItemContainer}>Cuerpa</div>
              </Link>
              <Link className={s.link} to="/asociacion">
                <div className={s.menuItemContainer}>Asociación</div>
              </Link>
              <Link className={s.link} to="/dif">
                <div className={s.menuItemContainer}>Expreso</div>
              </Link>
              <Link className={s.link} to="/dada">
                <div className={s.menuItemContainer}>DADA</div>
              </Link>
              <Link className={s.link} to="/laboratorio">
                <div className={s.menuItemContainer}>Laboratorio</div>
              </Link>
              <Link className={s.link} to="/pangea">
                <div className={s.menuItemContainer}>Pangea</div>
              </Link>
              <Link className={s.link} to="/sigilio">
                <div className={s.menuItemContainer}>Sigilio</div>
              </Link>
              <Link className={s.link} to="/amanuense">
                <div className={s.menuItemContainer}>Amanuense</div>
              </Link>
              <Link className={s.link} to="/duelo">
                <div className={s.menuItemContainer}>Duelo</div>
              </Link>
            </div>

            {props.navBarState.isLogguedIn ? (
              <div className={s.pageMenuContainerBottom2}>
                <div className={s.link} to="/login">
                  <div
                    className={s.menuItemContainer}
                    onClick={() => {
                      props.navBarState.setIsLogguedIn(false);
                      props.navBarState.setShowNavBar(false);
                      navigate("/");
                    }}
                  >
                    Salir
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.pageMenuContainerBottom2}>
                <Link className={s.link} to="/login">
                  <div className={s.menuItemContainer}>Ingresar</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={s.contactMenuContainer}
        style={props.navBarState.showNavBar ? {} : { display: "none" }}
      >
        <div className={s.contactMenuItemContainer}>
          <Link to="/contact">
            <img src={emailImg} alt="email-icon" />
          </Link>
        </div>
        <div className={s.contactMenuItemContainer}>
          <a href="https://www.linkedin.com/in/mariselalf">
            <img src={linkedInImg} alt="linkedIn-icon" />
          </a>
        </div>
        <div className={s.contactMenuItemContainer}>
          <a href="https://www.instagram.com/marisela_con_ese/">
            <img src={igImg} alt="ig-icon" />
          </a>
        </div>
        <div className={s.contactMenuItemContainer}>
          <a href="https://www.twitter.com/marisela_con_s">
            <img src={twitterImg} alt="twitter-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
