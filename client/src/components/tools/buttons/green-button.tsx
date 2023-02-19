import React from 'react'
import './button.scss'
import { Spinner } from '../spinner'
interface iProps {label:string,fun?:Function,height?:string,children?:React.ReactNode,loading?:boolean}
export const  GreenButton =({label,fun,height,children,loading}:iProps)=>{
    const handleClick=()=>{
        if (typeof(fun)==='function') {
            fun()
        }
    }
    return (
        <button className="buttonGreen" style={height?{height}:{}}
        onClick={handleClick}
        disabled={loading}
        >
          

            <>
            {children}
            </>
           <span className="mx-1">{
          loading? <Spinner/>: label
           }</span> 
        </button>
    )
}