import './login.scss'
import {Formik, FormikConsumer, useFormik, yupToFormErrors} from 'formik'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Logo from '../../images/auth/Logo.png'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import {InputWithIcon} from '../tools/input/inputIcon'
import {useTranslation} from 'react-i18next'
import * as Yup from 'yup'
import { useState } from 'react'
interface iProps {setGuest:Function}
 export const LogIn = ({setGuest}:iProps) =>{
    const {t,i18n}=useTranslation()
    const [isChecked,setIsChecked]=useState(false)
const formik = useFormik( {
    initialValues:{username:'',password:''},
    onSubmit:(values)=>{},
    validationSchema:Yup.object({
       username:Yup.string()
                   .max(15,'this field can not be more than 15 cahrs')
                   .required('Required'),
       password:Yup.string().required('Required')            

    })
})
    const handleGuest=()=>{
        setGuest(true)
    }
    const handleChecked =()=>{
        setIsChecked(!isChecked)
    }

    return (
        <>
                        <Card.Header className="loginHeader">
                            

                                <Row className='d-flex justify-content-center '>
                                    <Col sm={3} xs={6}
                                    className="logo">
                                        <img src={Logo} />

                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-center mt-2'>
                                    <Col sm={8} xs={12} className='text-center'>
                                        <h1>
                                            {t("WelcomeTo")}
                                        </h1>
                                        <h1 style={{color:'var(--blue)'}}>
                                           {t("IntaAqar")}
                                        </h1>
                                    </Col>
                                </Row>
                            
                        </Card.Header>
                        <Card.Body className="loginBody">
                            <Row className="p-1 d-flex justify-content-center g-1">
                                <Col xs={12} sm={10}>
                                    <Form className="loginForm">
                                       <InputWithIcon 
                                         label={t('UserName')}
                                         icon={<i className="bi bi-person"></i>}
                                         className="mb-2"
                                         onChange={formik.handleChange}
                                         value={formik.values.username}
                                         id='username'
                                         name='username'
                                         handleBlur={formik.handleBlur}
                                         error={formik.errors.username}
                                         touched={formik.touched.username}
                                         type='text'
                                         />
                                         <InputWithIcon 
                                          label={t('Password')}
                                          icon={<i className="bi bi-lock ml-1"></i>}
                                          className="mt-4"
                                          onChange={formik.handleChange}
                                          value={formik.values.password}
                                          id='password'
                                          name='password'
                                          handleBlur={formik.handleBlur}
                                          error={formik.errors.password}
                                          touched={formik.touched.password}
                                          type='password'
                                          />
                                    </Form>
                                </Col>
                                <Col sm={5} xs={12} className="mt-4">
                                    <div
                                     className={isChecked?"rememberMe checked":"rememberMe"}
                                     onClick={handleChecked}>
                                         {
                                        isChecked?
                                        <i className="bi bi-check2-circle "></i>
                                        :
                                        <i className="bi bi-circle "></i>
                                       }
                                       <div className="text">
                                         {t('RememberMe')}
                                       </div>
                                      
                                      
                                    </div>
                                </Col>
                                <Col sm={5} xs={12} className="mt-4 forgotPassword  ">
                                    <h5 style={{color:'var(--blue)'}} 
                                         className={i18n.language=='ar'?"text-left":"text-right"}>
                                        {t("ForgotPassword")}
                                    </h5>

                                </Col>
                                <Row  className="mt-4 d-flex justify-content-center" >
                                    
                                    <Col sm={4} xs={6} className=" d-flex justify-content-start" >
                                        <Button 
                                        className="loginBtn">
                                            {t("Login")}
                                        </Button>
                                    </Col>
                                    <Col sm={4} xs={6} className=" d-flex justify-content-end">
                                        <Button 
                                        className="signUpBtn">
                                            {t("SignUp")}
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="mt-5 d-flex justify-content-center">
                                    <Col xs={12} sm={6} className="guest"
                                    onClick={handleGuest}>
                                        <a className="text">

                                            {t("ContinueGuest")}
                                        </a>
                                    </Col>
                                </Row>
                            </Row>
                           
                        </Card.Body>
          </>
    )
       
    
 }
