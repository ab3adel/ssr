
import Form from 'react-bootstrap/Form'
import './text.scss'
import {useTranslation} from 'react-i18next'
import {iText} from '../../interface'

export const TextArea =({
    setValue,
    name,
    error,
    touched,
    value,
    handleBlur,
    label
}:iText)=>{
    const {t,i18n}= useTranslation()
    const handleChange=(e:React.ChangeEvent)=>{
        let input = e.target as HTMLInputElement
        let obj={en:input.value,ar:input.value}
        setValue(name,obj)
    }
    
    return (
        <div className="floatedText">
           { label && (<div className={ "label float" }>{label}</div>)}
            <Form.Control
            style={i18n.language === 'en'?{direction:"ltr"}:{direction:"rtl"}}
            className="input"
                as="textarea" 
                placeholder={label}
                rows={3}
                size={'lg'}
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