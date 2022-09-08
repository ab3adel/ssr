import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import {InputWithIcon} from '../../tools/input/inputIcon'
import userIcon from '../../../images/auth/icon-user.svg'
import lockIcon from '../../../images/auth/icon-lock.svg'
import {useTranslation} from 'react-i18next'
import {CheckBox} from '../../tools/checkBox/checkBox'
import Button from 'react-bootstrap/Button'
import './login.scss'
import ForgotPassword from '../forgot-password'
import { useState } from "react";

interface iProps {setLogin:Function}
const Login =({setLogin}:iProps) =>{
    const {t,i18n}=useTranslation()
    const [show,setShow]=useState(false)
    return (

                <Col xs ={12} className="loginBody" >
                     <Col sm={9} xs={12} >
                        <Row className="gy-4">

                           <Col xs={12}>

                                <Row className="gy-5">

                                    <Col xs={12} >
                                        <h5 className="title">{t('Login')}</h5>
                                    </Col>
                                    <Col xs={12}>
                                        <Col xs={12}>
                                            
                                            <InputWithIcon 
                                            type="text"
                                            label={t("UserName")}
                                            icon={userIcon}
                                            name="email"
                                            id="email"
                                            />
                                        </Col>
                                        <Col xs={12}>
                                        <InputWithIcon 
                                        type="password"
                                        label={t("Password")}
                                        icon={lockIcon}
                                        name="email"
                                        id="email"/>
                                        </Col>
                                    </Col> 
                                    <Col xs={12}>
                                        <Row>

                                            <Col xs={6}>

                                                <CheckBox label={t("RememberMe")} />
                                            </Col>
                                            <Col xs={6} className="d-flex d-sm-block  align-items-center"
                                             style={i18n.language ==='en'?{justifyContent:"flex-end"} : {justifyContent:"flex-start"}}>
                                                <div className="forgotPassword"
                                                  style={i18n.language ==='en'?{textAlign:"right"} : {textAlign:"left"}}
                                                onClick={()=>setShow(true)}>
                                                    {t("ForgotPassword")}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col> 
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={6}>
                                                <Button className="loginBtn">
                                                    {t("Login")}
                                                </Button>
                                            </Col>
                                            <Col xs={6} 
                                            className="d-sm-flex justify-content-end">
                                                <Button className="singupBtn"
                                                onClick={()=>setLogin(false)}>
                                                {t("SignUp")}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                
                                </Row>
                            </Col>
                            
                               
                          
                        </Row>
                     </Col>
                     <ForgotPassword 
                      show={show}
                      setShow={()=>setShow(false)}/>

                    </Col>
               
           
       
    )
}
 export default Login;