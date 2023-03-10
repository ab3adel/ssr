import React, { useContext, useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { Rotues } from "./components/tools/routes";
import { useRoutes } from "react-router-dom";
import { Notify } from "./components/tools/toast";
import notificationContext from "./components/tools/context/notification/notification-context";
import { useNavigate } from "react-router-dom";
import authContext from "./components/tools/context/auth-context/auth-context";
import { apis } from "./components/tools/apis/apis";
import axios from "./components/tools/apis/axios";
import { BrowserRouter as Router  } from 'react-router-dom'
import StaticRouter from 'react-router-dom/server'
import { getLocalStorage } from "./components/tools/getLocalstorage";
import SEO from "./components/tools/seo";
interface iProps {context?:any,location?:any}
let TheRouter:any= StaticRouter
if (typeof (window) !== typeof(undefined)) {
  TheRouter=Router
}
else {
  TheRouter=StaticRouter
}
function App({context,location}:iProps) {
  const { i18n } = useTranslation();
  const { notify, setNotify } = useContext(notificationContext);
  const { token, setToken } = useContext(authContext);
  let timer= useRef<any>().current
  let routes = useRoutes(Rotues(token.role));

  const handleCloseNotify = () =>
    setNotify((pre: any) => ({ ...pre, show: false }));

    const getRememberMe=async()=>{
      if (getLocalStorage() && getLocalStorage().id === 'Guest') return
      let formdata= new FormData()
        formdata.append('remember_me_token',getLocalStorage()?getLocalStorage().refresh_token:'')
        timer=setTimeout(()=>getRememberMe(),2000000)
          let response= await axios.post(apis.rememberMe,formdata)
        
                                    

         if (response&& response.data && response.data.payload) {
          if (!response.data.payload.email_verified_at) {

            setNotify((pre:any)=>(
              {...pre,show:true,
                message:i18n.language==='en'?'Please you have to validate your Email ':
                ' ?????????? ????????  ?????????? ?????????????? ??????????    ',
                type:'info'
              }))
          }
          let data =response.data.payload
          let realImage=null
          if (response.data.payload.profile_picture) {
            realImage = response.data.payload.profile_picture
              .split("")
              .slice(7)
              .join("");
          }
         
                 let required_data = {
                   token: data.token,
                   full_name: data.full_name,
                   refresh_token: data.refresh_token,
                   role:data?.roles? data.roles[0].id:-1,
                   profile_picture:realImage?"https://backend.instaaqar.com/storage/"+ realImage:null,
                   id:data.id,
                   phone_numbers: response.data.payload.phone_numbers,
                   categories:response.data.payload.company?.categories,
                   forgot_password:response.data.payload.forgot_password
                 };
                 localStorage.removeItem('token')
                 localStorage.setItem("token", JSON.stringify(required_data));
                 setToken(required_data)
         }
         else {
          let required_data = {
            token: null,
            full_name:"Guest",
            id:"Guest",
           
          };
          localStorage.setItem("token", JSON.stringify(required_data));
          setToken(required_data)
         }
       
      
          
    }
  useEffect(() => {
    getRememberMe()
    sessionStorage.setItem('washere','1')    
        return () =>{
          clearTimeout(timer)
        }

 
  }, []);


  return (
    <TheRouter  context={context} location={location}>
    <SEO 
    name="InstaAqar"
    description={`

    ?????????????????? ?????????? ?????????? ???? ???? ???? ?????? ???????????????? ???? ?????? ?????????? ??????????
    ???????????????? ?????? ?????????? ???????? ???????????? ??????????????????
    ?????? , ??????????,?????? , ???? ???????????? 
    `}
    title="InstaAqar"
    type="article"
    
    />
    <div
      className="App"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      {routes}
      <Notify {...notify}  close={handleCloseNotify} />
    </div>
    </TheRouter>
  );
}

export default App;
