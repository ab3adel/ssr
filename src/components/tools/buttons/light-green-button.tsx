


import React from 'react'
import './button.scss'

interface iProps {label:string,fun?:Function,height?:string,children?:React.ReactNode,loading?:boolean}
export const  LightGreenButton =({label,fun,height,children,loading}:iProps)=>{
    const handleClick=()=>{
        if (typeof(fun)==='function') {
            fun()
        }
    }
    return (
        <button className="buttonLightGreen" style={height?{height}:{}}
        onClick={handleClick}
        disabled={loading}
        >
          

            <>
            {children}
            </>
           <span className="mx-1">{label}</span> 
        </button>
    )
}