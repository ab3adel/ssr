import * as Yup from "yup";

export const SignupSchema = (isUser: boolean, needCategory = true) =>
  Yup.object().shape({
    full_name: Yup.string().required("This field is required"),
    email: isUser
      ? Yup.string().email().required("This field is required")
      : Yup.string().email(),
    phone_numbers: Yup.array().of(
      Yup.object().shape({
        phone: Yup.string().required("This field is required"),
        internationl_code: Yup.string().required("This field is required"),
      })
    ),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(255)
      .required("This field is Required"),
    password_confirmation: Yup.string()
      .required("This field is Required")
      .oneOf(
        [Yup.ref("password"), null],
        "Passowrd Confirmation doesn't match"
      ),
    area_id: Yup.number()
      .min(0, "This Field is required")
      .required("This field is Required"),
    profile_picture: isUser
      ? Yup.mixed()
      : Yup.mixed().required("This field is required"),
    website: isUser
      ? Yup.string().url().notRequired()
      : Yup.string().url('This field must be a valid url').required('This field is required')

          .required("This field is required"),
    category_ids :!isUser ? needCategory ?Yup.array().of(Yup.number()).min(1,'You have to choose category').required('You have to choose category'): 
                    Yup.array().of(Yup.number()).notRequired() :Yup.array().notRequired(),
    description:isUser?Yup.object().nullable().notRequired()
    :
    Yup.object()
         .shape({ar:Yup.string().required('This field is required'),en:Yup.string().required('This field is required')})
          .required('This field is required')           


                    
  });
