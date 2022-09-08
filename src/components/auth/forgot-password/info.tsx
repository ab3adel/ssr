
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/email-info.svg'
import {CheckCircleFill} from 'react-bootstrap-icons'
import Button from 'react-bootstrap/Button'
interface iProps {setDone:Function}
export const EmailInfo=({setDone}:iProps)=>{

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
                                <Col xs={5}>
                                    <Button className="doneBtn">
                                        Submit
                                    </Button>
                                </Col>
                                <Col xs={5}
                                >
                                    <div className="resend">

                                        <a href='#' 
                                        onClick={()=>setDone(false)}>

                                            Resend Email
                                        </a>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
    )
}