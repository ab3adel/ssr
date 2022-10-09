import Toast from 'react-bootstrap/Toast'
import {Check,X} from 'react-bootstrap-icons'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { useEffect, useState } from 'react'


interface iProps {
  show:boolean
  ,close:()=>void
  ,message:string
,type:boolean }
export const Notify =({
   show
   ,close
   ,message
   ,type
   
}:iProps)=>{

    return (
      <ToastContainer  position={'top-center'} 
       >

        <Toast show={show} onClose={close}
        delay={4000} autohide
       >
        <Toast.Header
        className={!type?'bg-danger text-white':'bg-success text-white'}
       >
         {type ? <Check /> :<X/>}
          <strong className="me-auto ml-1 mr-1">{type?'Successfull':'Failed'}</strong>
        
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      </ToastContainer>
    )
}