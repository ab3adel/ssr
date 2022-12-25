import './textarea.scss'
import Input from 'react-bootstrap/Form'
import {useTranslation} from 'react-i18next'
import React from 'react'
import {iText} from '../interface'

export const Textarea =({
    value,error,touched,
    setValue,name,handleBlur,
    className

}:iText)=>{
const {t,i18n}= useTranslation()
const handleChange=(e:React.ChangeEvent)=>{
    let input = e.target as HTMLInputElement
    let obj={en:input.value,ar:input.value}
    setValue('description',obj)
}

    return (
        <div className={`textareaContainer ${className}`}>
                <Input.Control
                style={i18n.language === 'en'?{direction:"ltr"}:{direction:"rtl"}}
                 className="input"
                    as="textarea" 
                    placeholder={t('Description')}
                    rows={3}
                    onChange={handleChange}
                    isInvalid={Boolean(error) }
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