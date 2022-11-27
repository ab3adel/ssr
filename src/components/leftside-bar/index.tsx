import React ,{ useEffect ,useState}  from 'react'
import './leftside-bar.scss'
import {getLocalStorage} from '../tools/getLocalstorage'
import {useNavigate} from 'react-router-dom'
const LeftSideBar= (props:any)=>{
  

    return (
        <>
            {
                props.children.map((child:any,index:number)=>{
                    if (getLocalStorage() && getLocalStorage().role) {
                        return (React.cloneElement(child,{authenticated:true,key:index}))
                    }
                    else {
                        return (React.cloneElement(child,{authenticated:false,key:index}))
                    }
                })
            }
        </>
    )
}
export default LeftSideBar;