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
import { useGetRememberMe } from "./components/tools/apis/useGetRememberMe";
import { getLocalStorage } from "./components/tools/getLocalstorage";
import SEO from "./components/tools/seo";
function App() {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const { notify, setNotify } = useContext(notificationContext);
  const { token, setToken } = useContext(authContext);
  let timer= useRef<any>().current
  const [checkToken,setCheckToken]=useState(false)

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
                ' يتوجب عليك  تأكيد الايميل رجاءا    ',
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
                   categories:response.data.payload.company.categories
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
        return () =>{
          clearTimeout(timer)
        }
  }, []);


  return (
    <>
    <SEO 
    name="InstaAqar"
    description={`

    انستاعقار خيارك الأول في كل ما يخص العقارات من بيع وشراء واجار
    بالاضافة الى خدمات أخرى مرتبطة بالعقارات
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
    </>
  );
}

export default App;
