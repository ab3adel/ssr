import  Col  from "react-bootstrap/Col";
import  Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { UserInfo } from "../views/user";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { FollowersFollowing } from "../views/followers-following";
import {PublicProfileProps} from '../public-profile'
export const NormalUserPublicProfile = ({t,lang}:PublicProfileProps) => {
  let company = false;
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      email: "",
      country: "",
      area_id: "",
      block: "",
      avenue: "",
      street: "",
      building: "",
      floor: "",
      flat: "",
      PACIID: "",
    },
    onSubmit: () => {},
  });

  return (
    <>
      <Container className="p-1 d-sm-block d-none">
        <Row className="justify-content-evenly">
          <Col
            sm={3}
            xs={12}
            className={`fixedPart bg-profile flex-column justify-content-between py-2 `}
          >
            <Row className="gy-5 justify-content-center">
              <Col xs={12}>
                <Row className="gy-2 justify-content-center">
                  <Col xs={12}>
                    <UserInfo company={company} edit={false} t={t} />
                  </Col>

                  <Col xs={7}>
                    <FollowersFollowing company={false} t={t}/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col
            sm={8}
            xs={12}
            className="scrollablePart  bg-profile py-sm-3 pb-5 pb-sm-3 "
          >
            <Col xs={12}>
              <Info
                company={company}
                edit={false}
                values={formik.values}
                handleChange={formik.handleChange}
                t={t}
                setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
              />
            </Col>
          </Col>
        </Row>
      </Container>

      {/* Mobile View */}

      <Container className="pb-2 d-sm-none d-block px-0">
        <Row className="justify-content-evenly mobileViewScroll ">
          <Col xs={12} className=" bg-profile ">
            <Row className="gy-1 justify-content-center">
              <Col xs={12}>
                <UserInfo company={company} edit={false} t={t} />
              </Col>
              <Col xs={7}>
                <FollowersFollowing company={false} t={t} />
              </Col>
            </Row>
          </Col>
          <Col xs={12} className=" py-2   bg-profile">
            <Info company={company} edit={false} t={t} setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={formik.handleChange}
                     />
          </Col>
          <Col xs={12} className=" bg-profile"></Col>
        </Row>
      </Container>
    </>
  );
};
