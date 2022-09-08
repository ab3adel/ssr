
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/forgot-back.svg'
import email from '../../../images/auth/icon-email.svg'
import Button from 'react-bootstrap/Button'
import {InputWithIcon} from '../../tools/input/inputIcon'
interface iProps {setDone:Function}
export const EmailForm=({setDone}:iProps)=>{

    return (
        <Row className="gy-3">
                            <Col xs={12}
                            className="background">
                                <img src={back} className="emaiBack" />
                            </Col>
                            <Col xs={12} className="text">
                                <div className="title">
                                    Forgot password ?
                                </div>
                                <div className="subtitle">
                                    <span>Please enter your email address</span> 
                                    <span>associated
                                    with your account</span>
                                </div>

                            </Col>
                            <Col xs={12}>
                                <InputWithIcon
                                 label="Email Address"
                                 icon={email}
                                 id="email"
                                 name="email"
                                 type='email'
                                 />
                            </Col>
                            <Col xs={12} className='d-flex justify-content-center'>
                                <Col xs={5}>
                                    <Button className="doneBtn"
                                    onClick={()=>setDone(true)}>
                                        Submit
                                    </Button>
                                </Col>
                            </Col>
                        </Row>
    )
}