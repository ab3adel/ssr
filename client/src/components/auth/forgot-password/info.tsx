
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/email-info.svg'
import {CheckCircleFill} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
interface iProps {resendEmail:Function,end:Function}
export const EmailInfo=({resendEmail,end}:iProps)=>{
    const {i18n,t} =useTranslation()
    return (
        <Row className="gy-3">
                            <Col xs={12}
                            className="background">
                                <div className="backContainer">

                                    <img src={back} className="infoBack"/>
                                    <CheckCircleFill className="icon" />
                                </div>
                            </Col>
                            <Col xs={12} className="text">
                                <div className="title">
                                    {i18n.language==='en'?'Check your whatsapp or Email':
                                    'تحقق من حسابك واتساب أو ايميلك'
                                    }
                                </div>
                                <div className="subtitle">
                                      { i18n.language==='en'?
                                       <>
                                    <span>A new password has been sent to</span> 
                                    <span>your email/whatsapp, please check your inbox</span>
                                   </>:
                                   <>
                                    <span>كلمة سر جديدة  أرسلت</span>
                                    <span>الى حسابك واتساب\ايميلك </span>
                                   </>
                                   }
                                </div>

                            </Col>
                            <Col xs={12}>
                                
                            </Col>
                            <Col xs={12} className='d-flex justify-content-center flex-column align-items-center'>
                                <Col sm={5} xs={12}>
                                    <Button className="doneBtn"
                                    onClick={()=>end()}>
                                       Ok
                                    </Button>
                                </Col>
                                <Col sm={5} xs={12}
                                className="mt-1 mt-sm-0"
                                >
                                    <div className="resend">

                                        <a href='#' 
                                        onClick={()=>resendEmail()}>

                                            {t('Resend')}
                                        </a>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
    )
}