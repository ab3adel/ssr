
interface iPhonNumbers {phone:string ,international_code:string }
interface iFile {name:{ar:string,en:string},file:string}
export interface iDescriptionError {ar?:string,en?:string}
export const initialValues=[
    {
        full_name:'',
        email:'',
        role_id:2,
        area_id:2,
        password:'',
        password_confirmation:'',
        phone_numbers:[
            {
                phone:'',
                international_code:''
            }
        ]
       
    },
    {
        country:0,
        full_name:'',
        email:'',
        role_id:0,
        area_id:-1,
        password:'',
        password_confirmation:'',
        phone_numbers:[{phone:'',international_code:''}]
       ,category_ids:[]
       ,profile_picture:''
       ,latitude:''
       ,longitude:''
       ,description:{ar:'',en:''}
       ,files:[]
       ,predefined_post_pictures:[]
       ,website:''
       ,facebook:''
       ,twitter:''
       ,snapchat:''
       ,tiktok:''
       ,youtube:''
       ,instagram:''
       ,PACID:''
       ,flat:''
       ,floor:''
       ,building:''
       ,street:''
       ,avenue:''
       ,block:''
       
    },
    {
        full_name:'',
        email:'',
        role_id:7,
        area_id:2,
        password:'',
        password_confirmation:'',
        phone_numbers:[
            {
                phone:'',
                international_code:''
            }
        ],
    description:{ar:'',en:''}
    ,profile_picture:''
    }
]

export interface InitialValues{
    full_name:string,
    email:string,
    role_id:number,
    area_id:number,
    password:string,
    password_confirmation:string,
    phone_numbers: iPhonNumbers[]
   ,category_ids:number []
   ,profile_picture:string
   ,latitude:string
   ,longitude:string
   ,description:{ar:string,en:string}
   ,files: iFile []
   ,predefined_post_pictures: any []
   ,website:string
   ,facebook:string
   ,twitter:string
   ,snapchat:string
   ,tiktok:string
   ,youtube:string
   ,instagram:string
   ,PACID:string
   ,flat:string
   ,floor:string
   ,building:string
   ,street:string
   ,avenue:string
   ,block:string
   ,country:number
}

export interface iPhoneNumbersError {phone?:string ,international_code?:string}
type iFileError= {[key in keyof iFile]?:string}
interface iPhoneNumbersTouched {phone?:boolean,international_code?:boolean}
type iFileTouched = {[key in keyof iFile]:boolean}
export type iErrors = {[key in keyof InitialValues]:string | undefined |iPhoneNumbersError[] | iFileError | iDescriptionError }
export type iTouched ={[key in keyof InitialValues]:boolean | undefined | iPhoneNumbersTouched[] |iFileTouched }