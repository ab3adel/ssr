import * as Yup from 'yup'

export const SignupSchema =Yup.object().shape({
    full_name:Yup.string().required("This field is required"),
    email:Yup.string().email().required("This field is required"),
    phone_numbers:Yup.array().of(
        Yup.object().shape(
            {
                phone:Yup.string().required("This field is required"),
                internationl_code:Yup.string().required("This field is required")
            }
        )
    ),
    password:Yup.string().required('This field is Required'),
    password_confirmation:Yup.string().required('This field is Required')
                      .oneOf([Yup.ref('password'),null],"Passowrd Confirmation doesn't match")
})