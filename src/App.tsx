import React, { useContext, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { Rotues } from "./components/tools/routes";
import { useRoutes } from "react-router-dom";
import { Notify } from "./components/tools/toast";
import notificationContext from "./components/tools/context/notification/notification-context";
import { useNavigate } from "react-router-dom";
import authContext from "./components/tools/context/auth-context/auth-context";
import { apis } from "./components/tools/apis/apis";
import axios from "./components/tools/apis/axios";
function App() {
  const { i18n } = useTranslation();
 
  const navigate = useNavigate();
  const { notify, setNotify } = useContext(notificationContext);
  const { token, setToken } = useContext(authContext);
  let routes = useRoutes(Rotues(token.role));

  const handleCloseNotify = () =>
    setNotify((pre: any) => ({ ...pre, show: false }));
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    } else {
      let token_object=JSON.parse(localStorage.getItem("token") as string)
      let refresh_token = token_object.refresh_token;
      setToken((pre:any)=>({...pre,...token_object}))
      getRememberMe(refresh_token);
      setInterval(() => getRememberMe(refresh_token), 40000000);
    }
  }, []);
console.log(localStorage.getItem('token'))
  const getRememberMe = (token: string) => {
    console.log('fetching')
    let formdata = new FormData();
    formdata.append("remember_me_token", token);
    axios
      .post(apis.rememberMe, formdata)
      .then((res) => {
        if (res.data) {
         let realImage=''
          if (res.data.payload.profile_picture) {
            let image_array = res.data.payload.profile_picture.split("/").map((ele: string) => {
              if (ele === "public") {
                return "storage";
              }
              return ele;
            });
             realImage = 'https://backend.instaaqar.com/' +image_array.join("/");
          
          
           
          }
          let required_data = {
            token: res.data.payload.token,
            full_name: res.data.payload.full_name,
            refresh_token: res.data.payload.refresh_token,
            role: res.data.payload.roles[0].id,
            profile_picture:realImage
          };
          setToken((pre: any) => ({
            ...pre,
            ...required_data,
           
          }));
          localStorage.setItem("token", JSON.stringify(required_data));
        }
      })
      .catch((err) => console.log(err));
  };
 
  return (
    <div
      className="App"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      {routes}
      <Notify {...notify} close={handleCloseNotify} />
    </div>
  );
}

export default App;
