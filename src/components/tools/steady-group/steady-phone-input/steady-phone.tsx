import './phoneInput.scss'
import Input , {CountryData}from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import {useTranslation} from 'react-i18next'
interface iProps {
    label:string,
    disabled:boolean
}
export const SteadyPhoneInput =({label,disabled}:iProps)=>{
    const [value,setValue]=useState('')
    const {i18n} =useTranslation()
const handleChange= (e:string)=>console.log(e)
console.log('input')
    return (
        <Form className="steadyPhoneInput">
            <Form.Text >
                <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}
                                    className="fw-bold label">
                                    {label}
                 </span>
            </Form.Text>
            <Input 
             value={value}
             onChange={(value:string,data:any,event:any,formattedValue:any)=>handleChange(value)}
             disabled={disabled}
            />
      
          </Form>
    )
}