import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import chat from '../../images/post-details/chat-icon.svg'


export const FixedSection =()=>{


    return (
        <Col sm={4} xs={12}  className="fixedSection p-sm-1 p-0">
                    <Card className='p-sm-2 p-0'>
                        <Row className='gy-3 p-2'>
                            <Col xs={12} className="fw-bold fs-5">
                                Property Information
                            </Col>
                            <Col sm={5} xs={6} className="fw-bold">
                                Type
                            </Col>
                            <Col sm={4} xs={6}>
                                <div className="tag grey">

                                    Flat
                                </div>
                            </Col>
                            <Col sm={5} xs={6} className="fw-bold">
                                Purpose
                            </Col>
                            <Col sm={4} xs={6} >
                                < div className="tag grey">

                                    For Rent
                                </div>
                            </Col>
                            <Col sm={5} xs={6} className="fw-bold">
                                Added on
                            </Col>
                            <Col sm={4} xs={6} >
                                <div className="tag grey">

                                    5/July/2022
                                </div>
                            </Col>
                            <Col sm={5} xs={6} className="fw-bold">
                                PACIID
                            </Col>
                            <Col sm={4} xs={6} >
                                <div className="tag grey">

                                    1234B324AB23
                                </div>
                            </Col>
                            <Col sm={5} xs={6} className="fw-bold">
                                Direction
                            </Col>
                            <Col sm={4} xs={6} >
                                <div className="tag grey">

                                    North West
                                </div>
                            </Col>
                            <Col xs={12} className="fw-bold fs-5">
                                Contact Owners
                            </Col>
                            <Col xs={12} >
                                <Row className="gy-1">

                                    <Col sm={10} xs={12} className="d-flex 
                                                        justify-content-between 
                                                        align-items-center ">

                                        <span>000991382138123</span>
                                        <div className='call'>
                                            Call
                                        </div>
                                    </Col>
                                    <Col sm={10} xs={12} className="d-flex 
                                                        justify-content-between 
                                                        align-items-center ">

                                        <span>000991382138123</span>
                                        <div className='call'>
                                            Call
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Col xs={0} sm={12} className="mt-4 p-1 d-none d-sm-flex justiyf-content-center">

                            <Col xs={9} className="chatBtn  ">
                                <img src={chat} />
                                <span>Chat</span>
                            </Col>
                        </Col>
                     
                      
                    </Card>
                   
                </Col>
    )
}