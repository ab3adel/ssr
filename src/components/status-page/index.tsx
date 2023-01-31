import { useEffect, useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
import './status.scss'
import Row from 'react-bootstrap/Row'
import Fail from '../../images/fail.png'
import Success from '../../images/success.png'
import Col from 'react-bootstrap/Col'
import { useTranslation } from 'react-i18next'
import { GreenButton } from '../tools/buttons/green-button'
import EmailVerification from '../tools/email-verfication/email-verification'
 const Status=()=>{
    const location=useLocation()
    const [status,setStatus]=useState(false)
    const {i18n,t}=useTranslation()
    const [show,setShow]=useState(false)
    const navigate=useNavigate()
    

    useEffect(()=>{
       
        if (location.pathname==='/fail') {
            setStatus(false)
        }
        else {
            setStatus(true)
        }
    },[])
    const login=()=>{
        navigate('/auth')
    }
    const rensendLink=()=>{
        setShow(true)
    }
return (
    <Col xs={12} className="statusContainer">
        <Row className=" h-100  ">
           {
             status?i18n.language==='en'?
             <>
             <span className="text my-2 " style={{color:'green'}}>
             Your email has been validated successfully
             </span>
               <span className="text my-2 " style={{color:'green'}}>
              You can now start your journey with InstaAqar
             </span>
             </>
             :<>
               <span className="text my-2 " style={{color:'green'}}>
                تم تأكيد ايميلك بنجاح
               </span>
               <span className="text my-2 " style={{color:'green'}}>
               يمكنك الان انطلاق في تجربة انستا عقار 
               </span>
             </>
             :
             i18n.language==='en'?
             
             <span className="text my-2 " style={{color:'red'}}>
             Sorry , Your validation hasn't done !!
             </span>
             
             :
             <span className="text my-2 " style={{color:'red'}}>
                عذرا , لم ينجح التحقق من ايميلك
             </span>
             
             }
            <img src={status?Success:Fail}
            className="image  " />
            <div className='next'>
                {
                    status?i18n.language==='en'?
                  <span>now Login from here please</span>
                  :<span>الأن فضلا سجل الدخول من هنا</span>:
                  i18n.language==='en'?
                  <span>please , request new link from here</span>:
                  <span>فضلا, اطلب رابط جديد لتفعيل الايميل من هنا</span>
                }
                <div className='mt-1'>

                    <GreenButton 
                    label={status?t('Login'):t('NewLink')}
                    fun={status?login:rensendLink}
                    />
                </div>
            </div>
        </Row>
        <EmailVerification show={show} onClose={()=>setShow(false)} />
    </Col>

)
}
export default Status;