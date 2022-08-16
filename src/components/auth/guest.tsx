
import  Container  from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import logo from '../../images/auth/Logo.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Button  from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
interface iProps {setGuest:Function}
export const Guest = ({setGuest}:iProps) =>{
    const {t,i18n}=useTranslation()
    const [selected,setSelected]=useState(0)
    const handleGuest=()=>{
        setGuest(false)
    }
    return (
       <Container className="guestForm" >
         <Card.Header className='guestHeader'>

            <Row className="d-flex justify-content-between g-1">
                <Col sm={5} xs={12} className="align-items-center d-flex">
                    <div className="goBack"
                    onClick={handleGuest}
                    style={{flexDirection :i18n.language==='ar'?'row-reverse':'row'}}>
                        <i className="bi bi-arrow-left-short"></i>
                        <div className="text">

                            {t("BackToLogin")}
                        </div>
                    

                    </div>
                </Col>
                <Col sm={3} xs={8}>
                    <img 
                    src={logo}
                    className="logo" 
                    />
                </Col>
            </Row>
         </Card.Header>
         <Card.Body className='guestBody mt-4'>

            <Row className=" d-flex justify-content-center g-4">
                <Col sm={8}  xs={12} className="d-flex flex-column">
                    
                    <Form.Label>{t("Location")}</Form.Label>
                        <Form.Select className="select ">
                            <option>Kwait</option>
                            <option value="1">Qatar</option>
                            <option value="2">Egypt</option>
                            <option value="3">Syria</option>
                        </Form.Select>
                
                </Col>
                <Col sm={8} xs={12} className="d-flex flex-column ">
                    
                    <Form.Label>{t("Age")}</Form.Label>
                        <Form.Select className="select ">
                            <option>20-40</option>
                            <option value="1"> 20-8</option>
                            <option value="2">-40</option>
                            
                        </Form.Select>
                
                </Col>
                <Col sm={8}  xs={12} className="d-flex flex-column ">
                    
                    <Form.Label>{t("Gender")}</Form.Label>
                        <Form.Group className="genderGroup">
                            <Button 
                            className={selected ===0 ?'genderBtn selected':'genderBtn unSelected'}
                            onClick={()=>setSelected(0)}
                            >
                                <i className="bi bi-gender-male"></i>
                               {t("male")}
                            </Button>
                            <Button 
                            className={selected ===1 ?'genderBtn selected':'genderBtn unSelected'}
                            onClick={()=>setSelected(1)}
                            >
                                <i className="bi bi-gender-female"></i>
                                {t("Female")}
                            </Button>
                        </Form.Group>
                
                </Col>
                <Col xs={5} className='d-flex justify-content-center'>
                        <Button
                         className='doneBtn'>
                            {t("Done")}
                        </Button>
                </Col>
            </Row>
            
         </Card.Body>
       </Container>

    )
}