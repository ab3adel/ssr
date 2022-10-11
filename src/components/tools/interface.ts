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
export interface iGetPosts {
  page:number
  ,post_id?:number
  ,user_id?:number
  ,company_id?:number
  ,text?:string
  ,area_id?:number,
  category_id?:number,
  tag_id?:number,
  price_from?:number,
  price_to?:number,
  property_type_id?:number,
  offer_type_id?:number,
  price_type_id?:number,
  property_site_id?:number,
  area_from?:number,
  area_to?:number,
  number_of_room?:number,
  number_of_bathroom?:number
}
export interface iPost {
  title:{en:string,ar:string},
  username:string,
  area:{en:string,ar:string},
  currency:{en:string,ar:string},
  images:[{path:string,file_name:{en:string,ar:string}}],
  main_property_type?:{en:string,ar:string},
  offer_type?:{en:string,ar:string},
  price_type?:{en:string,ar:string},
  profile_picture?:string,
  property_site?:{en:string,ar:string},
  property_type?:{en:string,ar:string},
  role:{ar:string,en:string},
  tags?:[{name:{en:string,ar:string},}]
  number_of_rooms?:number,
  number_of_bathrooms?:number,
  price:string,
  id:number,
  likes:number


}