import './select.scss'
import MySelect from 'react-bootstrap/FormSelect'
import React , {useState} from 'react'
import {useTranslation} from 'react-i18next'

interface iProps {label:string,options?:any[]}

export const Select=({label,options}:iProps)=>{
    const [hasSelection,setHasSelection]=useState(false)
    const {i18n} =useTranslation()
  
const handleSelect=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setHasSelection(true)
    if(e.target.value) {
        setHasSelection(true)
    }
    
}
    return (
        <MySelect
         className={hasSelection? "mySelect hasSelection":"mySelect label" }
        onChange={handleSelect}
        style={i18n.language ==="ar"?{backgroundPosition:"left 0.75rem center"}:{backgroundPosition:"right 0.75rem center"}}
        
        >
            <option className="label" selected disabled={true} >{label}</option>
            {
                options && options.length>0 ?
                options.map((ele,index)=>{
                    return <option value={ele} key={index}>{ele}</option>
                })
                :""
            }
        </MySelect>
    )

}
