
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import React, { useEffect, useState, useRef,useContext } from 'react'

import { InputWithIcon } from "../tools/input/inputIcon";
import search from "../../images/input-search-icon.svg";
import { useTranslation } from "react-i18next";
import user from "../../images/auth/profile.svg";
import sendIMG from "../../images/send.svg";
import ContactElement from "./contactElement"
import ChatHeader from "./chatHeader"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './chat.scss'
import chatContext  from '../tools/context/chat-context/chat-context'
import { getLocalStorage } from '../tools/getLocalstorage'
import {chatData} from '../tools/context/chat-context/chat-provider'
import {useLocation} from 'react-router-dom'

interface iLocationState {action:string,body:any}
export interface activeUserData {
    name: string,
    id: number,
    img?: any,
    online: boolean | number,
}
// export interface chatMessages{
//     user:{img?:any,id:number},
//     messages ?:any[]
// }


interface iChatData {error:string,chats:chatData[]}

const Chat = () => {
    const { t, i18n } = useTranslation();
    const {socket,chatData,setChatData} =useContext(chatContext)
    // 15 id is for test 
    const [myId,setMyId] = useState(-1)
    const location =useLocation()
    const [activeChat, setActiveChat] = useState<number>(-1)
    const [acticeChatId,setActiveChatId]=useState<string>('')
    const [activeUser, setActiveUser] = useState<activeUserData | null>(null)
    const [mobileView, setMobileView] = useState<string>(window.innerWidth <= 575 ? "contactsView" : "")
    
    const bottomRef = useRef<any>(null);
    const [messages, setMessages] = useState<any>([
        { id: 1, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna" },
        { id: 2, sender: { id: 1, img: user, online: true }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna" },
        { id: 3, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet" },
        { id: 4, sender: { id: 15, img: user }, msg: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut l" },
    ])
    // const [page, setPage] = useState(1)
    // const postsId = useRef<number[]>([])
    // const { getPosts, getPostsData, getPostsError, isGetPostsLoading } = useGetPosts()
    const setActive = React.useCallback((ele: chatData) => {
        setActiveChat(ele.id);
        setActiveChatId(ele.chat_id)
        setActiveUser({
            name: ele.name,
            id: ele.id,
            img: ele.img,
            online: ele.online
        })
        console.log('active chat emitting')
        socket.emit('set-active-chat',{userId:myId,chat_id:ele.chat_id})
    }, [])
    const active = React.useMemo<number>(() => { return activeChat }, [activeChat])
    const activeUserMem: activeUserData | null = React.useMemo(() => { return activeUser }, [activeUser])
    const formik = useFormik({
        initialValues: {
            msgInput: ''
        },
        validationSchema: Yup.object().shape({
            msgInput: Yup.string().required(),
        }),
        onSubmit: values => { },
    })
    const sendMSG = () => {
        const textmsg: string = formik.values.msgInput
        if (!textmsg) { formik.setErrors({ msgInput: "re" }) }
        else {
            //messages.push({ id: (messages.length + 1), msg: textmsg, sender: { id: myId, img: user } })
       
            socket.emit('send-message',{userId:myId,chat_id:acticeChatId,message:textmsg})
            formik.resetForm()
        }

    }
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollTop = bottomRef.current.scrollHeight
        }
    }, [messages.length, activeUser]);
    const handleUserChatActive = (ele: chatData) => {
        setActive(ele)
        window.innerWidth <= 575 && setMobileView("chatView")
    }

    const handleBack = () => {
        setChatData((pre:iChatData)=>({...pre,active_chat:[]}))
        setActiveChat(-1)
        setActiveUser(null)
        
        setMobileView("contactsView")
    }
    ///////////////////// events ///////////////////////
    useEffect(()=>{
        if (getLocalStorage() && getLocalStorage().id !== 'Guest'){
            let my_id=getLocalStorage() && getLocalStorage().id !== 'Guest'?getLocalStorage().id:null
            
            socket.on('error',(err:any)=>{
             
                setChatData((pre:iChatData)=>({...pre,error:err}))
            })
            socket.on('my-active-chat',({data}:{data:any})=>{
               
                const options = { year: 'numeric', month: 'short', day: 'numeric' } as const
                
                let new_activechat= data.messages.map((ele:any)=>{
                    let updated_at={
                        en:new Date(ele.updated_at).toLocaleDateString('en-US',options),
                        ar:new Date(ele.updated_at).toLocaleDateString('ar-EG',options)
                    }
                    return ({sender:{
                              id:parseInt(ele.sender)
                              ,img:ele.sender_data.profiel_img_url?ele.sender_data.profiel_img_url:user
                            ,online:ele.sender_data.online}
                              ,msg:ele.message
                              ,date:updated_at
                    })
                })
              
                
                setChatData((pre:iChatData)=>({...pre,active_chat:new_activechat}))
            })
            socket.on('new-message',({data}:{data:any})=>{
            
                setChatData((pre:iChatData)=>({...pre,new_message:data}))
            })
            socket.on('my-chats',({data}:{data:any})=>{
               let unreadMsgs=0
               let profile_img=''
                let new_chatData= data.map((ele:any)=>{
                    const options = {  year:'numeric',month:'short',day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric' } as const
                    let difference=new Date().getTime()- new Date(ele.updatedAt).getTime() 
                    let last_seen=''
                    if (Math.round(difference/(1000 * 3600 *24 )) > 0) {
                        last_seen=Math.round(difference/(1000 * 3600 *24 ))+'day'
                    }
                    else if (Math.round(difference/(1000 * 3600  )) > 0) {
                        last_seen=Math.round(difference/(1000 * 3600  ))+'h'
                    }
                    else if (Math.round(difference/(1000 * 60  )) > 0) {
                        last_seen=Math.round(difference/(1000 * 60  ))+'Min'
                    }
                    else {
                        last_seen=Math.round(difference/(1000))+'Sec'
                    }
                 
                    let updated_at=new Date(ele.user_1_data[0].updatedAt).toLocaleDateString('en-US',options as any )
                    let user= parseInt(ele.user_1)=== my_id? 'user_2':'user_1'
                    let myUser= my_id === parseInt(ele.user_1)?'user_1':'user_2'
                      
                   
                    if (ele[`${myUser}_unreaded_messages`]>0) {
                        unreadMsgs=ele[`${myUser}_unreaded_messages`]
                    }
                    if (Boolean(ele[`${user}_data`][0].profiel_img_url)) {
                        console.log(ele[`${user}_data`][0].profiel_img_url)
                        profile_img='https://backend.instaaqar.com/'+ele[`${user}_data`][0].profiel_img_url
                    }
                    
                                    return ({
                        name:ele[`${user}_data`][0].name
                        ,id:parseInt(ele[user])
                        ,img:''
                        ,last_seen:updated_at
                        ,online:ele[`${user}_data`].online
                        ,time: last_seen
                        ,chat_id:ele.id
                        ,unreadMsgs
                        ,lastMsg:ele.last_message?.message
                    })
                })
                setChatData((pre:any)=>({...pre,contacts:new_chatData,chats:data}))
            })
            socket.on('my-status',(data:any)=>{
            
                setChatData((pre:iChatData)=>({...pre,status:data}))
            })
        }


        return ()=>{
            
            socket.removeAllListeners()
        }
    },[])

   useEffect(()=>{
    let new_myId= getLocalStorage() && getLocalStorage().id !== 'Guest'?getLocalStorage().id:null
    setMyId(new_myId)
    if (location.state) {
         let {action,body}=location.state as iLocationState
         console.log(body)
        socket.emit(action,body)
    }
   },[])
    useEffect(()=>{
     
        if (getLocalStorage() && getLocalStorage().id !== 'Guest') {
            socket.emit('i_am_online',getLocalStorage().id )
            socket.emit('get-chats',getLocalStorage().id )
        }

    },[myId])

    console.log(chatData)

    return (
        <Col xs={12} className="homeContainer"  >

            <Row className={`p-1 chatRow ${i18n.language === "ar" && "chatRowAr"}  ${mobileView} `}>

                <Col xs={12} sm={4} className='d-flex justify-content-center align-items-center contactsCol'>
                    <Row className="chatInnerContactRowSearch">
                        <Col md={12}>
                            <InputWithIcon
                                icon={search}
                                label={t("Search")}
                                id="searchChat"
                                name="search"
                                type="text"
                                className="searchChat"
                                required={true}
                            />
                        </Col>
                    </Row>

                    {chatData.contacts?.length > 0 ? <Row className="allContactsRow">
                        {chatData.contacts.map((ele: chatData) => (
                            <Col md={12} key={ele.id}>
                                <ContactElement ele={ele} activeChat={active}
                                    setActiveChat={() => handleUserChatActive(ele)} 
                                    />
                            </Col>
                        ))}
                    </Row>
                        : null}



                </Col>
                {/* d-flex justify-content-center align-items-center */}
                <Col xs={12} sm={7} className=' chatCol' >
                    {activeUser ?
                        <>
                            <Row>
                                <Col col={12} className="chatHeaderRow">
                                    <ChatHeader activeUser={activeUserMem} />
                                    <div className='backToContacts' onClick={() => handleBack()}>
                                        {i18n.language === "ar" ?
                                            <i className="bi bi-arrow-return-right"></i>
                                            :
                                            <i className="bi bi-arrow-return-left"></i>}
                                    </div>
                                </Col>
                            </Row>
                            <div className="divider "></div>
                            <Row className="p-2 my-2 chatMessages" ref={bottomRef} >
                                {chatData?.active_chat?.map((ele: any, index: number) => (
                                    <Col md={12} key={index}>
                                        <div className={`chatMSG ${myId !== ele.sender.id ? "formOtherUser" : ""}`}>
                                            <div className='chatimgCont'
                                                style={{ visibility: messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "hidden" : "visible" }}>
                                                <img src={ele.img || user} className="chatIMG"></img>
                                                {myId !== ele.sender.id ?
                                                    <div className={`statusCircleChat ${activeUser.online ? "online" : "d-none"}`}></div>
                                                    : null}

                                            </div>
                                            <div className={`chatMSgText ${myId === ele.sender.id ? "iAmSender" : "otherUserSender"} 
                                            ${messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "dublicateSender" : ""}
                                            `}>
                                                {ele.msg}
                                            </div>

                                        </div>
                                    </Col>
                                ))}
                                {/* <div ref={bottomRef} /> */}
                            </Row>
                            <div className="divider"></div>

                            <Row className="my-3 px-3 msgFormRow">
                                <Col xs={10}>
                                    <InputWithIcon
                                        label={t("Write a message ..")}
                                        id="msgInput"
                                        name="msgInput"
                                        type="text"
                                        className="msgInput"
                                        required={true}
                                        value={formik.values.msgInput}
                                        onChange={formik.setFieldValue}
                                        // handleBlur={formik.handleBlur}
                                        error={formik.errors.msgInput}
                                        touched={formik.touched.msgInput}

                                    />
                                </Col>
                                <Col xs={2} className="px-0   " >
                                    <button className="sendMSGBTN" onClick={() => { sendMSG() }} >
                                        <img src={sendIMG} />
                                        {t("Send")}</button>
                                </Col>

                            </Row>


                        </>
                        :
                        <div>
                            No User Selected
                        </div>
                    }
                </Col>

                <div className="spacer"></div>
            </Row>

        </Col>
    )

}
export default Chat;