import './textarea.scss'
import Input from 'react-bootstrap/Form'
import {useTranslation} from 'react-i18next'
export const Textarea =()=>{
const {t,i18n}= useTranslation()
    return (
        <div className="textareaContainer">
                <Input.Control
                style={i18n.language === 'en'?{direction:"ltr"}:{direction:"rtl"}}
                 className="input"
                    as="textarea" 
                    placeholder={t('Description')}
                    rows={3}/>
        </div>
    )
}