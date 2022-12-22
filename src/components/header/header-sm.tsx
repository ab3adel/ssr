import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import instaLogo from "../../images/instaaqarlogo.svg";
import { InputWithIcon } from "../tools/input/inputIcon";
import search from "../../images/input-search-icon.svg";
import message from "../../images/home/message-icon.svg";
import notification from "../../images/home/bell-icon-1.svg";
import user from "../../images/auth/profile.svg";
import Collapse from "react-bootstrap/Collapse";
import { List } from "react-bootstrap-icons";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SettingContext from "../tools/context/setting-context/setting-context";
import { iToken } from "../tools/interface";
import {useNavigate} from 'react-router-dom'
import {iProps} from './'
export const HeaderSm = ({ token,chat_notification }: iProps) => {
  const [openSearch, setOpenSearch] = useState(false);
  const { setOpenSidebar, openSidebar } = useContext(SettingContext);
  const [showUserName,setShowUserName]=useState(false)
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
    <Navbar className="navbarSmContainer d-block d-sm-none">
      <Container>
        <Row className="gy-2">
          <Col xs={2}>
            <img src={instaLogo} className="logo" />
          </Col>
          <Col xs={2}>
            <div className="iconContainer">
              <img
                src={search}
                className="icon"
                onClick={() => setOpenSearch(!openSearch)}
              />
            </div>
          </Col>
          <Col xs={2}>
            <div className="iconContainer"
            onClick={()=>navigate('/messages')}>
              <img src={message} className="icon" />
              {
                chat_notification>0 &&
              (<div className="dot">
                {chat_notification}
              </div>)
              }
            </div>
          </Col>
          <Col xs={2}>
            <div className="iconContainer">
              <img src={notification} className="icon" />
              <div className="dot"></div>
            </div>
          </Col>
          <Col xs={2} className="user">
            <div className="iconContainer"
            onClick={()=>setShowUserName(true)}>
              {token && token.profile_picture ? (
                <img src={token.profile_picture} className="icon" />
              ) : (
                <img src={user} className="icon" />
              )}
            </div>
            <span
            className={showUserName?"showUserName":''}>{token?.full_name ? token.full_name : "user"}</span>
          </Col>
          <Col xs={2}>
            <List className="logo" onClick={() => setOpenSidebar(true)} />
          </Col>
          <Col xs={12} id="searchInput">
            <Collapse in={openSearch}>
              <InputWithIcon
                icon={search}
                label={t("SearchLocations")}
                id="search"
                name="search"
                type="text"
                className="searchInput"
                required={true}
              />
            </Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};
