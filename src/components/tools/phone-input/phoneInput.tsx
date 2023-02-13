import './phoneInput.scss'
import Input , {CountryData}from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React from 'react'
import {useTranslation} from 'react-i18next'
interface iProps {
    phone:string,internationalCode:string
    ,setValue:Function,error?:string
    ,touched?:boolean ,handleBlur:Function,
   phoneNumberError?:string
}
export const PhoneInput =({phone,internationalCode,handleBlur
                         ,setValue,touched,phoneNumberError}:iProps)=>{
                            const {i18n}=useTranslation()
                            
const handleChange =(value: string, data: {} | CountryData, event: React.ChangeEvent<HTMLInputElement>, formattedValue: string): void=>{
 
    let phone_numbers=[{phone: value.replace((data as CountryData).dialCode,'')
    ,international_code: (data as CountryData).dialCode}]
    
   setValue('phone_numbers',phone_numbers)

    
  
}
const blurHandler =(e:React.FocusEvent)=>{
 handleBlur('phone_numbers',true)
}


    return (
        <div 
        className={ (Boolean(phoneNumberError) && touched) ?"phoneInputContainer invalid" :"phoneInputContainer"}
        style={{direction:'ltr'}}
        >

            <Input 
            onChange={handleChange}
            inputStyle={{'direction':"ltr"
            ,padding:'0 0 0 3rem'}}
            value={`${internationalCode}${phone}`}
            isValid={true}
            onBlur={blurHandler}
            country="kw"
          buttonStyle={{direction:'ltr'}}
         
        
          
            
            
            />
           
                {
                    ( (Boolean(phoneNumberError)) && touched )&& (
                        <span className='feedback'
                        style={i18n.language==='en'?{right:'30%',left:'auto'}:{left:'30%',right:'auto'}}>
                            {phoneNumberError}
                        </span>
                    )

                }
          
      
        </div>
    )
}