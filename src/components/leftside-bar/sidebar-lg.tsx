import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import home from "../../images/home/home-icon.svg";
import search from "../../images/home/search-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import notification from "../../images/home/bell-icon-1.svg";
import messages from "../../images/home/message-icon.svg";
import about from "../../images/home/about-icon.svg";
import instaLogo from "../../images/instaaqarlogo.svg";
import logo from "../../images/auth/logo.svg";
import news from "../../images/home/newsfeed-icon.svg";
import layer from "../../images/home/layer-icon.svg";
import Button from "react-bootstrap/Button";
import { useEffect, useState,useContext } from "react";
import { Select } from "../tools/select-with-image/select";
import UK from "../../images/auth/Uk.svg";
import { useTranslation } from "react-i18next";
import Arabic from "../../images/auth/kw.svg";
import { useNavigate } from "react-router-dom";
import {iToken} from '../tools/interface'
import show from "../../images/home/show.svg";
let languages = [
  { title: "English", icon: UK },
  { title: "Arabic", icon: Arabic },
];
interface iProps {
  token?: iToken;
  removeToken: Function;
  collapsed: boolean;
  setCollapsed: Function;
}
let mainCol_xl = 12;
let mainCol_lg = 12;
let logoMainCol = 12;
let col_xl = 10;
let col_lg = 12;
let collapseBtnClass = "";
let openBtnClass = "open";
export const SidebarLg = ({
  token,
  removeToken,
  collapsed,
  setCollapsed,
}: iProps) => {
  const { i18n, t } = useTranslation();
  const [selected, setSelected] = useState(0);

  const [logedIn, setLogedIn] = useState(false);
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
  const handleLogin = () => {
    setLogedIn(true);
    navigate("/auth");
  };
  const hanldeRoutes = (num: number) => {
    setSelected(num);
    switch (num) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/news");
        break;
      case 7:
        navigate("/addpost");
        break;
      default:
        navigate("/");
    }
  };

  const handleCollapse = () => {};
  useEffect(() => {
    if (i18n.language === "ar") {
      collapseBtnClass = "arOpen";
      openBtnClass = "arClose";
    }
  }, [i18n.language]);
  useEffect(() => {
    if (collapsed) {
      col_xl = 12;
      col_lg = 12;
      mainCol_lg = 12;
      mainCol_xl = 10;
      logoMainCol = 12;
    }
  }, [collapsed]);
  if (i18n.language === "ar") {
    collapseBtnClass = "arOpen";
    openBtnClass = "arClose";
  }
  return (
    <Row className="sidebarContainer flex-column gy-1 p-1 d-none d-sm-flex">
      <Col xs={logoMainCol} className="logoContainer ">
        <Row>
          <Col xs={9} className="d-flex ">
            <img
              src={collapsed ? logo : instaLogo}
              className={collapsed ? "logo" : "logoWithName"}
            />
          </Col>
          <Col
            xs={3}
            onClick={() => setCollapsed(!collapsed)}
            className="d-flex justify-content-center align-items-center p-md-0 p-sm-auto"
          >
            <img
              src={show}
              className={
                collapsed
                  ? `collapseBtn ${openBtnClass}`
                  : `collapseBtn ${collapseBtnClass}`
              }
            />
          </Col>
        </Row>
      </Col>
      <Col  lg={mainCol_lg} className="sidebarItems">
        <Col xl={mainCol_xl} lg={mainCol_lg}>
          <Row className="">
            <Col
              lg={col_lg}
            
              onClick={() => hanldeRoutes(0)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 0 ? "item focused" : "item "}>
                <img src={home} className="icon" />

                {!collapsed && (
                  <>
                    <span className="text">{t("Home")}</span>
                    <div className="empty"></div>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
             
              onClick={() => hanldeRoutes(1)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 1 ? "item focused" : "item "}>
                <img src={news} className="icon" />
                {!collapsed && (
                  <>
                    <span className="text">{t("NewsFeed")}</span>
                    <div className="empty"></div>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
              
              onClick={() => hanldeRoutes(2)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 2 ? "item focused" : "item "}>
                <img src={search} className="icon" />
                {!collapsed && (
                  <>
                    <span className="text">{t("Search")}</span>
                    <div className="empty"></div>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
              
              onClick={() => hanldeRoutes(3)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 3 ? "item focused" : "item "}>
                <img src={profile} className="icon" />
                {!collapsed && (
                  <>
                    <span className="text">{t("Profile")}</span>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
              
              onClick={() => hanldeRoutes(4)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 4 ? "item focused" : "item "}>
                <div className="iconContainer">
                  <div className="dot"></div>
                  <img src={notification} className="icon" />
                </div>

                {!collapsed && (
                  <>
                    <span className="text">{t("Notifications")}</span>
                    <div className="notification">10</div>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
           
              onClick={() => hanldeRoutes(5)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 5 ? "item focused" : "item "}>
                <div className="iconContainer">
                  <div className="dot"></div>
                  <img src={messages} className="icon" />
                </div>
                {!collapsed && (
                  <>
                    <span className="text">{t("Messages")}</span>
                    <span className="notification">10</span>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
           
              onClick={() => hanldeRoutes(6)}
              className={collapsed ? "d-flex  " : "p-md-0 p-lg-1"}
            >
              <div className={selected === 6 ? "item focused" : "item "}>
                <img src={about} className="icon" />
                {!collapsed && (
                  <>
                    <span className="text">{t("AboutInsta")}</span>
                  </>
                )}
              </div>
            </Col>
            <Col
              lg={col_lg}
             xl={col_xl}
              className={collapsed ? "collapse" : "show"}
            >{token?.role !==2 &&
             ( <Button className="postBtn Btn" onClick={() => hanldeRoutes(7)}>
                <div className="plus">+</div>
                {t("PostProperty")}
              </Button>)
              }
            </Col>
          </Row>
        </Col>
        <Col xs={12} className={collapsed ? "collapse" : "show p-1 pt-0"}>
          <Col xl={9} lg={12}>
            <Select
              options={languages}
              onChange={handleLanguage}
              lang={i18n.language}
            />
          </Col>
          <Col xl={9} lg={12}>
            {token?.token ? (
              <Button className="logoutBtn Btn" onClick={() => removeToken()}>
                <img src={layer} />
                <span>{t("Logout")}</span>
              </Button>
            ) : (
              <Button className="loginBtn Btn" onClick={handleLogin}>
                <span>{t("Login")}</span>
              </Button>
            )}
          </Col>
        </Col>
      </Col>
    </Row>
  );
};
