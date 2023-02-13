import * as Yup from "yup";

let lang = 'en'
if (localStorage.getItem('lang')) {

  lang=localStorage.getItem('lang') as string
}

export const SignupSchema = (isUser: boolean, needCategory = true,isNews=false) =>
{
 return Yup.object().shape({
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
    website: 
      Yup.string().url().notRequired(),
    // category_ids:  Yup.array()
    //         .of(Yup.number())
    //         .when('role_id',{
    //           is:(value:number)=>value >3 && value <7,
    //           then: Yup.array()
    //           .min(1, lang==='en'?"You have to choose category":"اختر صنف رجاءا")
    //           .required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
    //           otherwise:Yup.array().notRequired()
    //         }),
           
           
    description: isUser || isNews
      ? Yup.object().nullable().notRequired()
      : Yup.object()
          .shape({
            ar: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
            en: Yup.string().required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
          })
          .required(lang==='en'?"This field is required":"هذا الحقل مطلوب"),
  });
}
export const AddPostSchema = (role_id: number) =>
  Yup.object().shape({
    title: role_id === 7?
    Yup.object().shape({ar:Yup.string(),en:Yup.string()}).notRequired():
    Yup.object()
      .shape({ ar: Yup.string().required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      , en: Yup.string().required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب") })
      .required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب"),
    area_id: role_id===7?Yup.number().notRequired().nullable():
    Yup.number().required(
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
      role_id !== 3 && role_id !== 7
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
    role_id===7 ?
    Yup.object().shape({ ar: Yup.string().min(1)
      , en: Yup.string().min(1) }).required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
    :
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
      phone_numbers:role_id===7?
      Yup.array().notRequired().nullable()
      :
      Yup.array().required(lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      .min(1,lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      .of(
      Yup.object().shape({
        phone:Yup.string().required( lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
      })
    )    ,
    images :role_id===7? Yup.array().notRequired():
    Yup.array().min(1,lang === "en" ? "This field is required" : "هذا الحقل مطلوب")
  });
export const  editCompanyProfileSchema =()=>
  Yup.object().shape({
    website:Yup.string().url(lang==='en'?"Please enter valid URL":"أدخل رابط صالح من فضلك !"),
    full_name:Yup.string().min(3,lang==='en'?'Your full name is too short':'الاسم الكامل قصير جدا'),
    email:Yup.string().email(lang==='en'?'Enter valid email,please!':"ادخل ايميل صالح من فضلك !"),
  
  })
export const searchSchema=()=>
  // Yup.object({
  //   priceRange:Yup.object(
  //     {
  //       min:Yup.number()
  //       .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 10000 على الاقل")
  //       .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
  //       ,max:Yup.number()
  //       .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 10000 على الاقل")
  //       .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
  //     }
  //   ).shape( {
  //     min:Yup.number()
  //     .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 10000 على الاقل")
  //     .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
  //    ,max:Yup.number()
  //     .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 10000 على الاقل")
  //     .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
  //   })
  Yup.object ().shape({
    priceRange:Yup.object(
           {
             min:Yup.number()
             .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 1000 على الاقل")
             .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
             ,max:Yup.number()
             .min(1000,lang ==='en'?' minimum number should be at least 1000':"أقل سعر يجب أن يكون 1000 على الاقل")
             .max(100000000,lang==='en'?"maximum number should be at most 100000000":"أعلى سعر يجب أن يكون 100000000 على الأكثر")
           }),
    areaRange:Yup.object({
      min:Yup.number()
      .min(100,lang ==='en'?' minimum number should be at least 100':"أقل مساحة يجب أن يكون 100 على الاقل")
      .max(1000,lang==='en'?"maximum number should be at most 1000":"أعلى مساحة يجب أن يكون 1000 على الأكثر")
      ,max:Yup.number()
      .min(100,lang ==='en'?' minimum number should be at least 100':"أقل مساحة يجب أن يكون 100 على الاقل")
      .max(1000,lang==='en'?"maximum number should be at most 1000":"أعلى مساحة يجب أن يكون 1000 على الأكثر")
    })       
  })
       
  
  
