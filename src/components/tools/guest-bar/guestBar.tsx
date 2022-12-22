import './guestBar.scss'
import container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { GreenButton } from '../buttons/green-button'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
 export default function GuestBar () {
const navigate =useNavigate()
const {t} =useTranslation()

    return (
        <Col xs={12} className="d-flex justify-content-start align-items-center" style={{position:'absolute',bottom:'1rem'}}>
            <Col xs={11} sm={8} className="geustBarContainer">
            <Row className="">
                <Col xs={4} sm={3}>
                    <GreenButton label={t('Login')}
                    fun={()=>navigate('/auth')}
                     />
                </Col>
                <Col xs={8} sm={9}
                 className='d-flex justify-content-center align-items-center '>
                    <span>
                        {t('WelcomeGuest')}
                    </span>
                </Col>
            </Row>
            </Col>
        </Col>
    )
 }