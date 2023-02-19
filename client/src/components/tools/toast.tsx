import Toast from 'react-bootstrap/Toast'
import {Check,X,InfoCircleFill} from 'react-bootstrap-icons'
import ToastContainer from 'react-bootstrap/ToastContainer'

import { useTranslation } from 'react-i18next'


interface iProps {
  show:boolean
  ,close:()=>void
  ,message:string
,type:boolean | string }
export const Notify =({
   show
   ,close
   ,message
   ,type
   
}:iProps)=>{
  const {t,i18n}=useTranslation()
  let bg='bg-danger'
  let text=i18n.language==='en'?'Failed':"فشل"
  let icon= <X/>
 if (typeof (type) === 'boolean') {
  if (type) {
    bg='bg-success'
    text=i18n.language==='en'?'Successfull':"نجاح"
    icon=<Check/>
  }
 }
 if (typeof(type)==='string') {
  if (type==='info') {
    bg='bg-info'
    text=i18n.language==='en'?'Information':"معلومة"
    icon=<InfoCircleFill/>
  }
 }
 

    return (
      <ToastContainer  position={'top-center'} 
       >

        <Toast show={show} onClose={close}
        delay={4000} autohide
       >
        <Toast.Header
        className={`${bg} text-white`}
       >
         {icon}
          <strong className="w-100 text-start px-4">{text}</strong>
        
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
      </ToastContainer>
    )
}