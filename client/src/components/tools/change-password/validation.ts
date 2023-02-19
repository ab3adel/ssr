import * as Yup from 'yup'
import {getI18n} from 'react-i18next'
let required_warning=getI18n().language==='en'?'This field is required':'هذالجقل مطلوب'
export const changePasswordSchema= Yup.object().shape({
    new_password:Yup.string().required(required_warning),
    old_password:Yup.string().required(required_warning),
    new_password_confirmation:Yup.string().required(required_warning).oneOf([Yup.ref('new_password'),null],"confirmation dosen't match")
})