import "./signup.scss";
import AccountVerification from "../account-verification/index";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import User from "../../../images/auth/icon-user.svg";
import Commercial from "../../../images/auth/Icon-business-center.svg";
import UserType from "./user";
import CommercialType from "./commercial";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { PersonalInfoForm } from "./views/personalInfo-form";
import { SecurityForm } from "./views/security-form";
import { LocationForm } from "./views/location-form";
import { nextBtnControl } from "./check-error";
import { useFormik } from "formik";
import { RequiredFilesForm } from "./views/requiredFiltes-form";
import { SignupSchema } from "../../tools/validation";
import axios from "../../tools/apis/axios";
import { apis } from "../../tools/apis/apis";
import notificationContext from "../../tools/context/notification/notification-context";
import {
  initialValues,
  InitialValues,
  iErrors,
  iTouched,
} from "./initial-values";

import { Spinner } from "react-bootstrap";
interface iProps {
  setLogin: Function;
}
interface iPhonNumbers {
  phone: string | number;
  international_code: string | number;
}
export interface iFields {
  full_name: string;
  email: string;
  role_id: number;
  area_id: number;
  password: string;
  password_confirmation: string;
  phone_numbers: iPhonNumbers[];
}

const SignUp = ({ setLogin }: iProps) => {
  const [tab, setTab] = useState(0);
  const [btn, setBtn] = useState({ title: "User", maxTabs: 2 });
  const [show, setShow] = useState(false);
  const [verification, setVerification] = useState({
    emailVerification: "",
    phoneVerification: "",
  });
  const [disableNext, setDisableNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { notify, setNotify } = useContext(notificationContext);
  let [categories, setCategories] = useState({
    data: [],
    categoriesOption: [],
  });
  let [companies, setCompanies] = useState({ data: [], companiesOptions: [] });
  let [selectInitials, setSelectInitial] = useState(initialValues[0]);
  const [validationOptions, setValidationOptions] = useState({
    isUser: true,
    needCategory: false,
    requiredFiles: [],
  });
  const { t, i18n } = useTranslation();

  const formik = useFormik<Partial<InitialValues>>({
    initialValues: selectInitials,
    onSubmit: () => {},
    validationSchema: SignupSchema(
      validationOptions.isUser,
      validationOptions.needCategory
    ),
    enableReinitialize: true,
  });
  const handleClick = (str: string) => {
    if (str === "next") {
      if (tab < btn.maxTabs) {
        setTab((pre) => pre + 1);
      } else {
        setShow(true);
      }
    }
    if (str === "back") {
      if (tab > 0) {
        setTab((pre) => pre - 1);
      }
    }
  };

  let btn1 = "BtnLeft";
  let btn2 = "BtnRight";
  if (i18n.language === "ar") {
    btn1 = "BtnRight";
    btn2 = "BtnLeft";
  }
  const handleBtn = ({
    title,
    maxTabs,
  }: {
    title: string;
    maxTabs: number;
  }) => {
    setTab(0);
    setBtn((pre) => ({ ...pre, title, maxTabs }));
    if (title === "User") {
      formik.setFieldValue("role_id", 2);
    }
  };
  const handleRole = (str: string) => {
    if (str === "User") {
      formik.setFieldValue("role_id", 2);
      handleBtn({ title: "User", maxTabs: 2 });
    } else {
      formik.setFieldValue("role_id", 3);
      handleBtn({ title: "Commercial", maxTabs: 3 });
    }
  };
  const closeAccountVerification = () => {
    formik.resetForm();
    setShow(false);
    setLogin(true);
  };

  const submit = () => {
    let formdata = new FormData();

    if (validationOptions.isUser) {
      formdata.append("full_name", formik.values.full_name as string);
      formdata.append("role_id", JSON.stringify(formik.values.role_id));
      formdata.append("area_id", JSON.stringify(formik.values.area_id));
      formdata.append("password", formik.values.password as string);
      formdata.append(
        "password_confirmation",
        formik.values.password_confirmation as string
      );
      formdata.append("email", formik.values.email as string);
      formdata.append(
        "profile_picture",
        (formik.values.profile_picture as string) || ""
      );
      formdata.append(
        "phone_numbers[0][phone]",
        (formik.values.phone_numbers as Array<any>)[0]["phone"]
      );
      formdata.append(
        "phone_numbers[0][international_code]",
        (formik.values.phone_numbers as Array<any>)[0]["international_code"]
      );
    } else {
      let { category_ids, predefined_post_pictures, files, description } =
        formik.values;
      if (category_ids && category_ids?.length > 0) {
        category_ids.forEach((ele, index) =>
          formdata.append(`category_ids[${index}]`, JSON.stringify(ele))
        );
      }
      if (predefined_post_pictures && predefined_post_pictures.length > 0) {
        predefined_post_pictures.forEach((ele, index) =>
          formdata.append(`predefined_post_pictures[${index}]`, ele)
        );
      }
      if (files && files.length > 0) {
        files.forEach((ele, index) => {
          formdata.append(
            `files[${index}][name][ar]`,
            JSON.stringify(ele["name"]["ar"])
          );
          formdata.append(
            `files[${index}][name][en]`,
            JSON.stringify(ele["name"]["en"])
          );
          formdata.append(`files[${index}][file]`, ele["file"]);
        });
      }
      if (description) {
        formdata.append("description[ar]", description["ar"]);
        formdata.append("description[en]", description["en"]);
      }
      formdata.append("full_name", formik.values.full_name as string);
      formdata.append("role_id", JSON.stringify(formik.values.role_id));
      formdata.append("area_id", JSON.stringify(formik.values.area_id));
      formdata.append("password", formik.values.password as string);
      formdata.append(
        "password_confirmation",
        formik.values.password_confirmation as string
      );
      formdata.append("email", formik.values.email as string);
      formdata.append(
        "phone_numbers[0][phone]",
        (formik.values.phone_numbers as Array<any>)[0]["phone"]
      );
      formdata.append(
        "phone_numbers[0][international_code]",
        (formik.values.phone_numbers as Array<any>)[0]["international_code"]
      );
      formdata.append(
        "profile_picture",
        formik.values.profile_picture as string
      );
      formdata.append("block", formik.values.block as string);
      formdata.append("building", formik.values.building as string);
      formdata.append("avenue", formik.values.avenue as string);
      formdata.append("street", formik.values.street as string);
      formdata.append("floor", formik.values.floor as string);
      formdata.append("flat", formik.values.flat as string);
      formdata.append("PACIID", formik.values.PACID as string);
      formdata.append("website", formik.values.website as string);
      formdata.append("facebook", formik.values.facebook as string);
      formdata.append("twitter", formik.values.twitter as string);
      formdata.append("snapchat", formik.values.snapchat as string);
      formdata.append("titok", formik.values.tiktok as string);
      formdata.append("yuotube", formik.values.youtube as string);
      formdata.append("instagram", formik.values.instagram as string);
    }

    setIsLoading(true);
    axios
      .post(apis.register, formdata)
      .then((res) => {
        setShow(true);
        setIsLoading(false);
        if (res && res.data) {
          setNotify((pre: any) => ({
            ...pre,
            show: true,
            type: true,
            message: res.data.message,
          }));
        }
        formik.resetForm();
      })
      .catch((err) => {
        setIsLoading(false);
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

  const getCompanies = () => {
    let result = axios
      .get(apis.roles)
      .then((res) => {
        let categoriesOption = res.data.payload.slice(1).map((ele: any) => {
          if (i18n.language === "ar") {
            return { name: ele.name.ar, value: ele.id };
          } else {
            return { name: ele.name.en, value: ele.id };
          }
        });
        setCompanies((pre) => ({
          ...pre,
          data: res.data.payload,
          companiesOptions: categoriesOption,
        }));
      })
      .catch((err) => console.log(err));
  };
  const getCategories = () => {
    let result = axios
      .get(apis.categories(1, 5))
      .then((res) => {
        let categoriesOption = res.data.payload.map((ele: any) => {
          if (i18n.language === "ar") {
            return { label: ele.name.ar, value: ele.id };
          } else {
            return { label: ele.name.en, value: ele.id };
          }
        });
        setCategories((pre) => ({
          ...pre,
          data: res.data.payload,
          categoriesOption,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    nextBtnControl(
      formik.touched,
      formik.errors,
      btn.title,
      setDisableNext,
      tab
    );
  }, [tab, formik.values, btn, formik.errors]);
  useEffect(() => {
    if (formik.values.email) {
      let emailVerification = formik.values.email;
      setVerification((pre) => ({ ...pre, emailVerification }));
    }
    if (
      formik.values.phone_numbers &&
      formik.values.phone_numbers.length > 0 &&
      formik.values.phone_numbers[0].phone.length > 0
    ) {
      let number =
        formik.values.phone_numbers[0].international_code +
        formik.values.phone_numbers[0].phone;
      let airstiks = new Array(number.length).fill("*");
      let phoneVerification =
        number[0] +
        number[1] +
        airstiks.slice(0, -4).join("") +
        number[number.length - 2] +
        number[number.length - 1];
      setVerification((pre) => ({ ...pre, phoneVerification }));
    }
  }, [formik.values]);
  useEffect(() => {
    if (formik.values && formik.values.role_id) {
      if (formik.values.role_id === 2) {
        setValidationOptions((pre) => ({ ...pre, needCategory: false }));
      }
      if (formik.values.role_id > 3) {
        setValidationOptions((pre) => ({ ...pre, needCategory: true }));
      }
      companies.data.map((ele: any) => {
        if (ele.id.toString() === formik.values.role_id?.toString()) {
          if (ele.requiredDocuments) {
            setValidationOptions((pre: any) => ({
              ...pre,
              requiredFiles: [...ele.requiredDocuments],
            }));
          }
        }
      });
    }
  }, [formik.values.role_id]);
  useEffect(() => {
    if (btn.title === "User") {
      setSelectInitial(initialValues[0]);
      setValidationOptions((pre) => ({ ...pre, isUser: true }));
    } else {
      setSelectInitial(initialValues[1]);
      setValidationOptions((pre) => ({ ...pre, isUser: false }));
    }
  }, [btn]);
console.log(formik.errors)
  return (
    <Row className="signUpContainer gy-3">
      <Col xs={12}>
        <Row className="gy-3">
          <Col xs={12}>
            <div className="title">{t("SignUp")}</div>
          </Col>
          <Col xs={12} className="overlappedBtns">
            <div className="Btns">
              <Button
                className={
                  btn.title === "User"
                    ? `BtnActive ${btn1} Btn`
                    : ` ${btn1} Btn BtnInactive`
                }
                onClick={() => handleRole("User")}
              >
                <img className="icon" src={User} />
                <span>{t("User")}</span>
              </Button>
              <Button
                className={
                  btn.title === "Commercial"
                    ? `BtnActive ${btn2} Btn`
                    : `${btn2} Btn BtnInactive`
                }
                onClick={() => handleRole("Commercial")}
              >
                <img className="icon" src={Commercial} />
                <span>{t("Commercial")}</span>
              </Button>
            </div>
          </Col>
          <Col xs={12}>
            {btn.title === "User" ? (
              <UserType tab={tab}>
                <SecurityForm
                  values={formik.values}
                  handleBlur={formik.handleBlur}
                  setValue={formik.setFieldValue}
                  touched={formik.touched}
                  errors={formik.errors}
                />

                <PersonalInfoForm
                  setValue={formik.setFieldValue}
                  type={"User"}
                  touched={formik.touched}
                  values={formik.values}
                  errors={formik.errors}
                  handleBlur={formik.handleBlur}
                  setFieldTouched={formik.setFieldTouched}
                />

                <LocationForm
                  type="User"
                  touched={formik.touched}
                  values={formik.values}
                  errors={formik.errors}
                  handleBlur={formik.setFieldTouched}
                  setValue={formik.setFieldValue}
                />
              </UserType>
            ) : (
              <CommercialType tab={tab} setTab={setTab}>
                <PersonalInfoForm
                  type={"Commercial"}
                  setValue={formik.setFieldValue}
                  values={formik.values}
                  errors={formik.errors}
                  touched={formik.touched}
                  handleBlur={formik.handleBlur}
                  setFieldTouched={formik.setFieldTouched}
                  getCategories={getCategories}
                  getCompanies={getCompanies}
                  categories={categories}
                  companies={companies}
                  needCategory={validationOptions.needCategory}
                />

                <LocationForm
                  type="Commercial"
                  touched={formik.touched}
                  values={formik.values}
                  errors={formik.errors}
                  handleBlur={formik.handleBlur}
                  setValue={formik.setFieldValue}
                />

                <SecurityForm
                  values={formik.values}
                  handleBlur={formik.handleBlur}
                  setValue={formik.setFieldValue}
                  touched={formik.touched}
                  errors={formik.errors}
                />

                <RequiredFilesForm
                  touched={formik.touched}
                  values={formik.values}
                  errors={formik.errors}
                  handleBlur={formik.handleBlur}
                  setValue={formik.setFieldValue}
                  requiredFiles={validationOptions.requiredFiles}
                  setField={formik.setFieldValue}
                />
              </CommercialType>
            )}
          </Col>
        </Row>
      </Col>
      <Col xs={12} className="signupFooter">
        <Row>
          <Col xs={12}>
            <Row className="Btns">
              <Col sm={4} xs={5}>
                <Button
                  className="next Btn"
                  onClick={() =>
                    tab === btn.maxTabs ? submit() : handleClick("next")
                  }
                  disabled={disableNext || isLoading}
                >
                  {!isLoading ? (
                    tab === btn.maxTabs ? (
                      t("Signup")
                    ) : (
                      t("Next")
                    )
                  ) : (
                    <Spinner animation="border" />
                  )}
                </Button>
              </Col>

              {tab > 0 ? (
                <Col sm={4} xs={5}>
                  <Button
                    className="back Btn"
                    onClick={() => handleClick("back")}
                  >
                    {t("Back")}
                  </Button>
                </Col>
              ) : (
                ""
              )}
            </Row>
          </Col>
          <Col xs={12} className="toLogin">
            <div className="text">
              {t("AlreadyHaveAnAccount")}
              <span onClick={() => setLogin(true)}>{t("Login")}</span>
            </div>
          </Col>
        </Row>
      </Col>
      <AccountVerification
        show={show}
        setShow={closeAccountVerification}
        emailVerification={verification.emailVerification}
        phoneVerification={verification.phoneVerification}
      />
    </Row>
  );
};
export default SignUp;
