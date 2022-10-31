import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { InputWithIcon } from "../../tools/input/inputIcon";
import userIcon from "../../../images/auth/icon-user.svg";
import lockIcon from "../../../images/auth/icon-lock.svg";
import { useTranslation } from "react-i18next";
import { CheckBox } from "../../tools/checkBox/checkBox";
import Button from "react-bootstrap/Button";
import "./login.scss";
import ForgotPassword from "../forgot-password";
import { useState, useEffect, useContext } from "react";
import axios from "../../tools/apis/axios";
import { apis } from "../../tools/apis/apis";
import { useFormik } from "formik";
import * as Yup from "yup";
import notificationContext from "../../tools/context/notification/notification-context";
import authContext from "../../tools/context/auth-context/auth-context";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
interface iProps {
  setLogin: Function;
}
const Login = ({ setLogin }: iProps) => {
  const { t, i18n } = useTranslation();
  const [disableBtn, setDisableBtn] = useState(true);
  const { notify, setNotify } = useContext(notificationContext);
  const [isLoading, setIsloading] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("This field is required"),
      password: Yup.string().min(
        8,
        "This field has to be 8 characters at least"
      ),
    }),
    onSubmit: () => { },
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Boolean(formik.values.email) && Boolean(formik.values.password)) {
      if (!Boolean(formik.errors.email) && !Boolean(formik.errors.password)) {
        setDisableBtn(false);
      }
    }
  }, [formik.values]);
  const handleLogin = () => {
    let formdata = new FormData();
    formdata.append("email", formik.values.email);
    formdata.append("password", formik.values.password);
    formdata.append("remember_me", "1");
    axios
      .post(apis.login, formdata)
      .then((res: any) => {
        if (res && res.data) {
          let realImage = "";
          if (res.data.payload.profile_picture) {
            let image_array = res.data.payload.profile_picture
              .split("/")
              .map((ele: string) => {
                if (ele === "public") {
                  return "storage";
                }
                return ele;
              });
            realImage = "http://backend.instaaqar.com/" + image_array.join("/");
          }
          let required_data = {
            token: res.data.payload.token,
            full_name: res.data.payload.full_name,
            refresh_token: res.data.payload.refresh_token,
            role: res.data.payload.roles[0].id,
            profile_picture: realImage,
          };

          setNotify((pre: any) => ({
            ...pre,
            show: true,
            type: true,
            message: res.data.message,
          }));
          navigate("/");
          localStorage.setItem("token", JSON.stringify(required_data));
          setToken((pre: any) => ({ ...pre, ...required_data }));
          formik.resetForm();
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setNotify((pre: any) => ({
            ...pre,
            message: err.response.data.message,
            type: false,
            show: true,
          }));
        }
      });
  };
  const rememberMe = (token: string) => {
    let dataform = new FormData();
    dataform.append("remember_me_token", token);
    axios
      .post(apis.rememberMe, dataform)
      .then((res) => res)
      .catch((err) => console.log(err));
  };
  return (
    <Col xs={12} className="loginBody">
      <Col sm={9} xs={12}>
        <Row className="gy-4">
          <Col xs={12}>
            <Row className="gy-5">
              <Col xs={12}>
                <h5 className="title">{t("Login")}</h5>
              </Col>
              <Col xs={12}>
                <Col xs={12}>
                  <InputWithIcon
                    type="text"
                    label={t("UserName")}
                    icon={userIcon}
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    required={false}
                  />
                </Col>
                <Col xs={12}>
                  <InputWithIcon
                    type="password"
                    label={t("Password")}
                    icon={lockIcon}
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    required={false}
                  />
                </Col>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <CheckBox
                      label={t("RememberMe")}
                      checked={checked}
                      setChecked={setChecked}
                    />
                  </Col>
                  <Col
                    xs={6}
                    className="d-flex d-sm-block  align-items-center"
                    style={
                      i18n.language === "en"
                        ? { justifyContent: "flex-end" }
                        : { justifyContent: "flex-start" }
                    }
                  >
                    <div
                      className="forgotPassword"
                      style={
                        i18n.language === "en"
                          ? { textAlign: "right" }
                          : { textAlign: "left" }
                      }
                      onClick={() => setShow(true)}
                    >
                      {t("ForgotPassword")}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Row>
                  <Col xs={6}>
                    <Button
                      className="loginBtn"
                      onClick={() => handleLogin()}
                      disabled={disableBtn}
                    >
                      {t("Login")}
                    </Button>
                  </Col>
                  <Col xs={6} className="d-sm-flex justify-content-end">
                    <Button
                      className="singupBtn"
                      onClick={() => setLogin(false)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner animation="border" />
                      ) : (
                        <>{t("SignUp")}</>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <ForgotPassword show={show} setShow={() => setShow(false)} />
    </Col>
  );
};
export default Login;
