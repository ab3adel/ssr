import {Form} from 'react-bootstrap'
import {iInput} from '../../interface'
import {useTranslation} from 'react-i18next'
import './steady-icon.scss'
import React, { useState } from 'react'

export const SteadyIconInput =(
    {
        value="",handleBlur,onChange,
        disabled,icon,label,name,height
    }:iInput
)=>{
    const {i18n}=useTranslation()
 
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(typeof(onChange)==='function') {

            onChange(e)
        }
      
    }
return (
    <Form className="steadyIconInput">
            <Form.Group 
       
            >
                <Form.Text>
                         
                                  
                                    <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}
                                    className="fw-bold label">
                                    {label}
                                    </span>
                            
                </Form.Text>
                <div className={`input-container ${disabled?'px-4':'px-2'}`}>
                    {icon && (<img src={icon} className="inputIcon" />) }
                    <Form.Control
                    as={'input'}
                    name={name}
                    onChange={handleChange}
                    value={value} 
                    type={'text'}
                    style={{direction:i18n.language=='ar'?'rtl':'ltr'}}
                    disabled={disabled}
                    className="px-2"
                    
                    
                    />
               
                </div>
            </Form.Group>
    </Form>
)
}