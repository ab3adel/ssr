import './phoneInput.scss'
import Input , {CountryData}from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import {useTranslation} from 'react-i18next'
interface iProps {
    label:string,
    disabled:boolean,
    value:any,
    setFieldValue?:Function,
    name:string,
    exteriorFunction?:Function

}
export const SteadyPhoneInput =({label,disabled,value,setFieldValue=()=>{},exteriorFunction=()=>{},name}:iProps)=>{
    const [currentValue,setCurrentValue]=useState({phone:'',international_code:''})
    const {i18n,t} =useTranslation()
const handleChange= (e:string,data:any)=>{

    setCurrentValue({phone:e,international_code:data.dialCode})
}
const addNumber =()=>{
   
  exteriorFunction(currentValue)
    setCurrentValue({phone:'',international_code:''})
}

    return (
        <Form className="steadyPhoneInput">
            <Form.Text >
                <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}
                                    className="fw-bold label">
                                    {label}
                 </span>
            </Form.Text>
            <div className="relativeContainer"> 
                <Input 
                value={currentValue.phone}
                onChange={(value:string,data:any,event:any,formattedValue:any)=>handleChange(value,data)}
                disabled={disabled}
                country="kw"
                inputStyle={{'direction':i18n.language ==='en'?"ltr":'rtl'
                ,padding:i18n.language==='en'?'0 0 0 25px':'0 25px 0 0 '}}
                />
               { !disabled &&
                (<div className="addNumber"
                onClick={()=>addNumber()}
                style={i18n.language==='ar'?{right:'auto',left:'1rem'}:{left:'auto',right:'1rem'}}
                >
                    {t('Add')}
                </div>)
                }
            </div>
      
          </Form>
    )
}