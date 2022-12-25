import { useState } from 'react'
import './code-input.scss'

interface iProps {value:string,setValue:Function}
export const CodeInput =({value,setValue}:iProps)=>{

const handleChange=(e:React.ChangeEvent)=>{
    let target =e.target as HTMLInputElement
    let reg= new RegExp (/^\d+$/)
    if (reg.test(target.value) || target.value==='')setValue(target.value)
    else {
        return
    }
    
}
    return (
        <input 
        className='codeInput'
        value={value}
        maxLength={6}
        onChange={handleChange}

        />
    )
}