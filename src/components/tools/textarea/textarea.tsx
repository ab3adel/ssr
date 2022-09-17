import './textarea.scss'
import Input from 'react-bootstrap/Form'
import {useTranslation} from 'react-i18next'
import React from 'react'
import { ConeStriped } from 'react-bootstrap-icons'
interface iProps {
    value:any,error?:any,
    touched?:boolean,setValue:Function,
    name:string,handleBlur:any
}
export const Textarea =({
    value,error,touched,
    setValue,name,handleBlur

}:iProps)=>{
const {t,i18n}= useTranslation()
const handleChange=(e:React.ChangeEvent)=>{
    let input = e.target as HTMLInputElement
    let obj={en:input.value,ar:input.value}
    setValue('description',obj)
}

    return (
        <div className="textareaContainer">
                <Input.Control
                style={i18n.language === 'en'?{direction:"ltr"}:{direction:"rtl"}}
                 className="input"
                    as="textarea" 
                    placeholder={t('Description')}
                    rows={3}
                    onChange={handleChange}
                    isInvalid={Boolean(error) && touched}
                    onBlur={handleBlur}
                    name={name}
                    value={i18n.language ==='en' ? value.en : value.ar}
               
                    />
                    {
                       ( Boolean(error) && touched)&& (<span className="invalid"> {error.en || error.ar}</span>)
                    }
        </div>
    )
}