import {
  iErrors,
  iPhoneNumbersError,
  iTouched,
  InitialValues,
  initialValues,
} from "./initial-values";

export const nextBtnControl = (
  touched: Partial<iTouched>,
  errors: Partial<iErrors>,
  title: string,
  setDisableNext: Function,
  tab: number,
  values:Partial<InitialValues>,
  setFieldError=(val:string,val1:string)=>{}
) => {
  if (title === "User") {
    if (Object.keys(touched).length === 0) return;

    let {
      full_name,
      email,
      phone_numbers,
      password,
      password_confirmation,
      area_id,
    } = errors;
    let phone = null;

    if (tab === 0) {
      if (phone_numbers && (phone_numbers as Array<any>).length > 0) {
        phone = (phone_numbers as iPhoneNumbersError[])[0].phone;
      }

      if (Boolean(full_name) || Boolean(email) || Boolean(phone)) {
       
        setDisableNext(true);
      } else {
        setFieldError('password','')
        setFieldError('password_confirmation','')
        setDisableNext(false);
      }
    }
    if (tab === 1) {
      if (Boolean(password) || Boolean(password_confirmation) 
      || !Boolean(values.password)  || !Boolean(values.password_confirmation) ) {
        setDisableNext(true);

      } else {
        setFieldError('area_id','')
        setDisableNext(false);
      }
    }
    if (tab === 2) {
      if (Boolean(area_id) ) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
    }
  } else {
    let {
      full_name,
      email,
      phone_numbers,
      password,
      password_confirmation,
      area_id,
      role_id,
      category_ids,
      profile_picture,
      website,
      description,
    } = errors;
    let phone = null;
    if (tab === 0 && Object.keys(touched).length >0) {
      if (phone_numbers && (phone_numbers as Array<any>).length > 0) {
        phone = (phone_numbers as iPhoneNumbersError[])[0].phone;
      }
 

      if (
        Boolean(full_name) ||
        Boolean(role_id) ||
        (category_ids && (category_ids as Array<any>).length > 0) ||
        Boolean(phone) ||
        Boolean(website)
      ) {
        setDisableNext(true);
      } else {
        setFieldError('area_id','')
        setDisableNext(false);
      }
    }
    if (tab === 1) {
      if (Boolean(area_id || !Boolean(values.area_id))) {
        setDisableNext(true);
      } else {
        setFieldError('password','')
        setFieldError('password_confirmation','')
        setDisableNext(false);
      }
    }
    if (tab === 2) {
      if (Boolean(password) || Boolean(password_confirmation) || !Boolean(values.password) || !Boolean(values.password_confirmation)) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
    }
    if (tab === 3) {
      if (Boolean(description)) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
    }
  }
};
