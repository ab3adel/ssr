import './select.scss'
import MySelect from 'react-bootstrap/Form'
import React , {useState,useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {iSelect,iOption} from '../interface'

export const Select=({label,options,setSelect
                     ,name,handleBlur,error
                     ,touched,
                     tempSelect
                     ,multiSelect
                     ,selectedValue
                    }:iSelect)=>{
    const [hasSelection,setHasSelection]=useState(false)
    const {i18n} =useTranslation()
   const [selection,setSelection]=useState(options as iOption[])
  
const handleChange=(e:React.ChangeEvent)=>{
    setHasSelection(true)
    let select= e.target as HTMLSelectElement
    
    if(select.value) {
        setHasSelection(true)
        if (typeof(setSelect) === 'function') {
            let value:any = select.value
            if (!isNaN(select.value as any)) value =parseInt(select.value)
            setSelect(name,value)
            
           
        }
        if (typeof(tempSelect)==='function') {
            tempSelect(select.value)
           if (typeof(setSelect)==='function') setSelect(name,select.value)

        }
    }
}
useEffect(()=>{
    if (options && options.length>0) {
      
        setSelection((pre:any)=>(options as iOption[]))
    }
},[options])
const onBlur=(e:React.FocusEvent)=>{

    if (typeof(handleBlur) === 'function'){
        handleBlur(name,true)
    }
}

    return (
        <MySelect.Control
         className={hasSelection? "mySelect hasSelection":"mySelect label" }
        onChange={handleChange}
        as={'select'}
       value={selectedValue}
        name={name}
        style={i18n.language ==="ar"?{backgroundPosition:"left 0.75rem center"}:{backgroundPosition:"right 0.75rem center"}}
        onBlur={onBlur}
        isInvalid={Boolean(error) && touched}
        multiple={multiSelect}
        >
            
            <option className="label" selected disabled={true} value={0} >
                {selection && selection.length>0 ? <>{label}</>: <>...loading</>}
                </option>
         
               
            
            {
                selection && selection.length>0 ?
                selection.map((ele,index)=>{
                  
                    return <option 
                        value={ele.value} 
                         key={index}>
                        {ele.name}
                        </option>
                })
                :"" }
            
        </MySelect.Control>
    )

}
