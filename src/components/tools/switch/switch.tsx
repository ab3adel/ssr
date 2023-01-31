import './switch.scss'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import {Phone,Postage} from 'react-bootstrap-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useTranslation } from 'react-i18next'
export const Switch =()=>{
const [option,setOptions]=useState(0)
const {t}=useTranslation()
    return (
        <Col xs={12} className="switchContainer">

                <Row className="Btns">
                    <Col xs={6}
                    className={'left'}>

                        <Button className={option===0?'Btn active':'Btn inactive'}
                        onClick={()=>setOptions(0)}
                        >
                            <Phone />
                            <span>{t("Male")}</span>
                        </Button>
                    </Col>
                    <Col xs={6} className={'right'}>

                        <Button className={option===1?"Btn active":"Btn inactive" }
                          onClick={()=>setOptions(1)}
                    >
                            <Postage />
                            <span>{t("Female")}</span>
                        </Button>
                    </Col>

        
        </Row>
        </Col>
    )
}