import { number, string } from "yup";

export interface iInput {
  icon?: any;
  label: string;
  className?: string;
  id?: string;
  name: string;
  onChange?: Function;
  value?: string | undefined;
  handleBlur?: any;
  error?: string;
  touched?: boolean;
  type: string;
  required: boolean;
  unit?: string;
  numberControl?: boolean;
  setValue?: Function;
  phoneNumber?: boolean;
  add?: Function;
  reset?:Function,
  disabled?:boolean
}
export interface iOption {
  name?: string;
  value?: string | number;
  title?:{en:string,ar:string},
  id?:number
}
export interface iValue {
  en:string,
  ar:string
}

export interface iSelect {
  label: string;
  options?: iOption[] ;
  setSelect?: Function;
  handleBlur?: Function;
  error?: string;
  touched?: boolean;
  name?: string;
  tempSelect?: Function;
  multiSelect?: boolean;
  selectedValue?:any
}
export interface iText {
  value: any;
  error?: any;
  touched?: boolean;
  setValue: Function;
  name: string;
  handleBlur: any;
  label?: string;
}

export interface iToken {
  token:string,
  role:number,
  full_name:string,
  refresh_token:string,
  profile_picture:string


}