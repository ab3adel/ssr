import "./input.scss";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import see from "../../../images/auth/eye.svg";
import unsee from "../../../images/auth/icon-eye.svg";
import { iInput } from "../interface";
export const InputWithIcon = ({
  icon = null,
  label,
  className,
  id,
  name,
  onChange = () => {},
  handleBlur = () => {},
  value = undefined,
  error,
  touched,
  type,
  required,
  height,
}: iInput) => {
  const [tempValue, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { i18n, t } = useTranslation();
  const checkTyping = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === "") {
      setIsTyping(false);
    }
    handleBlur(e);
  };
  const handleChange = (e: React.ChangeEvent) => {
    if (typeof value !== "undefined") {
      let input = e.target as HTMLInputElement;
      onChange(input.name, input.value);
    }
  };
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (Boolean(value)) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [value]);
  return (
    <Form.Group
      className={
        Boolean(error) && touched
          ? `mb-1 is_valid inputGroupWithIcon ${className}`
          : `mb-1 inputGroupWithIcon  ${className}`
      }
      style={{
        padding:
          type === "password"
            ? i18n.language === "en"
              ? "0.5rem 2.9rem 0.5rem 0.1rem"
              : "0.5rem 0.1rem 0.5rem 2.9rem"
            : i18n.language === "en"
            ? "0.5rem 2rem 0.5rem 0.1rem"
            : "0.5rem 0.1rem 0.5rem 2rem",
        height: height ? height : "",
      }}
    >
      <div
        className="inputLabel "
        style={
          i18n.language === "ar"
            ? { right: "5%", justifyContent: "flex-start", left: "auto" }
            : { left: "5%", justifyContent: "flex-end", right: "auto" }
        }
      >
        {!isTyping && (
          <>
            {icon && <img src={icon} className="inputIcon" />}
            <span
              style={i18n.language === "ar" ? { right: "5%" } : { left: "5%" }}
            >
              {label}
            </span>
            {!required && (
              <span
                style={{
                  right: i18n.language === "ar" ? "5%" : "auto",
                  left: i18n.language === "ar" ? "auto" : "5%",
                }}
                className="mx-1"
              >
                {t("Optional")}
              </span>
            )}
          </>
        )}
      </div>

      <Form.Control
        className={"input"}
        onInput={() => setIsTyping(true)}
        onBlur={checkTyping}
        id={id}
        name={name}
        onChange={handleChange}
        value={typeof value !== "undefined" ? value : tempValue}
        type={showPassword ? "text" : type}
        style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
        onFocus={() => setIsTyping(true)}
        required={required}
        
      />
      {touched && error && (
        <Form.Control.Feedback
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            bottom:'-1px'
          }}
        >
          {error}
        </Form.Control.Feedback>
      )}
      {type === "password" && (
        <img
          src={showPassword ? see : unsee}
          className={showPassword ? "passwordIcon see" : "passwordIcon"}
          style={i18n.language === "ar" ? { right: "90%" } : { left: "90%" }}
          onClick={handlePassword}
        />
      )}
    </Form.Group>
  );
};
