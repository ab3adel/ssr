import './phoneInput.scss'
import Input , {CountryData}from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React from 'react'
import { setConstantValue } from 'typescript'

interface iProps {
    phone:string,internationalCode:string
    ,setValue:Function,error?:string
    ,touched?:boolean ,handleBlur:Function,
   phoneNumberError?:string
}
export const PhoneInput =({phone,internationalCode,handleBlur
                         ,setValue,touched,phoneNumberError}:iProps)=>{
const handleChange =(value: string, data: {} | CountryData, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string): void=>{

    let phone_numbers=[{phone:value,international_code:(data as CountryData).dialCode}]
   setValue('phone_numbers',phone_numbers)
  
}
const blurHandler =(e:React.FocusEvent)=>{
 handleBlur('phone_numbers',true)
}


    return (
        <div 
        className={touched && (Boolean(phoneNumberError)) ?"phoneInputContainer invalid" :"phoneInputContainer"}
        >

            <Input 
            onChange={handleChange}
            
            value={phone}
            isValid={!touched && !(Boolean(phoneNumberError))}
            onBlur={blurHandler}
            
            />
           
                {
                    (touched && (Boolean(phoneNumberError)) )&& (
                        <span className='feedback'>
                            {phoneNumberError}
                        </span>
                    )

                }
          
      
        </div>
    )
}