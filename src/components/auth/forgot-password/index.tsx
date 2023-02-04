import './forgot.scss'
import Modal from 'react-bootstrap/Modal'
import {useState,useContext} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import {EmailForm} from './email-form'
import {EmailInfo} from './info'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {InputWithIcon} from '../../tools/input/inputIcon'
import email from '../../../images/auth/icon-email.svg'
import axios from '../../tools/apis/axios'
import {apis} from '../../tools/apis/apis'
import notificationContext from '../../tools/context/notification/notification-context'
import {useTranslation} from 'react-i18next'
interface iProps {show:boolean,setShow:()=>void}


const ForgotPassword =({show,setShow}:iProps)=>{
const [done ,setDone]=useState(false)
const {setNotify} = useContext(notificationContext)
const [isLoading,setIsloading]=useState(false)
const {i18n,t}=useTranslation()
const formik =useFormik({
    initialValues:{
        email:''
    },
    validationSchema:Yup.object().shape({
        email:Yup.string().required(i18n.language==='en'?'This field is required':'هذا الحقل مطلوب')
    }),
    onSubmit:()=>{}
})

const hanldeDone=()=>{
    let formdata= new FormData()
    let number_test= new RegExp (/^\d+$/)
    if (number_test.test(formik.values.email)) {
        formdata.append('phone',formik.values.email)
    }
    else {

        formdata.append('email',formik.values.email)
    }
    formdata.append('locale',i18n.language)
    setIsloading(true)
axios.post(apis.forgot_password,
   formdata)
      .then(res=>{
       

       setIsloading(false)
        setNotify((pre:any)=>({...pre,message:res.data.message,type:true,show:true}))
        setDone(true)
    })
      .catch(err=>{
        setIsloading(false)

        if (err && err.response && err.response.data) {

            if (err.response.data.error){

                setNotify((pre: any) => ({
                  ...pre,
                  message: err.response.data.error,
                  type: false,
                  show: true,
                }));
              }
              if (err.response.data.errors) {
                
                  setNotify((pre: any) => ({
                    ...pre,
                    message: err.response.data.message,
                    type: false,
                    show: true,
                  }));
                
              }
        }
      })
}
const resendEmail =()=>{
    let number_test= new RegExp (/^\d+$/)
    let isPhone= number_test.test(formik.values.email)?true:false
    axios.get(apis.resend_email(isPhone,formik.values.email))
    .then(res=>{
     
        setNotify((pre:any)=>({...pre,message:res.data.message,type:true,show:true}))
      
    })
      .catch(err=>{
        console.log(err)
        if (err && err.data && err.data.response) {

            setNotify((pre:any)=>({...pre,message:err.response.data.message,type:false,show:true}))
        }
      })
}
let disableBtn= Boolean(formik.values.email)?Boolean(formik.errors.email):true
    return (
        <Modal show={show} onHide={setShow}
        className="forgotModal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container className="p-1 d-flex justify-content-center">
                    <Col xs={10} className="p-2">
                       {done?
                       <EmailInfo 
                       resendEmail={resendEmail}
                       end={setShow}
                       />
                       :
                        <EmailForm 
                        hanldeDone={hanldeDone}
                        enableBtn={disableBtn}
                        isLoading={isLoading}
                        >
                               <InputWithIcon
                                 label={t('UserName')}
                               
                                 id="email"
                                 name="email"
                                 type='email'
                                 value={formik.values.email}
                                 onChange={formik.setFieldValue}
                                 handleBlur={formik.handleBlur}
                                 error={formik.errors.email}
                                 touched={formik.touched.email}
                                 required={true}
                                 />
                        </EmailForm>
                        }
                    </Col>
                </Container>
            </Modal.Body>
           
        </Modal>
    )
}

export default ForgotPassword;