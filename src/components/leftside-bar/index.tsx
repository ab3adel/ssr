import './leftside-bar.scss'
import {SidebarLg} from './sidebar-lg'
import {SidebarSm} from './sidebar-sm'

import {useState,useEffect} from 'react'
const LeftSideBar= (props:any)=>{
    const [auth,setAuth]=useState({token:'',full_name:''})
    useEffect(()=>{
        if (localStorage.getItem('token')){
            let token_string=localStorage.getItem('token') as string
            let token=JSON.parse(token_string)
            setAuth(pre=>token)
        
        }},[])
    const removeToken=()=>{
            localStorage.removeItem('token')
            window.location.reload()
            
        }
    return (
        <>
           <SidebarLg 
           token={auth}
           removeToken={removeToken}/>
    
            <SidebarSm 
             token={auth}
             removeToken={removeToken}
            />
        </>
    )
}
export default LeftSideBar;