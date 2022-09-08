import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {InputWithIcon} from '../tools/input/inputIcon'
import search from '../../images/input-search-icon.svg'
import message from '../../images/home/message-icon.svg'
import notification from '../../images/home/bell-icon-1.svg'
import user from '../../images/auth/profile.svg'
import {useTranslation} from 'react-i18next'
export const HeaderLg =()=>{
const {t}=useTranslation()
    return (
        <Navbar className="navbarContainer d-none d-sm-block" expand="lg"
        key={'lg'}>
             <Container className="container" fluid>
            
             
                 <Row className="navbarRow">
                    
                     <Col sm={9} xs={10}>
                         <Row >
                             <Col sm={6} xs={12}>
                                 <InputWithIcon
                                  icon={search}
                                  label={t("SearchLocations")}
                                  id="search"
                                  name='search'
                                  type="text"
                                  className="searchInput"
                                  />
                             </Col>
                         </Row>
                     </Col>
                    
                     <Col sm={3} xs={2} className=" d-sm-flex align-items-center justify-content-center">
                         <Row className="">
                             <Col sm={3} xs={6}>
                                 <div className="iconContainer">
                                     <div className="dot"></div>
                                     <img src={message} className="icon" />
                                 </div>    
                             </Col>
                             <Col sm={3} xs={6}>
                                 <div className="iconContainer">
                                     <div className="dot"></div>
                                     <img src={notification} className="icon" />
                                 </div>
                             </Col>
                             <Col  sm={6} className=" d-none d-sm-flex align-items-center justify-content-between user">
                                 <span>user_33892</span>
                                 <img src={user} className="icon ml-1"/>
                             </Col>
                         </Row>
                     </Col>
                 </Row>
            
             </Container>
         </Navbar>
    )
}