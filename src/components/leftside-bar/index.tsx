import React ,{ useEffect }  from 'react'
import './leftside-bar.scss'
import {getLocalStorage} from '../tools/getLocalstorage'
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