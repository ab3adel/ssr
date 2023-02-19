import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import  Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import  Row  from 'react-bootstrap/Row'
import  Col from 'react-bootstrap/Col'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { InputWithIcon } from '../input/inputIcon'
import './email-verification.scss'
import * as Yup from 'yup'
import notificationContext from '../context/notification/notification-context'
import { GreenButton } from '../buttons/green-button'
import { WhiteButton } from '../buttons/white-button'
import { apis } from '../apis/apis'
import axios from '../apis/axios'

interface iProps {show:boolean,onClose:()=>void}
const EmailVerification =({show,onClose}:iProps)=>{

    const {t,i18n} =useTranslation()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const formik =useFormik({
        initialValues:{
           email:''
        },
        onSubmit:()=>{},
        validationSchema:Yup.object().shape({email:Yup.string()
            .email(i18n.language==='en'?'Please enter valid email':"أدخل ايميل صالح رجاءا")})
    })
    const {setNotify} =useContext(notificationContext)

const submit =()=>{
    if (formik.errors.email || !Boolean(formik.values.email)) return
    setLoading(true)
axios.get(apis.resend_email(false,formik.values.email,'Verification'))
.then(res=>{
    setLoading(false)
    if (res.data) {
        setNotify((pre:any)=>({...pre,type:true,show:true
            ,message:i18n.language==='en'? 'Another acitvation link has been sent'
            :'رابط تفعيل أخر تم ارساله'}))
    }
    onClose()
    formik.resetForm()
    
})
.catch(err=>{
    setLoading(false)
    setNotify((pre:any)=>({...pre,type:false,show:true
        ,message:i18n.language==='en'? 'Something wrong happend , please try later'
        :'حدث خطأ ما , حاول مرة أخرى لاحقا'}))
})
}

    return (
        <Modal
        show={show} onHide={onClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>{t('ResendLink')}</Modal.Title>

          </Modal.Header>
  
          <Modal.Body>
        
            <Row className='gy-3 px-1'>
                <Col xs={11} style={{textAlign:i18n.language==='en'?'left':'right'}}>
                    {
                        i18n.language==='en'?
                        'Enter your Email Please:':
                        'أدخل بريدك الالكتروني هنا رجاءا'
                    }
                </Col>
                <Col xs={11}>
                    <InputWithIcon 
                     label={t('Email')}
                     value={formik.values.email}
                     onChange={formik.setFieldValue}
                     name="email"
                     error={formik.errors.email}
                     touched={formik.touched.email}
                     handleBlur={formik.handleBlur}
                     type="text"
                     required={true}
                    />
                </Col>
                
            </Row>
          
          </Modal.Body>
  
          <Modal.Footer>
            <Col xs={12}>

                <Row className="">
                    <Col xs={6} lg={5}> 
                    <GreenButton  
                    loading={loading}
                    label={
                        t('Send')}
                    fun={()=>submit()}
                    ></GreenButton>
                    </Col>
                    <Col xs={6} lg={5}>

                        <WhiteButton label={t('Cancel')}
                        fun={()=>onClose()} />
                    </Col>
                </Row>
            </Col>
          </Modal.Footer>
          </Container>
        </Modal>
    )
}
export default EmailVerification;