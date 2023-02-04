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
import { Spinner } from "../../tools/spinner";
import Form from 'react-bootstrap/Form'
import { PhoneInput } from "../../tools/phone-input/phoneInput";
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
      phone_numbers:[{international_code:'',phone:''}]
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(i18n.language==='en'?
      "This field is required":'هذا الحقل مطلوب'),
      password: Yup.string().min(
        8,
        i18n.language==='en'?
        "This field has to be 8 characters at least":
        "هذا الحقل على الأقل 8 أحرف"
      ),
    }),
    onSubmit: () => {},
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
    setIsloading(true)
    let formdata = new FormData();
    let number_test= new RegExp (/^\d+$/)
    // var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    // if (!mailFormat.test(formik.values.email)) {
    //   formik.setFieldError('email','Email/Phonenumber is not valid ')
    //   return
    // }
    if (number_test.test(formik.values.email)){

      formdata.append("phone", formik.values.email);
    }
    else {
      formdata.append("email", formik.values.email);
    }
    formdata.append("password", formik.values.password);
    formdata.append("remember_me", "1");
    formdata.append('locale',i18n.language)
    axios
      .post(apis.login, formdata)
      .then((res: any) => {
        setIsloading(false)
    
        if (res && res.data) {

         
          let realImage = "";
          if (res.data.payload.profile_picture) {
            realImage = res.data.payload.profile_picture
              .split("")
              .slice(7)
              .join("");
          }
          let required_data = {
            token: res.data.payload.token,
            full_name: res.data.payload.full_name,
            refresh_token: res.data.payload.refresh_token,
            role: res.data.payload.roles[0].id,
            profile_picture: realImage
              ? "https://backend.instaaqar.com/storage/" + realImage
              : null,
            phone_numbers: res.data.payload.phone_numbers,
            id: res.data.payload.id,
            categories:res.data.payload.company?.categories,
            forgot_password:res.data.payload.forgot_password

          };

          setNotify((pre: any) => ({
            ...pre,
            show: true,
            type: true,
            message: t(res.data.message),
          }));
      
          localStorage.setItem("token", JSON.stringify(required_data));
          setToken((pre: any) => ({ ...pre, ...required_data }));
          formik.resetForm();
          if (res.data.payload.forgot_password) {
            navigate('/profile',{state:{open_forgot_password:true}})
          }
          else {

            navigate("/");
          }
       
         
        }
      })
      .catch((err) => {
        setIsloading(false)
        if (err && err.response && err.response.data) {
          
          if (err.response.data.error){

            setNotify((pre: any) => ({
              ...pre,
              message: err.response.data.error,
              type: false,
              show: true,
            }));
          }
          if (err.response.data.errors) {
            
              setNotify((pre: any) => ({
                ...pre,
                message: err.response.data.message,
                type: false,
                show: true,
              }));
            
          }
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
            { false &&
             <Form className="login-switch "
           >
                  <Form.Check 
                   style={{direction:i18n.language==='en'?'ltr':'rtl'}}
                    type="switch"
                    id="custom-switch"
                    label={i18n.language==='en'?'Login using Email':"تسجيل الدخول باستخدام الايميل"}
                  />
              </Form>
                  }
              </Col>
              <Col xs={12}>
           
                  {false ?
                  <PhoneInput
                  phone={
                    formik.values.phone_numbers ? formik.values.phone_numbers[0].phone : ""
                  }
                  internationalCode={
                    formik.values.phone_numbers
                      ? formik.values.phone_numbers[0].international_code
                      : ""
                  }
                  setValue={formik.setFieldValue as Function}
                  phoneNumberError={
                    formik.errors.phone_numbers &&
                    (formik.errors.phone_numbers as []).length > 0
                      ? (formik.errors.phone_numbers as any[])[0].phone
                      : ""
                  }
              
                  handleBlur={formik.setFieldTouched}
                />
                  :
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
                    required={true}
                  />
                  }
           
                <Col xs={12} className='my-1'>
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
                    required={true}
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
                      {
                        isLoading?
                        <Spinner />:
                      t("Login")
                      }
                    </Button>
                  </Col>
                  <Col xs={6} className="d-sm-flex justify-content-end">
                    <Button
                      className="singupBtn"
                      onClick={() => setLogin(false)}
                      disabled={isLoading}
                    >
                      {t("SignUp")}
                    
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
