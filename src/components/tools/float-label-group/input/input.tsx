import "./input.scss";

import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { iInput } from "../../interface";
var regex = /^[a-zA-Z]+$/;
export const Input = ({
  touched,
  error,
  value,
  label,
  name,
  onChange,
  handleBlur,
  unit,
  type,
  numberControl = false,
  setValue,
  phoneNumber = false,
  add,
  reset
}: Partial<iInput>) => {
  const { i18n, t } = useTranslation();
  const [flaot, setFloat] = useState(false);

  const checkTyping = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === "") {
      setFloat(false);
    }
  };
  const focused = () => {
    setFloat(true);
  };
  const changeChecker = (e: React.ChangeEvent) => {
    if (type === "number") {
    
      if ((e.target as HTMLInputElement).value !== "") {
        if ((e.target as HTMLInputElement).value.match(/^-?\d+$/)) {
          if (typeof(onChange)=== 'function'){

            onChange(e);
          }
        }
        return;
      } else {
        if (typeof(onChange)=== 'function'){

          onChange(e);
        }
      }
    }
    if (typeof(onChange)=== 'function'){

      onChange(e);
    }
  };
  const controlNumber = (str: string) => {
    if (type === "number") {
      if (value !== "" && typeof value !== "undefined") {
        let num = parseInt(value);
        let newVal = num + 1;
        if (str === "sub") {
          newVal = num - 1;
        }
        if (typeof setValue === "function") {
          setValue(name, newVal);
        }
      }
    }
  };
  const fun = () => {
    if (typeof add === "function" && value) {
      add(value);
      if (typeof (reset) === 'function') {
        reset()
      }
    }
  };
  let compClass = "customInput";
  if (phoneNumber) {
    compClass = compClass + " phoneNumber";
  }
  if (numberControl && !phoneNumber) {
    compClass = compClass + " withControlNumber";
  }
  if (unit && !numberControl && !phoneNumber) {
    compClass = compClass + " withUnit";
  }

  return (
    <Form.Group className="floatedInput" onClick={focused} onBlur={checkTyping}>
      <div
        className={"label float"}
        style={i18n.language === "en" ? { left: "1rem" } : { right: "1rem" }}
      >
        {label}
      </div>
      {!phoneNumber && numberControl && (
        <span
          className="numberControl sub"
          onClick={() => controlNumber("sub")}
        >
          -
        </span>
      )}
      <Form.Control
        type={"text"}
        className={compClass}
        onInput={focused}
        value={value}
        onChange={changeChecker}
        name={name}
        onBlur={handleBlur}
        placeholder={label}
        maxLength={type === 'number'?20:undefined}
        style={
          !numberControl
            ? unit
              ? i18n.language === "en"
                ? { paddingRight: "2.588em",paddingLeft:'1em' }
                : { paddingLeft: "2.588em" ,paddingRight:'1em' }
              : {}
            : {}
        }
      />
      {!numberControl && unit && <div className="unit"  style={i18n.language === "en" ? { right: "1rem" ,left:'auto'} : { left: "1rem" ,right:'auto'}}>{unit}</div>}
      {!phoneNumber && numberControl && (
        <span
          className="numberControl plus"
          onClick={() => controlNumber("add")}
        >
          +
        </span>
      )}
      {phoneNumber && (
        <button
          style={i18n.language === "en" ? { right: "1rem" ,left:'auto'} : { left: "1rem" ,right:'auto'}}
          className=" addBtn"
          onClick={fun}
        >
          {t("Add")}
        </button>
      )}
      {touched && error && (
        <Form.Control.Feedback
          style={i18n.language === "en" ? { left: "40%" } : { right: "40%" }}
        >
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
