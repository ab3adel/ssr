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
interface iProps {setLogin:Function}
 const SignUp=({setLogin}:iProps)=>{
const [tab,setTab]=useState(0)
const [btn,setBtn]=useState({title:'User',maxTabs:1})
const [show,setShow]=useState(false)
const {t,i18n}= useTranslation()
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
                                onClick={()=>handleBtn({title:'User',maxTabs:2})}>
                                       <img className='icon' src={User}/>
                                       <span>{t("User")}</span>
                                 
                                </Button>
                                <Button
                                  className={btn.title==='Commercial'?`BtnActive ${btn2} Btn`:`${btn2} Btn BtnInactive`}
                                  onClick={()=>handleBtn({title:'Commercial',maxTabs:3})}>
                                    <img className='icon' src={Commercial}/>
                                    <span>{t("Commercial")}</span> 
                                    
                                </Button>
                            </div>
                        
                    </Col>
                    <Col xs={12} >
                        {btn.title === 'User'?
                            <UserType 
                        tab={tab}
                        setTab={setTab}/>
                        :
                        <CommercialType
                         tab={tab}
                          setTab={setTab}/>
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
                                    {t("Next")}
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