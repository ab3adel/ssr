import Form from "react-bootstrap/Form";
import "./text.scss";
import { useTranslation } from "react-i18next";
import { iText } from "../../interface";
import { useEffect } from "react";

export const TextArea = ({
  setValue,
  name,
  error,
  touched,
  value,
  handleBlur,
  label,
}: iText) => {
  const { t, i18n } = useTranslation();
  const handleChange = (e: React.ChangeEvent) => {
    let input = e.target as HTMLInputElement;
    let obj = { en: input.value, ar: input.value };
    setValue(name, obj);
  };

  return (
    <div className="floatedText">
      {label && (
        <div
          className={"label float"}
          style={
            i18n.language === "en"
              ? { right: "auto", left: "1rem" }
              : { left: "auto", right: "1rem" }
          }
        >
          {label}
        </div>
      )}
      <Form.Control
        style={
          i18n.language === "en" ? { direction: "ltr" } : { direction: "rtl" }
        }
        className="input"
        as="textarea"
        placeholder={label}
        rows={3}
        size={"lg"}
        onChange={handleChange}
        isInvalid={error && (error["en"] || error["ar"]) && touched}
        onBlur={handleBlur}
        name={name}
        value={i18n.language === "en" ? value.en : value.ar}
      />
      {error && touched && <span className="invalid"> {error}</span>}
    </div>
  );
};
