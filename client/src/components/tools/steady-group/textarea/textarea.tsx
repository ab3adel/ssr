import './textarea.scss'
import {iText} from '../../interface'
import Form from 'react-bootstrap/Form'
import {useTranslation} from 'react-i18next'
import React from 'react'
export const TextArea =({value,setValue,label,name,disabled}:iText)=>{
const {i18n}=useTranslation()
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    let value = {en:e.target.value,ar:e.target.value}
    setValue(name,value)
}
return (
            <Form className="steadyTextArea">
            <Form.Group 

            >
                <Form.Text>
                        
                                
                                    <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}
                                    className="fw-bold label">
                                    {label}
                                    </span>
                            
                </Form.Text>
                <div className={`input-container ${disabled?'px-4':'px-2'}`}>
                 
                    <Form.Control
                    as={'textarea'}
                    name={name}
                    onChange={handleChange}
                    value={value} 
                    type={'text'}
                    style={{direction:i18n.language=='ar'?'rtl':'ltr'}}
                    disabled={disabled}
                    className="px-2"
                    rows={3}
                    
                    
                    />
            
                </div>
            </Form.Group>
        </Form>
)
}