
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import back from '../../../images/auth/forgot-back.svg'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'

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
const {i18n,t} =useTranslation()
    return (
        <Row className="gy-3">
                            <Col xs={12}
                            className="background">
                                <img src={back} className="emaiBack" />
                            </Col>
                            <Col xs={12} className="text">
                                <div className="title">
                                    {i18n.language==='en'?
                                    'Forgot password ?':
                                    'نسيت كلمة السر؟'
                                    
                                }
                                </div>
                                <div className="subtitle">
                                    {i18n.language==='en'?
                                    <>
                                    <span>Please enter your email or phone number without country code</span> 
                                    <span>associated
                                    with your account</span>
                                    </>:
                                    <>
                                    <span>رجاءا ادخل بريدك الالكتروني او رقم هاتفك بدون رمز النداء</span> 
                                    <span>المرافق لحسابك</span>
                                    </>
                                    }
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
                                       <>{t("Submit")}</>
                                       }
                                    </Button>
                                </Col>
                            </Col>
                        </Row>
    )
}