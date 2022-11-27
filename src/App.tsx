import React, { useContext, useEffect, useState } from "react";

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
function App() {
  const { i18n } = useTranslation();

  const navigate = useNavigate();
  const { notify, setNotify } = useContext(notificationContext);
  const { token, setToken } = useContext(authContext);
  const [checkToken,setCheckToken]=useState(false)

  let routes = useRoutes(Rotues(token.role));

  const handleCloseNotify = () =>
    setNotify((pre: any) => ({ ...pre, show: false }));

    const getRememberMe=async()=>{
     
      let formdata= new FormData()
        formdata.append('remember_me_token',getLocalStorage()?getLocalStorage().refresh_token:'')


          let response= await axios.post(apis.rememberMe,formdata)
        
                                    
       
         if (response&& response.data && response.data.payload) {
        
          let data =response.data.payload
         
          let real_image= data?.profile_picture
                 let required_data = {
                   token: data.token,
                   full_name: data.full_name,
                   refresh_token: data.refresh_token,
                   role:data?.roles? data.roles[0].id:-1,
                   profile_picture:"https:backend.instaaqar.com/storage/"+ real_image,
                   id:data.id
                 };
                 localStorage.removeItem('token')
                 localStorage.setItem("token", JSON.stringify(required_data));
                 setToken(required_data)
         }
         else {
          navigate("/auth");
         }
       
      
          
    }
  useEffect(() => {
 
    if (getLocalStorage() && getLocalStorage().id === 'Guest') return
     if (!getLocalStorage() || !getLocalStorage().full_name) {
       navigate("/auth");
     } else {
      getRememberMe()
        setInterval(() => getRememberMe(), 800000);
        setToken(getLocalStorage())
     }
     
  }, []);


  return (
    <div
      className="App"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      {routes}
      <Notify {...notify}  close={handleCloseNotify} />
    </div>
  );
}

export default App;
