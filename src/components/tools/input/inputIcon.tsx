import './input.scss'

import  InputGroup  from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import React, { useEffect ,useState} from 'react'
import {useTranslation} from 'react-i18next'

interface iProps {
    icon:any,
    label:string,
    className?:string,
    id:string,
    name:string,
    onChange:any,
    value:string,
    handleBlur:any,
    error?:string,
    touched?:boolean
    type:string

}
export const InputWithIcon =({icon,label,className,id
                              ,name,onChange
                              ,value,handleBlur
                            ,error,touched,type}:iProps) =>{
const [isTyping,setIsTyping]=useState(false)
const {i18n} =useTranslation()
const checkTyping=(e:React.FocusEvent)=>{
    if ((e.target as HTMLInputElement).value === '') {
        setIsTyping(false)
        handleBlur(e)
    }
}

    return (
        <Form.Group
            className={`mb-1 inputGroupWithIcon ${className}`}
            >
                <div className="inputLabel "
                    style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}>
                    {isTyping?"" :
                        <>
                        <i className={`${icon.props.className} inputIcon `} />
                        <span>
                        {label}
                        </span>
                    </>}
                </div>
                
                <Form.Control
                className={ Boolean(error)&& touched? "input is_valid" : "input"}
                onInput={()=>setIsTyping(true)}
                onBlur={checkTyping}
                id={id}
                name={name}
                onChange={onChange}
                value={value} 
                isInvalid={Boolean(error) && touched}
                type={type}
                style={{direction:i18n.language=='ar'?'rtl':'ltr'}}
                />
                {(touched && error) &&(<Form.Control.Feedback>{error}</Form.Control.Feedback>)}
        </Form.Group>
    )
}