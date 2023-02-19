import NotificaitonContext from "./notification-context";
import {useState} from 'react'

const NotificationProvider= (props:any)=>{
    const [notify,setNotify]=useState({message:'Your submit was success'
                                ,type:true
                                ,show:false
                            })

    return (
        <NotificaitonContext.Provider
        value={{notify,setNotify}}>
            {props.children}

        </NotificaitonContext.Provider>
    )                        
}
export default NotificationProvider;