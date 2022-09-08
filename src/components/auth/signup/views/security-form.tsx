
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {InputWithIcon} from '../../../tools/input/inputIcon';
import {useFormik} from 'formik'
import {useTranslation} from 'react-i18next'
import * as Yup from 'yup'


export const SecurityForm =()=>{
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
             value={formik.values.password}
             onChange={formik.handleChange}
             error={formik.errors.password}
             touched={formik.touched.password}
             handleBlur={formik.handleBlur}
             />


        </Col>
        <Col sm={8} xs={12}>
            <InputWithIcon
             label={t("ConfirmPassword")}
             name="confirmPassword"
             id="confirmPassword"
             type="password"
             value={formik.values.confirmPassword}
             onChange={formik.handleChange}
             error={formik.errors.confirmPassword}
             touched={formik.touched.confirmPassword}
             handleBlur={formik.handleBlur}
             />

        </Col>

    </Row>
)
}