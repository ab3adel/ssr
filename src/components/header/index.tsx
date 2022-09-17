import './header.scss'
import {HeaderSm} from './header-sm'
import {HeaderLg} from './header-lg'

import {useState, useEffect} from 'react'
const Header =()=>{
const [auth,setAuth]=useState({token:'',full_name:''})

useEffect(()=>{
if (localStorage.getItem('token')){
    let token_string=localStorage.getItem('token') as string
    let token=JSON.parse(token_string)
    setAuth(pre=>token)

}
},[])
    return (
       <>
       <HeaderLg 
       token={auth}
       />
       <HeaderSm 
       token={auth}/>
       </>
    )
}
export default Header;