import * as Yup from "yup";
import { getI18n } from "react-i18next";
let lang = 'en'
if (localStorage.getItem('lang')) {

  lang=localStorage.getItem('lang') as string
}

export const SignupSchema = (isUser: boolean, needCategory = true) =>
  Yup.object().shape({
    full_name: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
    email: isUser
      ? Yup.string()
      : Yup.string(),
    phone_numbers: Yup.array().of(
      Yup.object().shape({
        phone: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
        internationl_code: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
      })
    ),
    password: Yup.string()
      .min(8, lang==='en'?"Password must be at least 8 characters":"كلمة السر 8 أحرف على الأقل")
      .max(255)
      .required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
    password_confirmation: Yup.string()
      .required(lang==='en'?"This field is required":"هذا الحقل مطلوب")
      .oneOf(
        [Yup.ref("password"), null],
        lang==='en'?"Passowrd Confirmation doesn't match":
        "مطابقة كلمة السر خاطئة"
      ),
    area_id: !isUser?
    Yup.number()
      .min(0, lang==='en'?"This field is required":"هذا الحقل مطلوب")
      .required(lang==='en'?"This field is required":"هذا الحقل مطلوب"):
      Yup.number()
      ,
    profile_picture: isUser
      ? Yup.mixed()
      : Yup.mixed(),
    website: isUser
      ? Yup.string().url().notRequired()
      : Yup.string()
          .url(lang==='en'?"This field must be a valid url":"ادخل رابط صالح رجاءا"),
    category_ids: !isUser
      ? needCategory
        ? Yup.array()
            .of(Yup.number())
            .min(1, lang==='en'?"You have to choose category":"اختر صنف رجاءا")
            .required(lang==='en'?"This field is required":"هذا الحقل مطلوب")
        : Yup.array().of(Yup.number()).notRequired()
      : Yup.array().notRequired(),
    description: isUser
      ? Yup.object().nullable().notRequired()
      : Yup.object()
          .shape({
            ar: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
            en: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
          })
          .required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
  });

export const AddPostSchema = (role_id: number) =>
  Yup.object().shape({
    title: Yup.object()
      .shape({ ar: Yup.string().required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      , en: Yup.string().required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب") })
      .required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب"),
    area_id: Yup.number().required(
      lang === "en" ? "This field is required" : "هذا الحقل مطلوب"
    ),
    property_type_id:
      role_id === 3
        ? Yup.number().required(
            lang === "en" ? "This field is required" : "هذا الحقل مطلوب"
          )
        : Yup.number().notRequired(),
    offer_type_id:
      role_id === 3
        ? Yup.number().required(
            lang === "en" ? "This field is required" : "هذا الحقل مطلوب"
          )
        : Yup.number().notRequired(),
    price_type_id:
      role_id === 3
        ? Yup.number().required(
            lang === "en" ? "This field is required" : "هذا الحقل مطلوب"
          )
        : Yup.number().notRequired(),
    property_site_id:
      role_id === 3
        ? Yup.number()
        : Yup.number().notRequired(),
    category_id:
      role_id !== 3
        ? Yup.number().required(
            lang === "en" ? "This field is required" : "هذا الحقل مطلوب"
          )
        : Yup.string().nullable(),
    tags_ids: Yup.array().max(
      3,
      lang === "en"
        ? "you can select 3 tags at most"
        : "يمكنك اختيا 3 تاغات على الاكثر"
    ),
   
    description:
      Yup.object().shape({ ar: Yup.string().min(1)
        , en: Yup.string().min(1) }) 
       
    ,
    location_link:
      role_id === 3
        ? Yup.string()
            .url()
            
        : Yup.number().notRequired(),
    space:
      role_id === 3
        ? Yup.number()
            .min(
              0,
              lang === "en"
                ? "only positive numbers are accepted"
                : "الأرقام الموجبة فقط مقبولة"
            )
          
        : Yup.number().notRequired(),
    price: Yup.number()
      .min(0)
     ,
    number_of_rooms:
      role_id === 3
        ? Yup.number()
            .min(
              0,
              lang === "en"
                ? "only positive numbers are accepted"
                : "الأرقام الموجبة فقط مقبولة"
            )
            
        : Yup.number().notRequired(),
    number_of_bathrooms:
      role_id === 3
        ? Yup.number()
            .min(
              0,
              lang === "en"
                ? "only positive numbers are accepted"
                : "الأرقام الموجبة فقط مقبولة"
            )
            
        : Yup.number().notRequired(),
    phone_numbers:Yup.array().min(1,lang === "en" ? "This field is required" : "هذا الحقل مطلوب").of(
      Yup.object().shape({
        phone:Yup.string().required( lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      })
    )    
  });
export const  editCompanyProfileSchema =()=>
  Yup.object().shape({
    website:Yup.string().url(lang==='en'?"Please enter valid URL":"أدخل رابط صالح من فضلك !"),
    full_name:Yup.string().min(3,lang==='en'?'Your full name is too short':'الاسم الكامل قصير جدا'),
    email:Yup.string().email(lang==='en'?'Enter valid email,please!':"ادخل ايميل صالح من فضلك !"),
  
  })
