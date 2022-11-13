import './select.scss'
import MySelect from 'react-bootstrap/Form'
import React , {useState,useEffect, ReducerAction} from 'react'
import {useTranslation} from 'react-i18next'
import {Form, Spinner} from 'react-bootstrap'
import './select.scss'


interface iProps {label:string
    ,handleChange?:(e:React.ChangeEvent)=>void
    ,options:any[]
    ,name:string
    ,disabled:boolean,
    value:any,
    exteriorFunction?:Function,
    touched?:boolean,
    error?:string,
    handleBlur:(e:React.FocusEvent)=>void
}

export const SteadySelect=({label,options
                     ,name
                     ,handleChange
                     ,disabled
                     ,value
                     ,exteriorFunction=()=>{}
                     ,touched=false
                     ,error=''
                     ,handleBlur
                    }:iProps)=>{
   
    const {i18n,t} =useTranslation()
   const [selection,setSelection]=useState(options )
   const [selected,setSelected]=useState(0)


useEffect(()=>{
if (Array.isArray(value)) {
    if (value.length>0)setSelected(value[0].id)
    else {
        setSelected(0)
    }
}
else{
   if (value) setSelected(value.id)
}
},[value])
const handleSelect=(e:React.ChangeEvent<any>)=>{
    let target =e.target as HTMLSelectElement

    setSelected(parseInt(target.value))
    exteriorFunction(parseInt(target.value))
}

    return (
        <Form className="steadySelect">
            <Form.Group>
                <Form.Text>
                         
                                  
                    <span  style={i18n.language==='ar'?{right:'5%'}:{left:'5%'}}
                    className="fw-bold label">
                    {label}
                    </span>
                 
                </Form.Text>
                <MySelect.Control
                    className={ "mySelect " }
                    onChange={handleSelect}
                    as={'select'}
                    disabled={disabled}
                    name={name}
                    style={i18n.language ==="ar"?{backgroundPosition:"left 0.75rem center"}:{backgroundPosition:"right 0.75rem center"}}
                    value={selected}
                    isInvalid={touched && Boolean(error)}
                    onBlur={handleBlur}
                >
{/*                     
                     <option className="label"   disabled={true} value={0} >
                          {t("Choose")}
                        </option>
                  */}
                    
                    
                    {
                        options && options.length>0 ?
                        options.map((ele,index)=>{
                        
                            return <option 
                                value={ele.id} 
                            
                                key={index}>
                                {i18n.language==='en'?ele.name.en:ele.name.ar}
                                </option>
                        })
                        :"" }
                    
                </MySelect.Control>
               { (touched && Boolean(error)) &&
                (<span className="error"
                style={i18n.language==='en'?{left:'auto',right:'20%'}:{left:'20%',right:'auto'}}>
                    {error}
                </span>)
                }
            </Form.Group>
        </Form>
    )

}
