import { iProps } from "../myprofile";
import { Container, Row, Col } from "react-bootstrap";
import { Tab } from "../../tools/tab";
import { UserInfo } from "../views/user";
import { SocialMedia } from "../views/social-media";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { useState } from "react";
import { Posts } from "../views/posts";
import { Data } from "../views/data";
import { GreenButton } from "../../tools/buttons/green-button";
import { FollowersFollowing } from "../views/followers-following";
import {PublicProfileProps} from '../public-profile'
export const CompanyPublicProfile = ({t,lang}:PublicProfileProps) => {
  let company = true;

  let [tabIndex, setTabIndex] = useState(0);
  const [posts,setPosts]=useState([])
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
          className={`fixedPart  bg-profile flex-column justify-content-between${
            company ? "" : "py-2"
          }`}
        >
          <Row className="gy-5 justify-content-center">
            <Col xs={12}>
              <Col xs={12}>
                <UserInfo company={company} edit={false} t={t} />
              </Col>
              <Row className="mt-2 justify-content-center d-flex gy-1 ">
                <Col xs={5}>
                  <GreenButton label="Follow" />
                </Col>
                <Col xs={9}>
                  <FollowersFollowing company={true} t={t} />
                </Col>
              </Row>
            </Col>

            <Col xs={12}>
              <SocialMedia
                values={formik.values}
                handleChange={formik.handleChange}
                t={t}
              />
            </Col>
            <Col xs={12}></Col>
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
                  sm={5}
                  xs={12}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={5}
                  xs={12}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Posts")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Info company={true} edit={false} 
                setFieldValue={formik.setFieldValue}
                handleBlur={formik.handleBlur}
                publicProfile={true}  t={t}
                lang={lang}
                handleChange={formik.handleChange}
                />
                <Posts posts={posts} />
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
          <Row className="gy-2">
            <Col xs={12}>
              <UserInfo company={company} edit={false} t={t} />
            </Col>

            <Col xs={12} className="mt-2 ">
              <Row className="justify-content-center gy-2">
                <Col xs={5}>
                  <GreenButton label="Follow" />
                </Col>
                <Col xs={10}>
                  <FollowersFollowing company={true} t={t}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={8} xs={12} className="  py-sm-3 pb-5 pb-sm-3 ">
          <Row className="gy-3">
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  xs={6}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("Posts")}
                </Col>
                <Col
                  xs={6}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Info")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Posts posts={posts}/>
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <Info
                        company={company}
                        edit={false}
                        publicProfile={true}
                        t={t}
                        setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={formik.handleChange}
                      />
                    </Col>
                    <Col xs={12} className="px-0 py-2">
                      <Row>
                        <Col
                          xs={12}
                          className="fw-bold d-flex justify-content-center"
                        >
                          {t("SocialMediaAccounts")}
                        </Col>
                        <Col xs={12} className="px-0 ">
                          <SocialMedia
                            values={formik.values}
                            handleChange={formik.handleChange}
                            t={t}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
