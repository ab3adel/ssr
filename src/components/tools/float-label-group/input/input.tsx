import "./input.scss";

import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { iInput } from "../../interface";
import  PhoneNumberComponent,{CountryData} from 'react-phone-input-2'
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
  reset,
  disabled,
  setFieldTouched=()=>{}
}: Partial<iInput>) => {
  const { i18n, t } = useTranslation();
  const [flaot, setFloat] = useState(false);
  const[phoneNumberObj,setPhoneNumberObj]=useState<any>()

  const checkTyping = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === "") {
      setFloat(false);
    }
    if (phoneNumber && typeof(handleBlur)=== 'function') {
      handleBlur(e)
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
  const handlePhoneChange =(value: string, data: {} | CountryData, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string): void=>{
   
    let phone_numbers={phone: value,international_code: (data as CountryData).dialCode}
    setPhoneNumberObj(phone_numbers)
    if (typeof(onChange)==='function') {

      onChange(value)
    }
    
  
}
const handlePhoneBlur=()=>{
  
  setFieldTouched('phone_numbers',true)
}
  const controlNumber = (str: string) => {
    if (disabled) return
    if (type === "number") {
      if ( typeof value !== "undefined") {
        let num =0
        if (value !== '' && !isNaN(parseInt(value)))  num = parseInt(value);
        let newVal = num + 1;
        if (str === "sub") {
          newVal = num - 1;
        }
        if (typeof setValue === "function") {
          if (newVal>=0) {

            setValue(name, newVal);
          }
        }
      }
    }
  };
  const fun = () => {
   
    if (typeof(add) === 'function'){

      add(phoneNumberObj)
      if (typeof(reset) === 'function') {

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
  
if (phoneNumber) {
  console.log(error && touched)
  return (
        <Form.Group className="floatedInput" onClick={focused} onBlur={checkTyping}
        
       >
        <div
          className={"label float"}
          style={i18n.language === "en" ? { left: "1rem",right:'auto',background:disabled?'trasnparent':'' } : { right: "1rem",left:'auto',background:disabled?'trasnparent':'' }}
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
       <PhoneNumberComponent 
       value={value}
       onChange={handlePhoneChange}
       inputStyle={{'direction':i18n.language ==='en'?"ltr":'rtl',padding:i18n.language==='en'?'0 0 0 48px':'0 48px 0 0 '}}
       buttonClass={i18n.language==='en'?'':'arabic'}
       country="kw"
       onBlur={handlePhoneBlur}
       isValid={!(touched && error)}
       />
        
        
    
          <button
            style={i18n.language === "en" ? { right: "1rem" ,left:'auto'} : { left: "1rem" ,right:'auto'}}
            className=" addBtn"
            onClick={fun}
          >
            {t("Add")}
          </button>
        
        {(touched && error) && (
          <Form.Control.Feedback
          className="isValid"
            style={i18n.language === "en" ? { left: "40%",right:'auto' } : { right: "40%" ,left:'auto'}}
          >
            {error}
          </Form.Control.Feedback>
        )}
      </Form.Group>
  )
}

  return (
    <Form.Group className="floatedInput" onClick={focused} onBlur={checkTyping}>
      <div
        className={"label float fw-bold"}
        style={i18n.language === "en" ? { left: "1rem",right:'auto' } : { right: "1rem",left:'auto' }}
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
        className={ (Boolean(error) && touched)?`redBorder ${compClass}`:`${compClass}`}
        onInput={focused}
        value={value}
        onChange={changeChecker}
        name={name}
        onBlur={handleBlur}
        placeholder={!numberControl?label?label:'':'0'}
        maxLength={type === 'number'?20:undefined}
        disabled={disabled}
        isInvalid={Boolean(error) && touched}
        style={
          !numberControl
            ? unit
              ? i18n.language === "en"
                ? { paddingRight: "2.588em",paddingLeft:'1em' }
                : { paddingLeft: "2.588em" ,paddingRight:'1em' }
              : {backgroundPositionX:i18n.language==='en'?'90%':'10%'}
            : {}
        }
        
      />
      {!numberControl && unit && <div className="unit"  style={i18n.language === "en" ? { right: "0.8rem" ,left:'auto'} : { left: "0.8rem" ,right:'auto'}}>{unit}</div>}
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
      {(touched && error) && (
        <Form.Control.Feedback
        className="isValid"
          style={i18n.language === "en" ? { right: "10%",left:'auto' } : { left: "10%",right:'auto' }}
        >
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
