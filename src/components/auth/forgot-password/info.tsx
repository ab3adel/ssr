
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/email-info.svg'
import {CheckCircleFill} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
interface iProps {resendEmail:Function,end:Function}
export const EmailInfo=({resendEmail,end}:iProps)=>{

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
                                    Check your Email
                                </div>
                                <div className="subtitle">
                                    <span>A new password has been sent to</span> 
                                    <span>your email, please check your inbox</span>
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

                                            Resend Email
                                        </a>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
    )
}