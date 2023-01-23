import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import chat from "../../images/post-details/chat-icon.svg";
import call from "../../images/post-details/call-icon.svg";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { getLocalStorage } from "../tools/getLocalstorage";
import { useNavigate } from "react-router-dom";
import notificationContext from "../tools/context/notification/notification-context";
import { PhoneVibrate, Whatsapp } from "react-bootstrap-icons";
import { getTime } from "../tools/getTime";
export const FixedSection = ({
  post,
  mobileView,
}: {
  post: any;
  mobileView: boolean;
}) => {
  const { i18n, t } = useTranslation();
  let [style, setStyle] = useState({});
  const { setNotify } = useContext(notificationContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (mobileView) {
      setStyle(() =>
        i18n.language === "en"
          ? { left: "auto", top: "1rem", right: "auto" }
          : { left: "auto", top: "1rem", right: "auto" }
      );
    } else {
      setStyle((pre) =>
        i18n.language === "en"
          ? { ...pre, right: "1rem", top: "1rem", left: "auto" }
          : { ...pre, right: "auto", top: "1rem", left: "1rem" }
      );
    }
  }, [i18n.language, mobileView]);
  const handleChat = () => {
    if (
      getLocalStorage() &&
      getLocalStorage().id &&
      getLocalStorage().id !== "Guest"
    ) {
      if (post.user_id) {
        navigate("/messages", {
          state: {
            action: "create-chat",
            body: { user_1: getLocalStorage().id, user_2: post.user_id },
          },
        });
      }
    } else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: "info",
        message: "You have to login first !",
      }));
    }
  };
  const callPhone = () => {
    let ele = document.querySelector("#call") as HTMLAnchorElement;
    ele.click();
  };
  const callWhatsapp = (ele: string) => {
   
    let text =i18n.language==='en'?
    `I am interested in this offer ${post.title.en}`:
    `أنا مهتم بهذا العرض ${post.title.ar}`
    window.open(`https://wa.me/${ele}/?text=${text}`);
  };
  return (
    <Col sm={4} xs={12} className="fixedSection p-sm-1 p-0" style={style}>
      <Card className="p-sm-2 p-0">
        <Row className="gy-3 p-2 ">
          <Col xs={12} className="fw-bold fs-lg-5 d-none">
            {t("PropertyInformation")}
          </Col>
          {false && (
            <>
              <Col lg={5} xs={6} className="fw-bold">
                {t("Type")}
              </Col>
              <Col lg={4} xs={6}>
                <div className="tag grey">
                  {i18n.language === "en"
                    ? post.offer_type.en
                    : post.offer_type.ar}
                </div>
              </Col>
            </>
          )}
          {false && (
            <>
              <Col lg={5} xs={6} className="fw-bold">
                {t("Purpose")}
              </Col>
              <Col lg={4} xs={6}>
                <div className="tag grey">
                  {i18n.language === "en"
                    ? post.price_type.en
                    : post.price_type.ar}
                </div>
              </Col>
            </>
          )}
          <Col lg={5} xs={6} className="fw-lg-bold ">
            {t("AddedOn")}
          </Col>
          <Col lg={4} xs={6} className="">
            <div className="tag grey">{getTime(post.updated_at)}</div>
          </Col>
          {false && (
            <>
              <Col lg={5} xs={6} className="fw-lg-bold">
                {t("PACIID")}
              </Col>
              <Col lg={4} xs={6}>
                <div className="tag grey">{post.PACIID ? post.PACIID : ""}</div>
              </Col>
            </>
          )}
          {/* {<>
           <Col lg={5} xs={6} className="fw-bold">
             {t('Direction')}
           </Col>
           <Col lg={4} xs={6}>
             <div className="tag grey">North West</div>
           </Col>
           </> */}
{!post.news_type &&
(
<>
          <Col xs={12} className="fw-lg-bold fs-lg-5">
            {t("ContactOwners")}
          </Col>
          <Col xs={12}>
            <Row className="gy-1">
              {post.phone_numbers && post.phone_numbers.length > 0
                ? post.phone_numbers.map((ele: any, index: number) => (
                    <Col xs={12} key={index}>
                      <Row>
                        <Col xs={5}>
                          <span className="phone-number">{ele.phone}</span>
                        </Col>
                        <Col xs={3} className="callContainer">
                          <div
                            className="call"
                            onClick={() => callPhone()}
                            style={{ cursor: "pointer" }}
                          >
                            <PhoneVibrate className="mx-1" />
                            <span>Call</span>
                            <a href={`tel:${ele.phone}`} id="call" />
                          </div>
                        </Col>
                        <Col xs={4} className="callContainer">
                          <div
                            className="call"
                            onClick={() => callWhatsapp(ele.phone)}
                            style={{ cursor: "pointer" }}
                          >
                            <Whatsapp className="mx-1" />
                            <span>Whatsapp</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  ))
                : ""}
            </Row>
          </Col>
  </>  )}        
        </Row>
        <Col
          xs={0}
          sm={12}
          className="mt-4 p-1 d-none d-sm-block justiyf-content-center"
        >
          {!post.news_type && (
            <Col
              xs={9}
              className="chatBtn mx-auto "
              onClick={() => handleChat()}
            >
              <img src={chat} />
              <span>{t("Chat")}</span>
            </Col>
          )}
        </Col>
      </Card>
    </Col>
  );
};
