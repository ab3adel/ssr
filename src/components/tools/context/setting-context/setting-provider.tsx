
import SettingContext from './setting-context'
import {useState} from 'react'

const SettingProvider =(props:any)=>{
    const [openSidebar,setOpenSidebar]=useState(false)
    return (
        <SettingContext.Provider
        value={
            {
                openSidebar,
               setOpenSidebar
        }
        }>
            {props.children}
        </SettingContext.Provider>
    )
}
export default SettingProvider;