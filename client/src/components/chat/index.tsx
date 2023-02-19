import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import React, { useEffect, useState, useRef, useContext } from "react";

import { InputWithIcon } from "../tools/input/inputIcon";
import search from "../../images/input-search-icon.svg";
import { useTranslation } from "react-i18next";
import user from "../../images/auth/profile.svg";
import sendIMG from "../../images/send.svg";
import ContactElement from "./contactElement";
import ChatHeader from "./chatHeader";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./chat.scss";
import chatContext from "../tools/context/chat-context/chat-context";
import { getLocalStorage } from "../tools/getLocalstorage";
import { chatData } from "../tools/context/chat-context/chat-provider";
import { useLocation } from "react-router-dom";
import { CheckCircle, CheckCircleFill, Circle } from "react-bootstrap-icons";
import Input from "react-bootstrap/Form";

import SettingContext from "../tools/context/setting-context/setting-context";

interface iLocationState {
  action: string;
  body: any;
}
export interface activeUserData {
  name: string;
  id: number;
  img?: any;
  online: boolean | number;
  chat_id: string;
}
// export interface chatMessages{
//     user:{img?:any,id:number},
//     messages ?:any[]
// }
type statusType = "delivered" | "seen" | "sending";
interface iMessage {
  date: { en: string; ar: string };
  msg: string;
  sender: { id: number; img: string | null; online: boolean };
  status: string;
}

