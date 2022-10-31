import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import home from "../../images/home/home-icon.svg";
import search from "../../images/home/search-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import notification from "../../images/home/bell-icon-1.svg";
import messages from "../../images/home/message-icon.svg";
import about from "../../images/home/about-icon.svg";
import { List } from "react-bootstrap-icons";
import news from "../../images/home/newsfeed-icon.svg";
import layer from "../../images/home/layer-icon.svg";
import Button from "react-bootstrap/Button";
import { Select } from "../tools/select-with-image/select";
import UK from "../../images/auth/Uk.svg";
import kw from "../../images/auth/kw.svg";
import { useTranslation } from "react-i18next";
import { iToken } from "../tools/interface";
import Collapse from "react-bootstrap/Collapse";
import Fade from "react-bootstrap/Fade";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import SettingContext from "../tools/context/setting-context/setting-context";
interface iProps {
  token?: iToken;
  removeToken: Function;
}

let languages = [
  { title: "English", icon: UK },
  { title: "Arabic", icon: kw },
];

export const SidebarSm = ({ token, removeToken }: iProps) => {
  const { openSidebar, setOpenSidebar } = useContext(SettingContext);
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
  const handleRoutes = (num: number) => {
    setOpenSidebar(false);
    setSelected(num);
    switch (num) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/news");
        break;
      case 2:
        navigate("/search");
        break;
      case 3:
        navigate("/profile");
        break;
      case 7:
        navigate("/addpost");
        break;
      case 5:
        navigate("/messages");
        break;

      default:
        navigate("/");
    }
  };
  return (
    <Fade in={openSidebar}>
      <Row
        className={`sidebarContainerSm flex-column gy-2 p-1  d-sm-none ${
          openSidebar ? "d-flex" : "d-none"
        } `}
      >
        <Collapse in={openSidebar} dimension="width">
          <Col xs={12} className="sidebarItems">
            <Row className=" justify-content-between h-100 flex-grow-1 gy-4">
              <Col xs={12}>
                <List className="logo" onClick={() => setOpenSidebar(false)} />
              </Col>
              <Col xs={12}>
                <Row className="gy-2">
                  <Col xs={7} onClick={() => handleRoutes(0)}>
                    <div
                      className={selected === 0 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      <img src={home} className="icon" />
                      {i18n.language === "ar" && <div className="empty"></div>}

                      <span>{t("Home")}</span>
                      {i18n.language === "en" && <div className="empty"></div>}
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(1)}>
                    <div
                      className={selected === 1 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      <img src={news} className="icon" />
                      {i18n.language === "ar" && <div className="empty"></div>}
                      <span>{t("NewsFeed")}</span>
                      {i18n.language === "en" && <div className="empty"></div>}
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(2)}>
                    <div
                      className={selected === 2 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      <img src={search} className="icon" />
                      {i18n.language === "ar" && <div className="empty"></div>}
                      <span>{t("Search")}</span>
                      {i18n.language === "en" && <div className="empty"></div>}
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(3)}>
                    <div
                      className={selected === 3 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      <img src={profile} className="icon" />

                      <span>{t("Profile")}</span>
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(4)}>
                    <div
                      className={selected === 4 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      {i18n.language === "ar" && (
                        <span className="notification" style={{ margin: "0" }}>
                          10
                        </span>
                      )}

                      <div className="iconContainer">
                        <div className="dot"></div>
                        <img src={notification} className="icon" />
                      </div>

                      <span>{t("Notifications")}</span>
                      {i18n.language === "en" && (
                        <span className="notification">10</span>
                      )}
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(5)}>
                    <div
                      className={selected === 5 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      {i18n.language === "ar" && (
                        <span className="notification" style={{ margin: "0" }}>
                          10
                        </span>
                      )}
                      <div className="iconContainer">
                        <div className="dot"></div>
                        <img src={messages} className="icon" />
                      </div>

                      <span>{t("Messages")}</span>
                      {i18n.language === "en" && (
                        <span className="notification">10</span>
                      )}
                    </div>
                  </Col>
                  <Col xs={7} onClick={() => handleRoutes(6)}>
                    <div
                      className={selected === 6 ? "item focused" : "item "}
                      style={
                        i18n.language === "en"
                          ? {}
                          : {
                              flexDirection: "row-reverse",
                              justifyContent: "space-between",
                            }
                      }
                    >
                      <img src={about} className="icon" />
                      <span>{t("AboutInsta")}</span>
                    </div>
                  </Col>
                  <Col xs={9}>
                    {token?.role && token?.role !== 2 && (
                      <Button
                        className="postBtn Btn"
                        onClick={() => handleRoutes(7)}
                      >
                        {t("PostProperty")}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Col
                  xs={9}
                  className={`d-flex  ${
                    i18n.language === "en"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <Select
                    options={languages}
                    onChange={handleLanguage}
                    lang={i18n.language}
                    width="100%"
                  />
                </Col>
                <Col xs={9}>
                  {token?.token ? (
                    <Button
                      className="logoutBtn Btn"
                      onClick={() => removeToken()}
                    >
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
            </Row>
          </Col>
        </Collapse>
      </Row>
    </Fade>
  );
};
