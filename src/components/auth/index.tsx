import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUp from "./signup/signup";
import { Select } from "../tools/select-with-image/select";
import instaLogo from "../../images/instaaqarlogo.svg";
import UK from "../../images/auth/Uk.svg";
import Arabic from "../../images/auth/kw.svg";
import "./auth.scss";
import { useEffect, useState } from "react";
import Login from "./login/login";
import Guest from "./guest";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {getLocalStorage} from '../tools/getLocalstorage'
let languages = [
  { title: "English", icon: UK },
  { title: "Arabic", icon: Arabic },
];

const LoginCard = () => {
  const [guest, setGuest] = useState(false);
  const [login, setLogin] = useState(true);
  const { t, i18n } = useTranslation();
  const [navigateToHome, setNavigateToHome] = useState(false);
  const navigate = useNavigate();

  const handleLanguage = (index: number) => {
    if (index === 0) {
      localStorage.setItem("lang", "en");
      i18n.changeLanguage("en");
    } else {
      localStorage.setItem("lang", "ar");
      i18n.changeLanguage("ar");
    }
  };

  const homeNavigatieon = () => {
    
    navigate("/");
  };
  useEffect(() => {
     if (getLocalStorage()){
         setNavigateToHome(true)
     }
  }, []);
  return (
    <Container fluid className="authContainer">
      <Row className="auth">
        <Col xs={12} lg={6} className="p-0">
          <div className="authBackground">
            <div className="backgroundText">
              <span>{t("FindThe")}</span>
              <span>{t("PerfectPlace")}</span>
            </div>
          </div>
        </Col>

        <Col xs={12} lg={6} className="authFormContainer">
          <Row className="gy-3 authForm">
            <Col xs={12} className="authHeader p-1">
              <Col xs={12}>
                <Row className="p-1">
                  <Col
                    xs={6}
                    className="d-flex d-sm-bolck align-items-center"
                    onClick={() => homeNavigatieon()}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={instaLogo} className="logo " />
                  </Col>
                  <Col xs={6} className="d-sm-flex justify-content-end">
                    <Select
                      options={languages}
                      onChange={handleLanguage}
                      lang={i18n.language}
                    />
                  </Col>
                </Row>
              </Col>
            </Col>

            {guest ? (
              <Col xs={12} className="d-flex justify-content-center">
                <Guest setGuest={setGuest} />
              </Col>
            ) : (
              <>
                <Col xs={12} className="authBody">
                  {login ? (
                    <Login setLogin={setLogin} />
                  ) : (
                    <SignUp setLogin={setLogin} />
                  )}
                </Col>
                {/* <Col xs={12}>
                  <div className="guest" onClick={() => setGuest(true)}>
                    <a>{t("ContinueGuest")}</a>
                  </div>
                </Col> */}
              </>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginCard;
