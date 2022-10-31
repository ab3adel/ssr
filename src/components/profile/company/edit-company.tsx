import { iProps } from "../myprofile";

import { Container, Row, Col } from "react-bootstrap";
import { Tab } from "../../tools/tab";
import { UserInfo } from "../views/user";
import { SocialMedia } from "../views/social-media";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { useState } from "react";

import { Data } from "../views/data";
import { GreenButton } from "../../tools/buttons/green-button";
import { Location } from "../views/location";

export const EditCompanyProfile = ({ edit, setEdit ,t}: iProps) => {
  let company = true;

  let [tabIndex, setTabIndex] = useState(0);
  const formik = useFormik({
    initialValues: {
      twitter: "myTwitter.com",
      facebook: "myFacebook.com",
      youtube: "myYoutube.com",
      snapchat: "mySnapchat.com",
      tiktok: "myTiktok.com",
      instagram: "myInstagram.com",
      description: "",
    },
    onSubmit: () => {},
  });
  return (
    <Container className="p-1 ">
      <Row className="justify-content-evenly d-none d-sm-flex">
        <Col
          sm={3}
          xs={12}
          className={`fixedPart  bg-profile flex-column justify-content-between`}
        >
          <Row className="gy-3 justify-content-center">
            <Col xs={12}>
              <UserInfo company={company} edit={edit} t={t}/>
            </Col>
            <Col xs={10}>
              <GreenButton label={t("SaveChanges")} fun={() => setEdit(false)} />
            </Col>
          </Row>
        </Col>
        <Col
          sm={8}
          xs={12}
          className="scrollablePart bg-profile py-sm-3 pb-5 pb-sm-3 "
        >
          <Row>
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Location")}
                </Col>

                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                 {t("Data")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Row>
                  <Info company={false} edit={edit} t={t} />
                  <SocialMedia
                    values={formik.values}
                    handleChange={formik.handleChange}
                    edit={edit}
                    t={t}
                  />
                </Row>
                <Location t={t} />
                <Data t={t} />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Mobile View */}
      <Row
        className="justify-content-evenly d-flex d-sm-none mobileViewScroll gy-3 bg-profile"
        style={{ height: "fit-content" }}
      >
        <Col sm={3} xs={12} className={`   flex-column`}>
          <Row className="gy-2 justify-content-center">
            <Col xs={12}>
              <UserInfo company={company} edit={edit} t={t}/>
            </Col>

            <Col xs={10}>
              <GreenButton label={"Save Changes"} fun={() => setEdit(false)} />
            </Col>
          </Row>
        </Col>
        <Col sm={8} xs={12} className="  py-sm-3 pb-5 pb-sm-3 ">
          <Row className="gy-3">
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  xs={4}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Location")}
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                 {t("Data")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Location t={t}/>
                <Info company={company} edit={edit} t={t} />
                <Data t={t} />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
