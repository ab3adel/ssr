import { Container, Row, Col } from "react-bootstrap";
import { iProps } from "../myprofile";
import { UserInfo } from "../views/user";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { FollowersFollowing } from "../views/followers-following";
import { GreenButton } from "../../tools/buttons/green-button";

export const NormalUserProfile = ({ edit, setEdit }: iProps) => {
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
                    <UserInfo company={company} edit={edit} />
                  </Col>
                  {!edit && (
                    <>
                      <Col xs={7}>
                        <FollowersFollowing company={false} />
                      </Col>
                      <Col xs={7}>
                        <GreenButton
                          label={"Edit Profile"}
                          fun={() => setEdit(true)}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col xs={11}>
                {edit ? (
                  <GreenButton
                    label={"Save Changes"}
                    fun={() => setEdit(false)}
                  />
                ) : (
                  <GreenButton label={"Change Password"} />
                )}
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
                edit={edit}
                values={formik.values}
                handleChange={formik.handleChange}
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
                <UserInfo company={company} edit={edit} />
              </Col>
              {edit ? (
                <Col xs={7}>
                  <GreenButton
                    label={"Save Changes"}
                    fun={() => setEdit(false)}
                  />
                </Col>
              ) : (
                <Col xs={7}>
                  <GreenButton
                    label={"Edit Profile"}
                    fun={() => setEdit(true)}
                  />
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={12} className=" py-2   bg-profile h-100vh">
            <Info company={company} edit={edit} />
          </Col>
          <Col xs={12} className="h-20vh bg-profile">
            {edit ? (
              <GreenButton label={"Save Changes"} fun={() => setEdit(false)} />
            ) : (
              <GreenButton label={"Change Password"} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
