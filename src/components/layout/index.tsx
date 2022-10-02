import './layout.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Container  from 'react-bootstrap/Container'
import Header from '../header'
import LeftSideBar from '../leftside-bar'
import {SidebarLg} from '../leftside-bar/sidebar-lg'
import {SidebarSm} from '../leftside-bar/sidebar-sm'

import {useState,useEffect} from 'react'
import {Outlet} from 'react-router-dom'

const Layout = ()=>{
    const [auth,setAuth]=useState({token:'',full_name:''})
    const [collapsed,setCollapsed]=useState(false)
    useEffect(()=>{
        if (localStorage.getItem('token')){
            let token_string=localStorage.getItem('token') as string
            let token=JSON.parse(token_string)
            setAuth(pre=>token)
        
        }},[])
    const removeToken=()=>{
            localStorage.removeItem('token')
            window.location.reload()
            
        }
let sidebarCol = 2
let mainCol_lg =9
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
                              token={auth}
                              removeToken={removeToken}
                              collapsed={collapsed}
                              setCollapsed={setCollapsed}
                              />
                    
                            <SidebarSm 
                               token={auth}
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