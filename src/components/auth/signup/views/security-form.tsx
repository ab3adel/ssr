
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {InputWithIcon} from '../../../tools/input/inputIcon';
import {useFormik} from 'formik'
import {useTranslation} from 'react-i18next'
import * as Yup from 'yup'

import {InitialValues,iTouched ,iErrors} from '../initial-values'

interface iProps {setValue:Function,handleBlur:Function
     ,values:Partial<InitialValues>
    ,errors:Partial<iErrors>
    ,touched:Partial<iTouched> }
export const SecurityForm =(props:iProps)=>{
    const {t,i18n}= useTranslation()
    const formik = useFormik({
        initialValues:{
            password:'',
            confirmPassword:''
        },
        validationSchema:Yup.object({
            password:Yup.string().required('This field is Required'),
            confirmPassword:Yup.string().required('This field is Required')
                              .oneOf([Yup.ref('password'),null],"Passowrd Confirmation doesn't match")
        }),
        onSubmit:()=>{},
        validate:(values)=>{
            console.log(values)
        }
    })
    
return (
    <Row className="d-flex justify-content-center gy-1" >
        <Col sm={8} xs={12}>
            <InputWithIcon
             label={t("Password")}
             name="password"
             id="password"
             type="password"
             value={props.values.password}
             onChange={props.setValue}
             error={props.errors.password as string}
             touched={props.touched.password as boolean}
             handleBlur={props.handleBlur}
             required={true}
             />


        </Col>
        <Col sm={8} xs={12}>
            <InputWithIcon
             label={t("ConfirmPassword")}
             name="password_confirmation"
             id="confirmPassword"
             type="password"
             value={props.values.password_confirmation}
             onChange={props.setValue}
             error={props.errors.password_confirmation as string}
             touched={props.touched.password_confirmation as boolean}
             handleBlur={props.handleBlur}
             required={true}
             />

        </Col>

    </Row>
)
}