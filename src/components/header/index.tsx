import './header.scss'
import {HeaderSm} from './header-sm'
import {HeaderLg} from './header-lg'
import authContext from '../tools/context/auth-context/auth-context'
import {useState, useEffect,useContext} from 'react'
import { getLocalStorage } from '../tools/getLocalstorage'
import { iToken } from '../tools/interface'
import ContactElement from '../tools/contact-element/contact-element'
import NotificationContainer from '../tools/notification-container/notification-container'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
interface iReadableObjItem{title:{en:string,ar:string},value:string}
interface iReadableObj {[key :string]:iReadableObjItem}
export interface iProps {
    token?: iToken;
    chat_notification:number;
    handleNotificationClick:(e:React.MouseEvent)=>void,
    setSearch:Function,
    handleSearch:(key:React.KeyboardEvent)=>void,
    search:string,
    headerNavigation:(str:string)=>void,
    openSearch?:boolean,
    setOpenSearch?:Function
  }
interface myProps {chatData:any,socket:any}  
const Header =({chatData,socket}:myProps)=>{
const [token,setToken]=useState<iToken>()
const [setActiveChat,activeChat]=useState(0)
const [openSearch,setOpenSearch]=useState(false)
const navigate =useNavigate()
const formik=useFormik({
  initialValues:{search:''},
  onSubmit:()=>{}
})


const [notificationControl,setNotificationControl]=useState({show:false,left:0,top:0})

useEffect(()=>{
   
if (getLocalStorage()) {
setToken(getLocalStorage())
}
},[])
const handleNotificationClick=(e:React.MouseEvent)=>{
  if(getLocalStorage() && getLocalStorage().id !== 'Guest') {

setNotificationControl(pre=>({...pre,show:!pre.show,left:e.clientX-120,top:e.clientY+30}))
  }
}
const handleActiveChat=(ele:any)=>{
  if(getLocalStorage() && getLocalStorage().id !== 'Guest') {
    
    socket.emit('set-active-chat',{userId:getLocalStorage().id,chat_id:ele.chat_id})
    navigate('/messages')
    setNotificationControl(pre=>({...pre,show:false}))

  }
}
const handleSearch=(key:React.KeyboardEvent)=>{
 
  if (key.key === 'Enter' ) {
    let readableObj:iReadableObj={}
     readableObj['text']={title:{en:'Posts',ar:'منشورات'},value:formik.values.search}
     readableObj['user_name']={title:{en:'Accounts',ar:'حسابات'},value:formik.values.search}
    let url=`/filteredposts/quicksearch=1?quicksearch=1&text=${formik.values.search}&user_name=${formik.values.search}`
    sessionStorage.setItem('search_params',JSON.stringify(readableObj) )
    navigate(url)
    formik.resetForm()
    setOpenSearch(false)
  }

}
const headerNavigation=(str:string)=>{
  if (str==='home') {
    navigate('/')
  }
  if (getLocalStorage() && getLocalStorage().id && getLocalStorage().id !== 'Guest'){

    
    if (str==='profile') {
      navigate('/profile')
    }
  }
}

    return (
       <>
       <HeaderLg 
       token={token}
       chat_notification={chatData.notification.total_number}
       handleNotificationClick={handleNotificationClick}
       setSearch={formik.setFieldValue}
       handleSearch={handleSearch}
       search={formik.values.search}
       headerNavigation={headerNavigation}
       />
       <HeaderSm 
       token={token}
       chat_notification={chatData.notification.total_number}
       handleNotificationClick={handleNotificationClick}
       setSearch={formik.setFieldValue}
       handleSearch={handleSearch}
       search={formik.values.search}
       headerNavigation={headerNavigation}
       openSearch={openSearch}
       setOpenSearch={setOpenSearch}
       />
        <NotificationContainer
         show={notificationControl.show} 
        left={notificationControl.left} 
        top={notificationControl.top} 
        RenderElement={ ContactElement }
        data={chatData.contacts}
        elementClicked={handleActiveChat}
       
        
        />
       </>
    )
}
export default Header;