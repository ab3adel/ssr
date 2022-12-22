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
import chatContext from '../tools/context/chat-context/chat-context'
const Layout = ()=>{
   
    const [collapsed,setCollapsed]=useState(false)
   const {token,setToken}=useContext(authContext)
   const {chatData,setChatData,socket} =useContext(chatContext)
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
        useEffect(()=>{
        
            if (getLocalStorage() && getLocalStorage().id !== 'Guest'){
                let myId = getLocalStorage().id
                socket.on('connect',()=>{
                    console.log(socket.id)
                })
                socket.on('my-chats', ({data}:{data:any})=>{
                    console.log(data)
                    let total_number=0
                    let messages_per_user=[{unread_messages:0,chat_id:'0'}]
                    let new_messages_per_user:any[]=[]
                    data.map((ele:any)=>{
                        let user= myId === parseInt(ele.user_1)?'user_1':'user_2'
                      
                        console.log(user,ele[`${user}_unreaded_messages`])
                        if (ele[`${user}_unreaded_messages`]>0) {
                            total_number=total_number+1
                           new_messages_per_user.push({unread_messages:ele[`${user}_unreaded_messages`],chat_id:ele.id})
                        }
                    })
                    setChatData((pre:any)=>({...pre,notification:{total_number,messages_per_user:new_messages_per_user.length>0?new_messages_per_user:messages_per_user}}))
                })
            }
            return ()=>{
                
                socket.removeAllListeners()
            }
        },[])
        useEffect(()=>{
            if (getLocalStorage() && getLocalStorage().id !== 'Guest') {
                socket.emit('i_am_online',getLocalStorage().id)
                socket.emit('get-chats',getLocalStorage().id)
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