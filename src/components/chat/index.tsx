
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
import {CheckCircle,CheckCircleFill} from 'react-bootstrap-icons'
import Input from 'react-bootstrap/Form'
import { getTime } from '../tools/getTime';

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
    const [contacts,setContacts]=useState<any[]>([])
    
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
        let my_id= getLocalStorage() && getLocalStorage().id && getLocalStorage().id !=='Guest'? 
          getLocalStorage().id:null
        //setActiveChat(ele.id);
        setActiveChatId(ele.chat_id)
        
        setActiveUser({
            name: ele.name,
            id: ele.id,
            img: ele.img,
            online: ele.online
        })
    
        socket.emit('set-active-chat',{userId:my_id,chat_id:ele.chat_id})
       
    }, [])
    const active = React.useMemo<number>(() => { return activeChat }, [activeChat])
    const activeUserMem: activeUserData | null = React.useMemo(() => { return activeUser }, [activeUser])
    const formik = useFormik({
        initialValues: {
            msgInput: '',
            search:''
        },
        validationSchema: Yup.object().shape({
            msgInput: Yup.string(),
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
        if (chatData.active_chat&& chatData.active_chat.active_user.name) {
            setActiveUser(pre=>({...pre,...chatData.active_chat.active_user}))
        }
    }, [chatData.active_chat]);
    const handleUserChatActive = (ele: chatData) => {
        setActive(ele)
        window.innerWidth <= 575 && setMobileView("chatView")
    }

    const handleBack = () => {
        setChatData((pre:iChatData)=>({...pre,active_chat:{messages:[],active_user:{},chat_id:0}}))
        setActiveChat(0)
        setActiveUser(null)
        
        setMobileView("contactsView")
    }
    ///////////////////// events ///////////////////////
    const handleInputValue=(e:React.ChangeEvent<HTMLInputElement>)=>{

        formik.setFieldValue(e.target.name,e.target.value)
    }
    useEffect(()=>{
        if (getLocalStorage() && getLocalStorage().id !== 'Guest'){
            let my_id=getLocalStorage() && getLocalStorage().id !== 'Guest'?getLocalStorage().id:null
            
            socket.on('error',(err:any)=>{
             
                setChatData((pre:iChatData)=>({...pre,error:err}))
            })
            socket.on('my-active-chat',({data}:{data:any})=>{
         
               let last_phase_array:any[]=[]
               let unseen_msgs=0
               let new_activechat:any={messages:[],chat_id:0,active_user:{}}
                const options = { year: 'numeric', month: 'short', day: 'numeric' } as const
                let user='user_1'
               
                let messages= data.messages.map((ele:any)=>{
                    let updated_at={
                        en:new Date(ele.updated_at).toLocaleDateString('en-US',options),
                        ar:new Date(ele.updated_at).toLocaleDateString('ar-EG',options)
                    }
                  
                    return ({sender:{
                              id:parseInt(ele.sender)
                              ,img:ele.sender_data[0].profiel_img_url?ele.sender_data.profiel_img_url:user
                            ,online:ele.sender_data[0].online}
                              ,msg:ele.message
                              ,date:updated_at
                              ,unseen:false
                    })
                })
                new_activechat.messages=messages
                user =parseInt(data['user_1'])=== my_id?'user_2':'user_1'
                if ( data[`${user}_unreaded_messages`] >0) {

                    unseen_msgs= data[`${user}_unreaded_messages`]
                }
              
               for (let i=1 ; i<= unseen_msgs ; i++) {
                   for (let j=new_activechat.messages.length-1 ;j >=0 ;j--) {
                    if (new_activechat.messages[j].sender.id === my_id && !new_activechat.messages[j].unseen) {
                        new_activechat.messages[j].unseen=true
                        break
                    }
                   }
               }
             
                new_activechat['chat_id']=data.id
                new_activechat['active_user']={
                    name:data[`${user}_data`][0]['name'],
                    id:parseInt(data[`${user}_data`][0]['sql_id']),
                    img:data[`${user}_data`][0]['profiel_img_url']?
                    'https://backend.instaaqar.com/'+data[`${user}_data`][0].profiel_img_url:null,
                    online:data[`${user}_data`][0]['online']
                }
              
                
                setChatData((pre:iChatData)=>({...pre,active_chat:new_activechat}))
                setActiveChatId(new_activechat.chat_id)
                //etActiveUser(new_activechat['active_user'])
                window.innerWidth <= 575 && setMobileView("chatView")
                socket.emit('get-chats',my_id)
               
            })
             socket.on('new-message',({data}:{data:any})=>{
                socket.emit('get-chats',my_id)
                 setChatData((pre:iChatData)=>({...pre,new_message:data}))
             })
             socket.on('my-chats',({data}:{data:any})=>{
               
               
                 let new_chatData= data.map((ele:any)=>{
                     let unreadMsgs=0
                     let profile_img=''
                     const options = {  year:'numeric',month:'short',day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric' } as const
                     let last_seen = getTime(ele.updatedAt)
                    //  const options = {  year:'numeric',month:'short',day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric' } as const
                    //  let difference=new Date().getTime()- new Date(ele.updatedAt).getTime() 
                    //  let last_seen=''
                    //  if (Math.round(difference/(1000 * 3600 *24 )) > 0) {
                    //      last_seen=Math.round(difference/(1000 * 3600 *24 ))+'day'
                    //  }
                    //  else if (Math.round(difference/(1000 * 3600  )) > 0) {
                    //      last_seen=Math.round(difference/(1000 * 3600  ))+'h'
                    //  }
                    //  else if (Math.round(difference/(1000 * 60  )) > 0) {
                    //      last_seen=Math.round(difference/(1000 * 60  ))+'Min'
                    //  }
                    //  else {
                    //      last_seen=Math.round(difference/(1000))+'Sec'
                    //  }
                 
                     let updated_at=new Date(ele.user_1_data[0].updatedAt).toLocaleDateString('en-US',options as any )
                     let user= parseInt(ele.user_1)=== my_id? 'user_2':'user_1'
                     let myUser= my_id === parseInt(ele.user_1)?'user_1':'user_2'
                     
                   
                     if (ele[`${myUser}_unreaded_messages`]>0) {
                         unreadMsgs=ele[`${myUser}_unreaded_messages`]
                     }
                     if (Boolean(ele[`${user}_data`][0].profiel_img_url)) {
                        
                         profile_img='https://backend.instaaqar.com/'+ele[`${user}_data`][0].profiel_img_url
                     }
                    
                    
                                     return ({
                         name:ele[`${user}_data`][0].name
                         ,id:parseInt(ele[user])
                         ,img:profile_img?profile_img:''
                         ,last_seen:updated_at
                         ,online:ele[`${user}_data`][0].online
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
            socket.on('new-message',({data}:{data:any})=>{
               
                socket.emit('get-chats',my_id)
                let messages = [...chatData.active_chat.messages]
                if (chatData.active_chat.chat_id === data.chat_id) {
                    messages.push({
                        sender:{
                            id:parseInt(data.from.sql_id),
                            img:data.from.profiel_img_url?
                            'https://backend.instaaqar.com/'+ data.from.profiel_img_url:null ,
                            online:data.from.online

                        },
                        unseen:true,
                        msg:data.message

                    })
                    setChatData((pre:any)=>({...pre,active_chat:{...pre.active_chat,messages}}))
                }
                 //setChatData((pre:any)=>({...pre,new_message:data}))
             })
        }


        return ()=>{
            socket.emit('set-active-chat',{userId:getLocalStorage().id,chat_id:'0'})
            socket.removeAllListeners()
        }
    },[])

   useEffect(()=>{
    let new_myId= getLocalStorage() && getLocalStorage().id !== 'Guest'?getLocalStorage().id:null
    setMyId(new_myId)
    if (location.state) {
         let {action,body}=location.state as iLocationState
        socket.emit(action,body)
    }
   },[])
    useEffect(()=>{
     
        if (getLocalStorage() && getLocalStorage().id !== 'Guest') {
            socket.emit('i_am_online',getLocalStorage().id )
            socket.emit('get-chats',getLocalStorage().id )
        }

    },[socket.id])
    useEffect(()=>{
        let new_contacts=chatData.contacts
        setContacts(new_contacts)
       
    },[chatData])
    useEffect(()=>{
        if(formik.values.search && Boolean(formik.values.search)) {
            let new_contacts=contacts.filter(ele=>(ele.name as string).toLowerCase().includes(formik.values.search.toLowerCase()))
            setContacts(new_contacts)
        }
        else {
            setContacts(chatData.contacts)
        }
    },[formik.values.search])

   
  console.log(contacts)
   

    return (
        <Col xs={12} className="homeContainer" key={activeUser?.name}  >

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
                                value={formik.values.search}
                                onChange={formik.setFieldValue}
                            />
                        </Col>
                    </Row>

                    {contacts?.length > 0 ? <Row className="allContactsRow">
                        {contacts.map((ele: chatData) => (
                            <Col md={12} key={ele.id}>
                                <ContactElement ele={ele} activeChat={active}
                                    setActiveChat={() => handleUserChatActive(ele)} 
                                    setInActiveChat={
                                        ()=>handleUserChatActive({
                                            chat_id:'0',
                                            name: '',
                                            id: 0, 
                                            img: null,
                                            online: false
                                    })
                                    }
                                    />
                            </Col>
                        ))}
                    </Row>
                        : null}



                </Col>
                {/* d-flex justify-content-center align-items-center */}
                <Col xs={12} sm={7} className=' chatCol'  key={activeUser?1:0} >
                    {activeUser && activeUser.name?
                        <>
                            <Row >
                                <Col col={12} className="chatHeaderRow">
                                    <ChatHeader activeUser={activeUserMem}  />
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
                                {chatData?.active_chat?.messages.map((ele: any, index: number) => (
                                    <Col md={12} key={index}>
                                        <div className={`chatMSG ${myId !== ele.sender.id ? "formOtherUser" : ""}`}>
                                            <div className='chatimgCont'
                                                style={{ visibility: messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "hidden" : "visible" }}>
                                                <img src={ele.img || user} className="chatIMG"></img>
                                                {myId !==ele.sender.id ?
                                                    <div className={`statusCircleChat ${activeUser?.online ? "online" : "d-none"}`}></div>
                                                    : null}

                                            </div>
                                            
                                            <div className={`chatMSgText ${myId === ele.sender.id ? "iAmSender" : "otherUserSender"} 
                                            ${messages[(index + 1)] && ele.sender.id === messages[(index + 1)].sender.id ? "dublicateSender" : ""}
                                            `}>
                                                {ele.msg}
                                              
                                            </div>
                                            
                                          {myId === ele.sender.id ?ele.unseen? 
                                           <CheckCircle className='chat-msg-status' />:
                                           <CheckCircleFill className='chat-msg-status' fill='#035222' />:
                                           null

                                          }

                                        </div>
                                    </Col>
                                ))}
                                {/* <div ref={bottomRef} /> */}
                            </Row>
                            <div className="divider"></div>

                            <Row className="my-3 px-3 msgFormRow">
                                <Col xs={10}>
                                    {/* <InputWithIcon
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

                                    /> */}
                                    <Input.Control 
                                    placeholder={t("Write a message ..")}
                                    name="msgInput"
                                    as={'textarea'}
                                    className="msgInput"
                                    value={formik.values.msgInput}
                                    onChange={handleInputValue}
                                    
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