
import back from '../../../images/auth/verification-back.svg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {useTranslation} from 'react-i18next'
interface iProps {fn:()=>void}
export const Info =({fn}:iProps)=>{
    const {t}=useTranslation()
    return (
        <Row className='infoContainer gy-6'>
                    <Col xs={12} >
                        <Row className="gy-3 d-flex justify-content-center flex-column align-items-center">

                            <img src={back} 
                            className="back"/>
                            <div className="text">
                                <span className="head">
                                    {t("Congratulations")} 
                                </span>
                                <span>
                                   {t("YourAccountVerified")}
                                </span>
                            </div>   
                        </Row>
                        
                    </Col>
                    <Col xs={12} >
                        <Row className="gy-3 d-flex justify-content-center flex-column align-items-center">


                            <Col xs={5}>
                                <Button className="doneBtn"
                                onClick={fn}>
                                   continue
                                </Button>
                            </Col>
                            
                        </Row>
                    </Col>
            </Row>

    )
}