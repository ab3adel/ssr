
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/forgot-back.svg'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

interface iProps {
    hanldeDone:Function
    ,children:React.ReactNode
    ,enableBtn:boolean,isLoading:boolean
}
export const EmailForm=({
    hanldeDone,
    children,
    enableBtn,
    isLoading
}:iProps)=>{

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
                            {children}
                            </Col>
                            <Col xs={12} className='d-flex justify-content-center'>
                                <Col sm={5} xs={12}>
                                    <Button className="doneBtn"
                                    onClick={()=>hanldeDone()}
                                    disabled={isLoading || enableBtn }
                                    >
                                       { 
                                       isLoading?
                                       <Spinner animation="border" />:
                                       <>Submit</>
                                       }
                                    </Button>
                                </Col>
                            </Col>
                        </Row>
    )
}