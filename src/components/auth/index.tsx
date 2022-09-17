import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SignUp from './signup/signup'
import {Select} from '../tools/select-with-image/select'
import instaLogo from '../../images/instaaqarlogo.svg'
import UK from '../../images/auth/Uk.svg'
import './auth.scss'
import {useState} from 'react'
import Login from './login/login'
import Guest from './guest'
import {useTranslation} from 'react-i18next'
let languages=[{title:"English",icon:UK},{title:'Arabic',icon:UK}]
const LoginCard = () =>{
    const [guest,setGuest]=useState(false)
    const [login,setLogin]=useState(true)
    const {t,i18n} =useTranslation()
    const handleLanguage=(index:number)=>{
       if (index === 0) {
        localStorage.setItem('lang','en')
        i18n.changeLanguage('en')
        
       }
       else {
        localStorage.setItem('lang','ar')
        i18n.changeLanguage('ar')
       }
    }

    return (
        <Container
        fluid
        className="authContainer">
           <Row className="auth">
           <Col xs={12} sm={6} className="p-0">
                <div className="authBackground">

                    <div className="backgroundText">
                        <span>{t("FindThe")}</span> 
                        <span>{t("PerfectPlace")}</span>
                    </div>
                </div>
            </Col>
           
            <Col xs={12} sm={6} className="authFormContainer">
                <Row className="gy-3 authForm" >
                    
                        <Col  xs={12} className="authHeader p-1">
                        
                            <Col xs={12}>
                                <Row className="p-1">

                                    <Col xs={6} className="d-flex d-sm-bolck align-items-center">
                                        <img src={instaLogo}  className="logo"/>
                                    </Col>
                                    <Col xs={6} className="d-sm-flex justify-content-end">
                                        <Select 
                                        options={languages}
                                        onChange={handleLanguage}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>    
                        
                        
                        {guest? 
                         <Col xs={12} className="d-flex justify-content-center">
                            <Guest />
                         </Col>
                        :
                        <>
                        <Col xs ={12} className="authBody" >
                            {
                                login?
                                <Login setLogin={setLogin}/>:
                                <SignUp
                                setLogin={setLogin}/>
                            }
                              
                        </Col>
                        <Col xs ={12}>
                                <div 
                                    className="guest"
                                    onClick={()=>setGuest(true)}>
                                    <a>
                                        {t("ContinueGuest")}
                                    </a>
                                </div>
                        </Col>
                        </>
                        }
                </Row>
            </Col>
     
            
           </Row>
        </Container>            
    )
}

export default LoginCard;