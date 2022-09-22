import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import home from '../../images/home/home-icon.svg'
import search from '../../images/home/search-icon.svg'
import profile from '../../images/home/icon-profile.svg'
import notification from '../../images/home/bell-icon-1.svg'
import messages from '../../images/home/message-icon.svg'
import about from '../../images/home/about-icon.svg'
import instaLogo from '../../images/instaaqarlogo.svg'
import logo from '../../images/auth/logo.svg'
import news from '../../images/home/newsfeed-icon.svg'
import layer from '../../images/home/layer-icon.svg'
import Button from 'react-bootstrap/Button'
import {useEffect, useState} from 'react'
import {Select} from '../tools/select-with-image/select'
import UK from '../../images/auth/Uk.svg'
import {useTranslation} from 'react-i18next'
import Arabic from '../../images/auth/arabia.svg'
import {useNavigate} from 'react-router-dom'
import collapse from '../../images/home/collabse.svg'
let languages=[{title:"English",icon:UK},{title:'Arabic',icon:Arabic}]
interface iProps {
    token?:{token:string,full_name:string}
    ,removeToken:Function,collapsed:boolean
    ,setCollapsed:Function
}

export const SidebarLg =(
    {
        token
        ,removeToken
        ,collapsed
       ,setCollapsed
    }:iProps
    )=>{
    const {i18n,t} = useTranslation()
    const [selected,setSelected]=useState(0)

    const [logedIn ,setLogedIn]=useState(false)
    const navigate = useNavigate()
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
     const handleLogin =()=>{

        setLogedIn(true)
        navigate('/auth')
    
    }
    const hanldeRoutes= (num:number)=>{
        setSelected(num)
        switch(num) {
            case 0:
                navigate('/')
                break;
            case 1 :
                navigate('/news')
                break;
            default :
                navigate('/')


        }
        
    }

    const handleCollapse =()=>{

    }
 let mainCol=12
 let logoMainCol=12   
 let col=10
 if (collapsed) {
    col=12
    mainCol=10
    logoMainCol=12
 }
    return (
        <Row className="sidebarContainer flex-column gy-1 p-1 d-none d-sm-flex">
            
            <Col xs={logoMainCol} className="logoContainer ">
                <Row>
                    <Col xs={9}
                    className="d-flex">
                        
                         <img src={collapsed?  logo:instaLogo} 
                         className= {collapsed? "logo" :'logoWithName'}
                         />
                         
                    </Col>
                    <Col xs={3}
                    onClick={()=>setCollapsed(!collapsed)}
                    className="d-flex justify-content-center align-items-center">
                        <img src={collapse} 
                            className={collapsed? "collapseBtn open":"collapseBtn" }
                        />
                    </Col>

                </Row>
            </Col>
        <Col xs={mainCol} className="sidebarItems"
          
        >
          
                
                <Col xs={mainCol}>
                    <Row  className="gy-1 "> 
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(0)}
                        className={collapsed? 'd-flex justify-content-center':''}
                        >
                            <div 
                            className={selected === 0? "item focused":"item "}
                            >
                                <img src={home} className="icon"/> 

                               { !collapsed &&(<>
                                
                                    <span  >{t("Home")}</span>
                                    <div className="empty"></div>
                                </>
                                )}
                            </div>
                            
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(1)}
                    
                        >
                            <div 
                            className={selected === 1? "item focused":"item "}
                            >

                            <img src={news} className="icon" />
                               { !collapsed &&
                                (<>
                                    <span  >{t("NewsFeed")}</span>
                                    <div className="empty"></div>
                                </>)
                                }
                            </div>
                
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(2)}
                        >
                            <div
                                className={selected === 2? "item focused":"item "}
                            >

                                <img src={search} className="icon" />
                                <span >{t("Search")}</span>
                                <div className="empty"></div>
                            </div>
                            
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(3)}>
                            <div className={selected === 3? "item focused":"item "}>

                                <img src={profile} className="icon" />
                            
                                <span >{t("Profile")}</span>
                            
                            </div>
                            
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(4)}>
                            <div className={selected === 4? "item focused":"item "}>

                                <div className="iconContainer">
                                    <div className="dot"></div>
                                    <img src={notification} className="icon" />
                                </div>
                                
                            
                                <span >{t("Notifications")}</span>
                                <div  className="notification">10</div>
                            </div>
                            
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(5)}>
                            <div className={selected === 5? "item focused":"item "}>

                                <div className="iconContainer">
                                    <div className="dot"></div>
                                    <img src={messages} className="icon" />
                                </div>    
                            
                                <span >{t("Messages")}</span>
                                <span  className="notification">10</span>
                            </div>
                        
                        </Col>
                        <Col xs={col} 
                        onClick={()=>hanldeRoutes(6)}>
                            <div className={selected === 6? "item focused":"item "}>

                                <img src={about} className="icon"  />
                                <span >{t("AboutInsta")}</span>
                            </div>
                        </Col>
                        <Col xs={col}
                        className={collapsed?'collapse':'show'}
                        >
                            <Button className='postBtn Btn'>
                                <div className="plus">+</div>
                                {t("PostProperty")}
                            </Button>
                        </Col>
                    </Row> 
                </Col>
                <Col xs={12}
                 className={collapsed?'collapse':'show'}
                >
          
                   <Col xs={9}>
                         <Select 
                        options={languages}
                        onChange={handleLanguage}
                        lang={i18n.language}
                        />

                    </Col>
                    <Col xs={9}>
                 {
                        token?.token?
                        <Button className="logoutBtn Btn"
                        onClick={()=>removeToken()}>
                            <img src={layer} />
                            <span>
                                {t("Logout")}
                            </span>
                        </Button>
                        :
                        <Button className="loginBtn Btn"
                        onClick={handleLogin}>
                            
                            <span>
                            {t("Login")}
                            </span>
                        </Button> 
                    
                 }
                    </Col>
               
                </Col>
        
            
        </Col>
       
       
       
    </Row>
       
    )
}