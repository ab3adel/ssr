import './layout.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Container  from 'react-bootstrap/Container'
import Header from '../header'
import LeftSideBar from '../leftside-bar'
import {SidebarLg} from '../leftside-bar/sidebar-lg'
import {SidebarSm} from '../leftside-bar/sidebar-sm'
import authContext from '../tools/context/auth-context/auth-context'
import {useState,useEffect,useContext} from 'react'
import {Outlet} from 'react-router-dom'

const Layout = ()=>{
   
    const [collapsed,setCollapsed]=useState(false)
   const {token,setToken}=useContext(authContext)
    const removeToken=()=>{
            localStorage.removeItem('token')
            setToken((pre:any)=>{})
            window.location.reload()
            
        }
let sidebarCol = 2
let mainCol_lg =10
let mainCol_md=10
if (collapsed) {
    sidebarCol=1
    mainCol_lg=10
    mainCol_md=11
}
    return(
        <>
      
        <Container fluid className="layoutContainer">
            <Row>
                <Col sm={sidebarCol} className="sidebarSection" >
                    <LeftSideBar>
                           <SidebarLg 
                              token={token}
                              removeToken={removeToken}
                              collapsed={collapsed}
                              setCollapsed={setCollapsed}
                              />
                    
                            <SidebarSm 
                               token={token}
                               removeToken={removeToken}/>
                    </LeftSideBar>
                </Col>
                <Col lg={mainCol_lg} md={mainCol_md} xs={12}
                className="otherSection"
               >

                    <Col xs={12}>
                       <Header />
                    </Col>
                    <Col xs={12}
                     className="mainSection">
                        <Outlet />
                    </Col>
                </Col>
            </Row>
        </Container>
        </>
      
    )
}

export default Layout;