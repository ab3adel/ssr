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
  reset?:Function
}
export interface iOption {
  name: string;
  value: string | number;
}
export interface iSelect {
  label: string;
  options?: iOption[];
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
