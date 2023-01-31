import "./layout.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Header from "../header";
import LeftSideBar from "../leftside-bar";
import { SidebarLg } from "../leftside-bar/sidebar-lg";
import { SidebarSm } from "../leftside-bar/sidebar-sm";
import authContext from "../tools/context/auth-context/auth-context";
import { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate ,useLocation} from "react-router-dom";
import { getLocalStorage } from "../tools/getLocalstorage";
import GuestBar from "../tools/guest-bar/guestBar";
import chatContext from "../tools/context/chat-context/chat-context";
import { getTime } from "../tools/getTime";
import { iChatData } from "../tools/context/chat-context/chat-provider";
import { useTranslation } from "react-i18next";



const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token, setToken } = useContext(authContext);
  const { chatData, setChatData,socket } = useContext(chatContext);

  const [isGeuest, setIsGuest] = useState(false);
  const navigate = useNavigate();
  const location = useLocation()
  const {i18n}=useTranslation()
  const removeToken = () => {
    localStorage.removeItem("token");
    setToken((pre: any) => {});
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    let obj = getLocalStorage();
    if (obj && obj.id !== "Guest") {
      setIsGuest(false);
    }
    if (!obj) {
      localStorage.setItem(
        "token",
        JSON.stringify({ token: null, full_name: "Guest", id: "Guest" })
      );
      setIsGuest(true);
    } else {
      if (obj && obj.id === "Guest") {
        setIsGuest(true);
      }
    }
  }, []);
  useEffect(() => {
    if (getLocalStorage() && getLocalStorage().id !== "Guest") {
   
      socket.emit("i_am_online", getLocalStorage().id);
      socket.emit("get-chats", getLocalStorage().id);
    }
  }, []);
  useEffect(()=>{
if (getLocalStorage() && getLocalStorage().id && getLocalStorage().id !== 'Guest') {
  if (!location.pathname.includes('/messages')) {
    socket.emit('set-active-chat',{myId:getLocalStorage().id,chat_id:'0'})
  }
}
if (location.pathname.includes('/fail') || location.pathname.includes('/success') ) {
  setIsGuest(false)
}
  },[location])

  useEffect(() => {
    if (getLocalStorage() && getLocalStorage().id !== "Guest") {

      socket.on("connect", () => {
       console.log('is attached')
      });
     socket.on('my-chats',handleMyChats)
     socket.on('new-message',handleMessage)
    }

    return () => {
    socket.off('my-chats',handleMyChats)
    socket.off('new-message',handleMessage)
   socket.off('connect')
    };
  }, []);
  const handleMyChats= ({data}:{data:any}) => {

    let myId = getLocalStorage().id;
    let total_number = 0;
    let messages_per_user = [{ unread_messages: 0, chat_id: "0" }];
    let new_messages_per_user: any[] = [];

    let new_chatData = data.map((ele: any) => {
      let unreadMsgs = 0;
      let profile_img = "";
      let myUnreadMsgs=0
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      } as const;
      let difference =
        new Date().getTime() - new Date(ele.updatedAt).getTime();
      let last_seen = "";
      if (Math.round(difference / (1000 * 3600 * 24)) > 0) {
        last_seen = Math.round(difference / (1000 * 3600 * 24)) + "day";
      } else if (Math.round(difference / (1000 * 3600)) > 0) {
        last_seen = Math.round(difference / (1000 * 3600)) + "h";
      } else if (Math.round(difference / (1000 * 60)) > 0) {
        last_seen = Math.round(difference / (1000 * 60)) + "Min";
      } else {
        last_seen = Math.round(difference / 1000) + "Sec";
      }

      let updated_at = new Date(
        ele.user_1_data[0].updatedAt
      ).toLocaleDateString("en-US", options as any);
      let user = parseInt(ele.user_1) === myId ? "user_2" : "user_1";
      let myUser = myId === parseInt(ele.user_1) ? "user_1" : "user_2";

      if (ele[`${myUser}_unreaded_messages`] > 0) {
        total_number = total_number + 1;
        new_messages_per_user.push({
          unread_messages: ele[`${myUser}_unreaded_messages`],
          chat_id: ele.id,
        });
      }
      if (ele[`${myUser}_unreaded_messages`] > 0) {
        unreadMsgs = ele[`${myUser}_unreaded_messages`];
      }
      if (ele[`${user}_unreaded_messages`] > 0) {
        myUnreadMsgs = ele[`${user}_unreaded_messages`];
      }
      if (Boolean(ele[`${user}_data`][0].profiel_img_url)) {
        profile_img =
          "https://backend.instaaqar.com/" +
          ele[`${user}_data`][0].profiel_img_url;
      }

      return {
        name: ele[`${user}_data`][0].name,
        id: parseInt(ele[user]),
        img: profile_img ? profile_img : "",
        last_seen: updated_at,
        online: ele[`${user}_data`][0].online,
        time: last_seen,
        chat_id: ele.id,
        unreadMsgs,
        lastMsg: ele.last_message?.message,
        myUnreadMsgs
      };
    });
    let new_chatData1= data.map((ele:any)=>{
        let unreadMsgs=0
        let profile_img=''
        const options = {  year:'numeric',month:'short',day: 'numeric',hour:'numeric',minute:'numeric',second:'numeric' } as const
        let last_seen = getTime(ele.updatedAt,i18n.language)
      
        let updated_at=new Date(ele.user_1_data[0].updatedAt).toLocaleDateString('en-US',options as any )
        let user= parseInt(ele.user_1)=== myId? 'user_2':'user_1'
        let myUser= myId === parseInt(ele.user_1)?'user_1':'user_2'
        
      
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
  
    setChatData((pre: any) => ({
      ...pre,
      contacts: new_chatData,
      contacts_2:new_chatData1,
      chats: data,
      notification: {
        total_number,
        messages_per_user:
          new_messages_per_user.length > 0
            ? new_messages_per_user
            : messages_per_user,
      },
    }));
  }
  const handleMessage =({data}:{data:any})=>{
    
    let myId = getLocalStorage().id;
   
    setChatData((pre:any)=>({...pre,new_message:data}))
  }




  let sidebarCol_md = 2;
  let mainCol_lg = 10;

  let mainCol_md = 10;
  if (collapsed) {
    sidebarCol_md = 1;
    mainCol_lg = 10;
    mainCol_md = 11;
  }


  return (
    <>
      <Container fluid className="layoutContainer">
        <Row>
          <Col md={sidebarCol_md} className="sidebarSection">
            <LeftSideBar>
              <SidebarLg
                token={token}
                removeToken={removeToken}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                chat_notification={chatData.notification.total_number}
              />

              <SidebarSm
                token={token}
                removeToken={removeToken}
                chat_notification={chatData.notification.total_number}
              />
            </LeftSideBar>
          </Col>
          <Col lg={mainCol_lg} md={mainCol_md} xs={12} className="otherSection">
            <Col xs={12}>
              <Header chatData={chatData} socket={socket} />
            </Col>
            <Col xs={12} className="mainSection">
              <Outlet />
            </Col>
            {isGeuest && <GuestBar />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
