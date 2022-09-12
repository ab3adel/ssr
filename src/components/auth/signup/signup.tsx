import './signup.scss'
import AccountVerification from '../account-verification/index'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import User from "../../../images/auth/icon-user.svg"
import Commercial from '../../../images/auth/Icon-business-center.svg'
import UserType from './user'
import CommercialType from './commercial';
import { useState } from 'react';
import {useTranslation} from 'react-i18next'
import {PersonalInfoForm} from './views/personalInfo-form'
import {SecurityForm} from './views/security-form'
import {LocationForm} from './views/location-form'
import {useFormik} from 'formik'
import { RequiredFilesForm } from './views/requiredFiltes-form';
import {SignupSchema} from '../../tools/validation'
interface iProps {setLogin:Function}
interface iPhonNumbers {phone:string,international_code:string}
export interface iFields {
    full_name:string,email:string
    ,role_id:number,area_id:number,
    password:string,password_confirmation:string,
    phone_numbers:iPhonNumbers []
}
type key = keyof iFields
type phoneNumbersTouched= {[t in keyof iPhonNumbers]?:boolean | undefined}
type phoneNumbersError= {[t in keyof iPhonNumbers]?:string}
export type iTouched = {[t in keyof iFields]?:boolean | undefined |phoneNumbersTouched []} 
export type iErrors ={[t in keyof iFields]?:string | phoneNumbersError [] | string []}
 const SignUp=({setLogin}:iProps)=>{
const [tab,setTab]=useState(0)
const [btn,setBtn]=useState({title:'User',maxTabs:1})
const [show,setShow]=useState(false)
const {t,i18n}= useTranslation()

const formik=useFormik({
    initialValues:{
        full_name:'',
        email:'',
        role_id:-1,
        area_id:-1,
        password:'',
        password_confirmation:'',
        phone_numbers:[
            {
                phone:'',
                international_code:''
            }
        ]
       
    },
    onSubmit:()=>{},
    validationSchema:SignupSchema
})
const handleClick=(str:string)=>{
    if (str === 'next'){
        if (tab <btn.maxTabs) {
            setTab(pre=>pre+1)
        }
        else {
            setShow(true)
        }
    }
    if (str==='back') {
        if (tab>0) {
            setTab(pre=>pre-1)
        }
    }
}
let btn1="BtnLeft"
let btn2="BtnRight"
if (i18n.language ==='ar') {
    btn1="BtnRight"
    btn2="BtnLeft"
}
const handleBtn=({title,maxTabs}:{title:string,maxTabs:number})=>{
    setTab(0)
    setBtn(pre=>({...pre,title,maxTabs}))
}
const handleRole =(str:string)=>{
    if (str === 'User') {
        formik.setFieldValue('role_id',2)
        handleBtn({title:'User',maxTabs:2})
    }
    else {
        formik.setFieldValue('role_id',3)
        handleBtn({title:'Commercial',maxTabs:3})
    }
}
    return (
        <Row className="signUpContainer gy-3">
            <Col xs={12}>
                <Row className="gy-3">
                    <Col xs={12}>
                        <div className="title">{t("SignUp")}</div>
                    </Col>
                    <Col xs={12} className="overlappedBtns">
                        
                            <div className="Btns">

                                <Button className={btn.title==='User'?`BtnActive ${btn1} Btn`:` ${btn1} Btn BtnInactive`}
                                onClick={()=>handleRole('User')}>
                                       <img className='icon' src={User}/>
                                       <span>{t("User")}</span>
                                 
                                </Button>
                                <Button
                                  className={btn.title==='Commercial'?`BtnActive ${btn2} Btn`:`${btn2} Btn BtnInactive`}
                                  onClick={()=>handleRole('Commercial')}>
                                    <img className='icon' src={Commercial}/>
                                    <span>{t("Commercial")}</span> 
                                    
                                </Button>
                            </div>
                        
                    </Col>
                    <Col xs={12} >
                        {btn.title === 'User'?
                            <UserType 
                            tab={tab}
                        >
                             {tab===1 && ( 
                             <SecurityForm
                              values={formik.values}
                              handleBlur={formik.handleBlur} 
                              setValue={formik.setFieldValue}
                              touched={formik.touched}
                              errors={formik.errors}
                              />) }
                            { tab===0 && ( <PersonalInfoForm  
                              
                              setValue={formik.setFieldValue}
                             type={'User'}
                             touched={formik.touched}
                             values={formik.values}
                             errors={formik.errors}
                             handleBlur={formik.handleBlur}
                             setFieldTouched={formik.setFieldTouched}

                             />)}
                        </UserType>
                        :
                        <CommercialType
                         tab={tab}
                          setTab={setTab}>
                             {tab===0 && ( <PersonalInfoForm  
                                            type={'Commercial'}
                                            setValue={formik.setFieldValue}
                                            values={formik.values}
                                            errors={formik.errors}
                                            touched={formik.touched}
                                            handleBlur={formik.handleBlur}
                                            setFieldTouched={formik.setFieldTouched}

                                            />)}
                             {tab===1 && ( <LocationForm
                                           type="Commercial"
                                             />)}
                            {tab===2 && ( <
                                SecurityForm 
                                values={formik.values}
                                handleBlur={formik.handleBlur} 
                                setValue={formik.setFieldValue}
                                touched={formik.touched}
                                errors={formik.errors}
                            />)}
                            {tab===3 && (<RequiredFilesForm />)}               
                        </CommercialType>
                        }
                    </Col>
                </Row>
            </Col>
            <Col xs={12} className="signupFooter">
                <Row>
                    <Col xs={12} >
                           <Row className="Btns">
                            <Col sm={4} xs={5}>

                                <Button className="next Btn"
                                onClick={()=>handleClick('next')}>
                                    {
                                        tab === btn.maxTabs?
                                        t('Signup')
                                        :
                                        t("Next")
                                    }
                                </Button>
                            </Col>
                            
                                {
                                    tab >0 ?
                                    <Col  sm={4} xs={5}>

                                        <Button className="back Btn"
                                        onClick={()=>handleClick('back')}>
                                            {t("Back")}
                                        </Button>
                                    </Col>
                                :''
                                }
                           </Row>
                        
                    </Col>
                    <Col xs={12} className="toLogin">
                        <div className="text">
                           {t("AlreadyHaveAnAccount")}<span onClick={()=>setLogin(true)}>{t("Login")}</span>
                        </div>
                    </Col>
                </Row>

               
            </Col>
            <AccountVerification 
             show={show}
             setShow={()=>setShow(false)}/>
        </Row>
    )
}
export default SignUp;