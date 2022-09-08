import './input.scss'

import  InputGroup  from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import React, { useEffect ,useState} from 'react'
import {useTranslation} from 'react-i18next'
import see from '../../../images/auth/eye.svg'
import unsee from '../../../images/auth/icon-eye.svg'
interface iProps {
    icon?:any,
    label:string,
    className?:string,
    id:string,
    name:string,
    onChange?:any,
    value?:string | undefined,
    handleBlur?:any,
    error?:string,
    touched?:boolean
    type:string

}
export const InputWithIcon =({icon=null,label,className,id
                              ,name,onChange=()=>{}
                              ,handleBlur=()=>{},value=undefined
                            ,error,touched,type}:iProps) =>{
const [tempValue,setValue]=useState('')
const [isTyping,setIsTyping]=useState(false)
const [showPassword,setShowPassword]=useState(false)
const {i18n} =useTranslation()
const checkTyping=(e:React.FocusEvent)=>{
    if ((e.target as HTMLInputElement).value === '') {
        setIsTyping(false)
        
    }
    handleBlur(e)
}
const handleChange=(e:React.ChangeEvent)=> {
    if (typeof(value) === 'undefined'){

        let input =e.target as HTMLInputElement
        setValue(input.value)
    }
    else {
        console.log('changing')
        onChange(e)
    }

}
const handlePassword=()=>{
setShowPassword(!showPassword)
}

    return (
        <Form.Group
            className={Boolean(error)&& touched? `mb-1 is_valid inputGroupWithIcon ${className}`:`mb-1 inputGroupWithIcon  ${className}`}
            >
                
                 <div className="inputLabel "
                    style={i18n.language==='ar'?{right:'5%',justifyContent:"flex-start"}:{left:'5%',justifyContent:"flex-end"}}>
                       
                       {
                       !isTyping &&
                       (
                        <>
                            {icon && (<img src={icon} className="inputIcon" />) }
                            <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}>
                            {label}
                            </span>
                        </>
                    )
                    }
                </div>
                
                <Form.Control
                className={ "input"}
                onInput={()=>setIsTyping(true)}
                onBlur={checkTyping}
                id={id}
                name={name}
                onChange={handleChange}
                value={typeof(value) !== 'undefined'? value :tempValue} 
               
                type={showPassword?'text':type}
                style={{direction:i18n.language=='ar'?'rtl':'ltr'}}
                onFocus={()=>setIsTyping(true)}
                
                />
                {(touched && error) &&(<Form.Control.Feedback>{error}</Form.Control.Feedback>)}
                {
                    type=== 'password'&&
                    (
                    <img src={showPassword?see:unsee} 
                      className={showPassword ? "passwordIcon see" :'passwordIcon'}
                     style={i18n.language==='ar'?{right:'90%'}:{left:'90%'}}
                     onClick={handlePassword}/>)
                }
        </Form.Group>
    )
}