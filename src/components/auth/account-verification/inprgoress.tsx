

import star from '../../../images/auth/icon-star.svg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {useTranslation} from 'react-i18next'
import { CodeInput } from '../../tools/code-input/code-input'
import { useState,useContext } from 'react'
import {apis} from '../../tools/apis/apis'
import axios from '../../tools/apis/axios'
import { Spinner } from '../../tools/spinner'
import notificationContext from '../../tools/context/notification/notification-context'

interface iProps {btn:string,text:string
    ,resend:string,className:string,fn:()=>void,index:number,
    phone:string,email?:string
}
export const Inprogress =({btn,text,resend,className,fn,index,phone,email}:iProps) =>{
    const {t,i18n}=useTranslation()
    const [code,setCode]=useState('')
    const [loading,setLoading]=useState(false)
    const {setNotify}=useContext(notificationContext)
    const handleDoneBtn=()=>{
        if (index ===0) {
            if (code) {
                let id=0
                if (localStorage.getItem('temp_user')){
                    id=JSON.parse(localStorage.getItem('temp_user') as string).id
                }
                setLoading(true)
                axios.get(apis.verifyPhoneNumber(id,parseInt(code)))
                 .then(res=>{
                    console.log(res)
                    setLoading(false)
                    if (res && res.data) {
                        fn()
                    }
                 })
                 .catch(err=>{
                    setLoading(false)
                    console.log(err.response.status)
                    if (err.response.status === 400) {
                        setNotify((pre:any)=>({...pre,show:true,type:false,message:err.response.data.error}))
                        setCode('')
                    }
                 })
            }
            else {
                return
            }
        }
        else {
            fn()
        }
    }
    const handleResend =()=>{
        if (index===0) {
            axios.get(apis.resend(true,phone))
            .then(res=>{
                if (res.data){
                    setNotify((pre:any)=>
                    ({...pre,
                        show:true
                        ,type:true
                        ,message:i18n.language==='en'?'We resend the code to your whatsapp number':
                        'لقد تم اعادة ارسال الرمز الى حسابك الواتساب'
                    })
                    )
                }
            })
            .catch(err=>{
                if (err.response.data) {
                    setNotify((pre:any)=>
                    ({...pre,
                        show:true
                        ,type:false
                        ,message:err.response.data.message
                    })
                    )
                }
            })
        }
    }
    console.log(phone)
    return (
                <Row className='inprogressContainer gy-5'>
                    <Col xs={12}>
                        <Row className="gy-4">

                            <Col xs={12}
                            className="d-flex justify-content-center">
                                <img src={star} 
                                className="star"/>
                            </Col>
                            <Col xs={12} className="d-flex justify-content-center">
                                <div className="text">
                                  {t("VerifyYourAccount")}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={`inprogress ${className}`}></div>
                            </Col>
                            <Col xs={12}>
                                <div className="info">
                                   {text}
                                </div>
                            </Col>
                           { index ===0 &&
                           (<Col xs={12} className="d-flex justify-content-center">
                                <CodeInput
                                value={code}
                                setValue={setCode}
                                 />
                            </Col>)
                            }
                        
                        </Row>
                    </Col>
                    <Col xs={12} >
                        <Row className="gy-3 d-flex justify-content-center flex-column align-items-center">

                            <Col xs={5}>
                                <Button className="doneBtn"
                                onClick={()=>handleDoneBtn()}
                                disabled={!loading?
                                    index===0 && code.length!==6?true:false:true
                                    }>
                                   
                                      {
                                         loading?  
                                         <Spinner />:
                                         <>
                                   {btn? t(`${btn}`):t('Continue')}
                                    
                                        </>
                                    }

                                    
                                </Button>
                            </Col>
                            <Col xs={5}
                            >
                                <div className="resend"
                                onClick={()=>handleResend()}
                                >

                                    <a href='#' 
                                    >

                                        {resend}
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
            </Row>

    )
}