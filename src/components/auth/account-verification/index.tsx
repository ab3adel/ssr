import './account-verification.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'

import {Inprogress} from './inprgoress'
import {Info} from './info'
import { useEffect, useState } from 'react'
import {useTranslation} from 'react-i18next'
import {iFields} from '../signup/signup'
interface iProps {
    show:boolean
    ,setShow:()=>void
    ,emailVerification:string
    ,phoneVerification:string
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
const AccountVerification =({show,setShow,emailVerification,phoneVerification}:iProps)=>{
const {t}= useTranslation()
const [stage,setStage]=useState({stage:-1,content:{text:'',className:'',btn:'',resend:''}})
const handleClick= ()=>{
    let index =stage.stage
    if (index <= 1) {
       
        index=index +1
      
        setStage(arr[index])
    }
    else {
        index=0

        setStage(arr[index])
        setShow()
    }
    
}
useEffect(()=>{
    if (phoneVerification) {
      arr[1].content.text= `Please enter the code we sent to your phone number ${phoneVerification} `
    }
    if (emailVerification) {
        
       
       arr[0].content.text= `An email verification link has been sent to your email ${emailVerification}`
        setStage(arr[0])

    }
  

},[phoneVerification,emailVerification])
    return (
        <Modal className="accountVerification"
        show={show}
        onHide={setShow}>
            <Modal.Header closeButton
            onClick={setShow}>
            </Modal.Header>
            <Modal.Body>
                <Container className="p-2">
                        <Col xs={12}>
                          { stage.stage !==2?
                          <Inprogress 
                          {...stage.content}
                          fn={handleClick}/>
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