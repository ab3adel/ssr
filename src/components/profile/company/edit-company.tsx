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

export const EditCompanyProfile = ({ edit, setEdit }: iProps) => {
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
              <UserInfo company={company} edit={edit} />
            </Col>
            <Col xs={10}>
              <GreenButton label={"Save Changes"} fun={() => setEdit(false)} />
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
                  Personal Info
                </Col>
                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  Location
                </Col>

                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                  Data
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Row>
                  <Info company={false} edit={edit} />
                  <SocialMedia
                    values={formik.values}
                    handleChange={formik.handleChange}
                    edit={edit}
                  />
                </Row>
                <Location />
                <Data />
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
              <UserInfo company={company} edit={edit} />
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
                  Personal Info
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  Location
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                  Data
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Location />
                <Info company={company} edit={edit} />
                <Data />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
