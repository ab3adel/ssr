

import star from '../../../images/auth/icon-star.svg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {useTranslation} from 'react-i18next'
interface iProps {btn:string,text:string,resend:string,className:string,fn:()=>void}
export const Inprogress =({btn,text,resend,className,fn}:iProps) =>{
    const {t}=useTranslation()
    return (
                <Row className='inprogressContainer gy-6'>
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
                        
                        </Row>
                    </Col>
                    <Col xs={12} >
                        <Row className="gy-3 d-flex justify-content-center flex-column align-items-center">

                            <Col xs={5}>
                                <Button className="doneBtn"
                                onClick={fn}>
                                   {btn}
                                </Button>
                            </Col>
                            <Col xs={5}
                            >
                                <div className="resend">

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