interface iChatData {
  error: string;
  chats: chatData[];
}
let icons = {
  delivered: <CheckCircle className="chat-msg-status" />,
  seen: <CheckCircleFill className="chat-msg-status" fill="#035222" />,
  sending: <Circle className="chat-msg-status" />,
};
const Chat = () => {
  const { t, i18n } = useTranslation();
  const { socket, chatData, setChatData } = useContext(chatContext);
  const { mobileView } = useContext(SettingContext);
  // 15 id is for test
  const [myId, setMyId] = useState(-1);
  const location = useLocation();
  const [activeChat, setActiveChat] = useState<number>(-1);
  const [acticeChatId, setActiveChatId] = useState<string>("");
  const [activeUser, setActiveUser] = useState<activeUserData | null>(null);
  const [view, setMobileView] = useState<string>("");
  const [contacts, setContacts] = useState<any[]>([]);
  const [checkForUpdate, setCheckForUpdate] = useState(false);

  const bottomRef = useRef<any>(null);
  const [messages, setMessages] = useState<iMessage[]>([]);

  const setActive = (ele: chatData) => {
    let my_id =
      getLocalStorage() &&
      getLocalStorage().id &&
      getLocalStorage().id !== "Guest"
        ? getLocalStorage().id
        : null;
    //setActiveChat(ele.id);

    setActiveChatId(ele.chat_id);

    setActiveUser({
      name: ele.name,
      id: ele.id,
      img: ele.img,
      online: ele.online,
      chat_id: ele.chat_id,
    });
  };

  const formik = useFormik({
    initialValues: {
      msgInput: "",
      search: "",
    },
    validationSchema: Yup.object().shape({
      msgInput: Yup.string(),
    }),
    onSubmit: (values) => {},
  });
  const sendMSG = () => {
    const textmsg: string = formik.values.msgInput;
    if (!textmsg) {
      formik.setErrors({ msgInput: "re" });
    } else {
      //messages.push({ id: (messages.length + 1), msg: textmsg, sender: { id: myId, img: user } })
console.log(myId,acticeChatId)
      socket.emit("send-message", {
        userId: getLocalStorage().id,
        chat_id: activeUser?.chat_id,
        message: textmsg,
      });
      let new_messages: iMessage[] = [...messages];
      new_messages.push({
        date: { en: "", ar: "" },
        msg: textmsg,
        sender: { id: myId, img: "", online: true },
        status: "sending",
      });
      
      if (bottomRef.current) {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
      }
      formik.resetForm();
      setMessages(new_messages);
    }
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
    if (chatData.active_chat && chatData.active_chat.active_user.name) {
      setActiveUser((pre: activeUserData | null) => ({
        ...pre,
        ...chatData.active_chat.active_user,
      }));
      if (mobileView) setMobileView("chatView");
    }
  }, [chatData.active_chat]);
  const handleUserChatActive = (ele: chatData) => {
    socket.emit("set-active-chat", {
      userId: getLocalStorage().id,
      chat_id: ele.chat_id,
    });
    setActive(ele);
    if (mobileView) setMobileView("chatView");
  };

  const handleBack = () => {
    //setChatData((pre:iChatData)=>({...pre,active_chat:{messages:[],active_user:{},chat_id:0}}))
    //socket.emit('set-active-chat',{userId:getLocalStorage().id,chat_id:'0'})
    setActiveChat(0);
    setActiveUser(null);
    setMobileView("contactsView");
    // setMessages([])
  };
  useEffect(() => {
    if (mobileView) setMobileView("contactsView");
    else {
      setMobileView("");
    }
  }, [mobileView]);

  ///////////////////// events ///////////////////////
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  useEffect(() => {
    if (getLocalStorage() && getLocalStorage().id !== "Guest") {
      socket.on("error", (err: any) => {
        setChatData((pre: iChatData) => ({ ...pre, error: err }));
      });
      socket.on("my-active-chat", handleMyActiveChat);
      socket.on("new-message", handleNewMessage);
    }
    return () => {
      socket.off("my-active-chat", handleMyActiveChat);
      socket.off("new-message", handleNewMessage);
      socket.off("error");
    };
  }, []);

  useEffect(() => {
    let new_myId =
      getLocalStorage() && getLocalStorage().id !== "Guest"
        ? getLocalStorage().id
        : null;
    setMyId(new_myId);
    if (location.state) {
      let { action, body } = location.state as iLocationState;
      socket.emit(action, body);
    }
  }, []);

  useEffect(() => {

    let new_contacts = chatData.contacts;
    let new_messages = chatData.active_chat.messages;
    let reversed_messages= []
    let my_id=getLocalStorage().id
    if (chatData.active_chat.chat_id) {
     
      let active_user = chatData.contacts.filter(
        (ele: any) => ele.id === chatData.active_chat.active_user.id
      )[0];
      if (active_user) {
        console.log('triggeredd',active_user)
        if (active_user.myUnreadMsgs > 0) {
          console.log(active_user.myUnreadMsgs)
          let i= active_user.myUnreadMsgs
        reversed_messages=[...new_messages].reverse()
        reversed_messages.forEach(ele=>{
          if (ele.sender.id === my_id && i !== 0){
            ele.status='delivered'
            i=i-1
          }
        })
         
        }
        else {
          new_messages.forEach((ele:any)=>{
            if (ele.sender.id === my_id && ele.status==='delivered')
               ele.status='seen'
          })
        }
        setActiveUser(active_user);
      }
    }
    if (reversed_messages.length>0)setMessages(reversed_messages.reverse())
    else {

      setMessages(new_messages);
    }
    setContacts(new_contacts);
  }, [chatData]);
  useEffect(() => {
    if (formik.values.search && Boolean(formik.values.search)) {
      let new_contacts = contacts.filter((ele) =>
        (ele.name as string)
          .toLowerCase()
          .includes(formik.values.search.toLowerCase())
      );
      setContacts(new_contacts);
    } else {
      setContacts(chatData.contacts);
    }
  }, [formik.values.search]);
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [messages]);
  const handleMyActiveChat = ({ data }: { data: any }) => {
   
    let myId = getLocalStorage().id;
    let last_phase_array: any[] = [];
    let unseen_msgs = 0;
    let new_activechat: any = { messages: [], chat_id: 0, active_user: {} };
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as const;
    let user = "user_1";

    let messages = data.messages.map((ele: any) => {
      let updated_at = {
        en: new Date(ele.updated_at).toLocaleDateString("en-US", options),
        ar: new Date(ele.updated_at).toLocaleDateString("ar-EG", options),
      };

      return {
        sender: {
          id: parseInt(ele.sender),
          img: ele.sender_data[0].profiel_img_url
            ? ele.sender_data.profiel_img_url
            : user,
          online: ele.sender_data[0].online,
        },
        msg: ele.message,
        date: updated_at,
        status: "seen",
      };
    });
    new_activechat.messages = messages;
    user = parseInt(data["user_1"]) === myId ? "user_2" : "user_1";
    if (data[`${user}_unreaded_messages`] > 0) {
      unseen_msgs = data[`${user}_unreaded_messages`];
    }

    //  for (let i=1 ; i<= unseen_msgs ; i++) {
    //      for (let j=new_activechat.messages.length-1 ;j >=0 ;j--) {
    //       if (new_activechat.messages[j].sender.id === myId && new_activechat.messages[j].status ==='seen' ) {
    //           new_activechat.messages[j].status='delivered'
    //           break
    //       }
    //      }
    //  }

    new_activechat["chat_id"] = data.id;
    new_activechat["active_user"] = {
      name: data[`${user}_data`][0]["name"],
      id: parseInt(data[`${user}_data`][0]["sql_id"]),
      img: data[`${user}_data`][0]["profiel_img_url"]
        ? "https://backend.instaaqar.com/" +
          data[`${user}_data`][0].profiel_img_url
        : null,
      online: data[`${user}_data`][0]["online"],
    };

    setChatData((pre: iChatData) => ({ ...pre, active_chat: new_activechat }));
    socket.emit("get-chats", myId);
    //setActiveChatId(new_activechat.chat_id)
  };
  const handleNewMessage = ({ data }: { data: any }) => {
 
    let myId = getLocalStorage().id;
    socket.emit("get-chats", myId);

    let new_messages = [...messages];
    if (chatData.active_chat.chat_id === data.chat_id) {
      new_messages.push({
        sender: {
          id: parseInt(data.from.sql_id),
          img: data.from.profiel_img_url
            ? "https://backend.instaaqar.com/" + data.from.profiel_img_url
            : null,
          online: data.from.online,
        },
        status: "delivered",
        msg: data.message,
        date: { en: "", ar: "" },
      });
    
      //setMessages(new_messages)
      /*setChatData((pre: any) => ({
        ...pre,
        active_chat: { ...pre.active_chat, messages: new_messages },
        new_message:data
        
      }));*/
    }
  };


  return (
    <Col xs={12} className="homeContainer" key={activeUser?.name}>
      <Row
        className={`p-1 chatRow ${
          i18n.language === "ar" && "chatRowAr"
        }  ${view} `}
      >
        <Col
          xs={12}
          sm={4}
          className="d-flex justify-content-center align-items-center contactsCol"
        >
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

          {contacts?.length > 0 ? (
            <Row className="allContactsRow">
              {contacts.map((ele: chatData) => (
                <Col md={12} key={ele.id}>
                  <ContactElement
                    ele={ele}
                    activeChat={activeChat}
                    setActiveChat={() => handleUserChatActive(ele)}
                    setInActiveChat={() =>
                      handleUserChatActive({
                        chat_id: "0",
                        name: "",
                        id: 0,
                        img: null,
                        online: false,
                      })
                    }
                  />
                </Col>
              ))}
            </Row>
          ) : null}
        </Col>
        {/* d-flex justify-content-center align-items-center */}
        <Col xs={12} sm={7} className=" chatCol" key={activeUser ? 1 : 0}>
          {activeUser && activeUser.name ? (
            <>
              <Row>
                <Col col={12} className="chatHeaderRow">
                  <ChatHeader activeUser={activeUser} />
                  <div className="backToContacts" onClick={() => handleBack()}>
                    {i18n.language === "ar" ? (
                      <i className="bi bi-arrow-return-right"></i>
                    ) : (
                      <i className="bi bi-arrow-return-left"></i>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="divider "></div>
              <Row className="p-2 my-2 chatMessages" ref={bottomRef}>
                {messages.map((ele: any, index: number) => (
                  <Col md={12} key={index}>
                    <div
                      className={`chatMSG ${
                        myId !== ele.sender.id ? "formOtherUser" : ""
                      }`}
                    >
                      <div
                        className="chatimgCont"
                        style={{
                          visibility:
                            messages[index + 1] &&
                            ele.sender.id === messages[index + 1].sender.id
                              ? "hidden"
                              : "visible",
                        }}
                      >
                        <img src={ele.img || user} className="chatIMG"></img>
                        {myId !== ele.sender.id ? (
                          <div
                            className={`statusCircleChat ${
                              activeUser?.online ? "online" : "d-none"
                            }`}
                          ></div>
                        ) : null}
                      </div>

                      <div
                        className={`chatMSgText ${
                          myId === ele.sender.id
                            ? "iAmSender"
                            : "otherUserSender"
                        } 
                                            ${
                                              messages[index + 1] &&
                                              ele.sender.id ===
                                                messages[index + 1].sender.id
                                                ? "dublicateSender"
                                                : ""
                                            }
                                            `}
                      >
                        {ele.msg}
                      </div>

                      {myId === ele.sender.id
                        ? icons[ele.status as statusType]
                        : null}
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
                    as={"textarea"}
                    className="msgInput"
                    value={formik.values.msgInput}
                    onChange={handleInputValue}
                  />
                </Col>
                <Col xs={2} className="px-0   ">
                  <button
                    className="sendMSGBTN"
                    onClick={() => {
                      sendMSG();
                    }}
                  >
                    <img src={sendIMG} />
                    {t("Send")}
                  </button>
                </Col>
              </Row>
            </>
          ) : (
            <div>No User Selected</div>
          )}
        </Col>

        <div className="spacer"></div>
      </Row>
    </Col>
  );
};
export default Chat;
