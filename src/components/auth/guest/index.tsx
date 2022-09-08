import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Select } from '../../tools/select/select'
import './guest.scss'
import male from '../../../images/auth/icon-male.svg'
import female from '../../../images/auth/icon-female.svg'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'


 const Guest =()=>{

const [gender,setGender]=useState({male:true,female:false})
const navigate=useNavigate()
const {t,i18n}= useTranslation()
return (

    
        <Col xs={10} className="guestContainer">
            <Row className="gy-6">
                <Col xs={6}>
                    <Col xs={12}>
                        <span className="title">

                            {t("Location")} 
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">
                        <Select 
                        label="Country"
                        />
                    </Col>
                    
                </Col>
                <Col xs={6}>
                    <Col xs={12}>
                        <span className="title">

                            {t("Age")} 
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">
                        <Select 
                        label="20-30"
                        />
                    </Col>
                </Col>
                <Col xs={12} >
                    <Col xs={12}>
                        <span className="title">
                            {t("Gender")}
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">

                        <div className="Btns">
            
                            <Button className={gender.male? "Btn left active":"Btn left inactive" }
                            onClick={()=>setGender((pre:any)=>({male:true,female:false}))}
                            >
                                <img src={male} />
                                <span>{t("Male")}</span>
                            </Button>
                            <Button className={gender.female? "Btn right active":"Btn right inactive" }
                            onClick={()=>setGender((pre:any)=>({male:false,female:true}))}>
                                <img src={female} />
                                <span>{t("Female")}</span>
                            </Button>
                        </div>
                    </Col>
                </Col>
                <Col xs={12} className='d-flex justify-content-center'>
                    <Col xs={4}>

                        <Button className="doneBtn"
                        onClick={()=>navigate('/')}>
                            {t("Done")}
                        </Button>
                    </Col>
                </Col>
            </Row>

        </Col>

    
)
 }

  

export default Guest;