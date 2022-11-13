
import SettingContext from './setting-context'
import {useState,useEffect} from 'react'

const SettingProvider =(props:any)=>{
    const [openSidebar,setOpenSidebar]=useState(false)
    const [mobileView,setMobileView]=useState(true)
    let cb=  () =>{
   
        if (window.innerWidth > 567) {
          setMobileView(false)
        }
        else {
          setMobileView(true)
        }
      }
      useEffect(() => {
        
        cb()
        window.addEventListener('resize',cb,false)
        return ()=>{
          window.removeEventListener('resize',cb)
        }
       
      }, []);
    return (
        <SettingContext.Provider
        value={
            {
                openSidebar,
               setOpenSidebar,
               mobileView,
               setMobileView
        }
        }>
            {props.children}
        </SettingContext.Provider>
    )
}
export default SettingProvider;