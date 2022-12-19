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
import { getLocalStorage } from '../tools/getLocalstorage'
import GuestBar from '../tools/guest-bar/guestBar'

const Layout = ()=>{
   
    const [collapsed,setCollapsed]=useState(false)
   const {token,setToken}=useContext(authContext)
   const [isGeuest,setIsGuest]=useState(false)
    const removeToken=()=>{
            localStorage.removeItem('token')
            setToken((pre:any)=>{})
            window.location.reload()
            
        }
        useEffect(()=>{
            let obj= getLocalStorage()
            if (obj && obj.id !== 'Guest' ) {
    
             
                setIsGuest(false)
            }
            if (!obj) {
                localStorage.setItem('token',JSON.stringify({token:null,full_name:'Guest',id:'Guest'}))
                setIsGuest(true)
            }
            else {
                if (obj && obj.id==='Guest') {
                    setIsGuest(true)
                }
            }
        
        },[])

let sidebarCol_md=2
let mainCol_lg =10

let mainCol_md=10
if (collapsed) {
    
     sidebarCol_md=1
    mainCol_lg=10
    mainCol_md=11
    
}
    return(
        <>
      
        <Container fluid className="layoutContainer">
            <Row>
                <Col  md={sidebarCol_md} className="sidebarSection" >
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
                <Col  lg={mainCol_lg} md={mainCol_md} xs={12}
                className="otherSection"
               >

                    <Col xs={12}>
                       <Header />
                    </Col>
                    <Col xs={12}
                     className="mainSection">
                        <Outlet />
                    </Col>
                    {isGeuest && <GuestBar />}
                </Col>
            </Row>
        </Container>
        </>
      
    )
}

export default Layout;