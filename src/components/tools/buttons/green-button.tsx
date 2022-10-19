import React from 'react'
import './button.scss'

interface iProps {label:string,fun?:Function,height?:string,children?:React.ReactNode}
export const  GreenButton =({label,fun,height,children}:iProps)=>{
    const handleClick=()=>{
        if (typeof(fun)==='function') {
            fun()
        }
    }
    return (
        <button className="buttonGreen" style={height?{height}:{}}
        onClick={handleClick}
        >
          

            <>
            {children}
            </>
           <span className="mx-1">{label}</span> 
        </button>
    )
}