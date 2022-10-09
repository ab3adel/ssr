import './header.scss'
import {HeaderSm} from './header-sm'
import {HeaderLg} from './header-lg'
import authContext from '../tools/context/auth-context/auth-context'
import {useState, useEffect,useContext} from 'react'
const Header =()=>{

const {token,setToken}=useContext(authContext)
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