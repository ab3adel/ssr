import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { InputWithIcon } from "../tools/input/inputIcon";

import message from "../../images/home/message-icon.svg";
import notification from "../../images/home/bell-icon-1.svg";
import user from "../../images/auth/profile.svg";
import { useTranslation } from "react-i18next";

import {iProps} from './'


export const HeaderLg = ({ 
  token
  ,chat_notification 
  ,handleNotificationClick
  ,setSearch
  ,handleSearch
  ,search
  ,headerNavigation
}: iProps) => {
  const { t } = useTranslation();
  

  return (
    <Navbar
      className="navbarContainer d-none d-sm-block"
      expand="lg"
      key={"lg"}
    >
      <Container className="container" fluid>
        <Row className="navbarRow">
          <Col sm={8} xs={10}>
            <Row>
              <Col sm={6} xs={12}
              onKeyUp={handleSearch}>
                <InputWithIcon
                  icon={search}
                  label={t("SearchLocations")}
                  id="search"
                  name="search"
                  type="text"
                  className="searchInput"
                  required={true}
                  value={search}
                  onChange={setSearch}
                  
                />
              </Col>
            </Row>
          </Col>

          <Col
            sm={4}
            xs={2}
            className=" d-sm-flex align-items-center justify-content-center"
          >
            <Row className="pr-1">
              <Col sm={3} xs={6}>
                <div className="iconContainer"
                onClick={handleNotificationClick}>
                  {chat_notification >0 && <div className="dot">{chat_notification}</div>}
                  <img src={message} className="icon" alt="messages" />
                </div>
              </Col>
              <Col sm={3} xs={6}>
                <div className="iconContainer">
                  {/* {<div className="dot"></div>} */}
                  <img src={notification} className="icon" alt="notification"/>
                </div>
              </Col>
              <Col sm={6} className=" d-none d-sm-block user">
                <Col xs={12} className="d-flex justify-content-center"
                style={{cursor:'pointer'}}
                onClick={()=>  headerNavigation('profile')}>
                  {token?.profile_picture ? (
                    <img src={token.profile_picture} className="icon ml-1 rounded-circle" alt="profile " />
                  ) : (
                    <img src={user} className="icon ml-1 rounded-circle" alt="profile"
                     />
                  )}
                </Col>
                <Col xs={12}
               >

                  <div className={"user_name mw-100 m-0"}
             
                  >
                    {token?.full_name ? token?.full_name : "user_33892"}
                  </div>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
     
    </Navbar>
  );
};
