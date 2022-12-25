import './account-verification.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import {apis} from '../../tools/apis/apis'
import axios from '../../tools/apis/axios'
import {Inprogress} from './inprgoress'
import {Info} from './info'
import { useEffect, useRef, useState } from 'react'
import {useTranslation} from 'react-i18next'
import {iFields} from '../signup/signup'
interface iProps {
    show:boolean
    ,setShow:()=>void
    ,emailVerification:string
    ,phoneVerification:string
    ,phone:string
    ,email?:string
    
    
}
let arr=[
    {stage:0,
        content:{
            text:`An email verification link has been sent to 
            your email`,
            className:"halfFill",
            btn:'Next',
            resend:'Resend Email'
        }
    },
    {stage:1,
        content:{
            text:`Please enter the code we sent to your phone number 09*****2 `,
            className:"fill",
            btn:'continue',
            resend:'Resend code'
        }
    },
    {
        stage:2,
        content:{
            text:``,
            className:"",
            btn:'',
            resend:''
        }
    }

]
const AccountVerification =({show,setShow,emailVerification,phoneVerification,phone,email}:iProps)=>{
const {t,i18n}= useTranslation()
const [stage,setStage]=useState([{text:'',className:'',btn:'',resend:''}])
const [index,setIndex]=useState(0)
let maxStage=useRef(0)

const handleClick= ()=>{
    let new_index =index
    if (index < maxStage.current) {
       
        new_index=new_index +1
      
        setIndex(new_index)
    }
    else {
        new_index=0

        setIndex(new_index)
        setShow()
    }
    
}
useEffect(()=>{
    let newStage:any[]=[]
    if (phoneVerification) {

      let text=i18n.language ==='en'?
      `Please enter the code we sent to your whatsapp on this phone number ${phoneVerification} `:
      `ادخل الرقم الذي أرسلناه الى حسابك واتساب على هذا الرقم ${phoneVerification}`
      let className='halfFill'
      let btn="Next"
      let resend= "Resend"
       newStage= [{text,className,btn,resend}]
       maxStage.current=1
    }
    if (emailVerification) {
        
        let text=i18n.language ==='en'?
        `We sent a verification link to your email ${emailVerification} `:
        `أرسلنا رابط تفعيل الى ايميلك ${emailVerification}`
        let className='halfFill'
        let btn="Next"
        let resend= "Resend"
         newStage.push({text,className,btn,resend})
         maxStage.current=2
    }
  setStage(newStage)

},[phoneVerification,emailVerification])
console.log(phone)
    return (
        <Modal className="accountVerification"
        show={show}
        onHide={setShow}>
            <Modal.Header 
            closeButton
            onClick={setShow}>
            </Modal.Header>
            <Modal.Body>
                <Container className="p-2">
                        <Col xs={12}>
                          { index !==maxStage.current?
                          <Inprogress 
                          {...stage[index]}
                          fn={handleClick}
                          index={index}
                          phone={phone}
                          email={email}
                          
                          />
                          :<Info 
                          fn={handleClick}/>
                          }
                        </Col>
                    
                </Container>
            </Modal.Body>
        </Modal>
    )
}
export default AccountVerification;