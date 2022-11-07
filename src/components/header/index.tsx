import './header.scss'
import {HeaderSm} from './header-sm'
import {HeaderLg} from './header-lg'
import authContext from '../tools/context/auth-context/auth-context'
import {useState, useEffect,useContext} from 'react'
import { getLocalStorage } from '../tools/getLocalstorage'
import { iToken } from '../tools/interface'
const Header =()=>{
const [token,setToken]=useState<iToken>()
useEffect(()=>{
   
if (getLocalStorage()) {
setToken(getLocalStorage())
}
},[])

    return (
       <>
       <HeaderLg 
       token={token}
       />
       <HeaderSm 
       token={token}/>
       </>
    )
}
export default Header;