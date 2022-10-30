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
    ,disabled:boolean
}

export const SteadySelect=({label,options
                     ,name
                     ,handleChange
                     ,disabled
                    }:iProps)=>{
   
    const {i18n} =useTranslation()
   const [selection,setSelection]=useState(options )



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
                onChange={handleChange}
                as={'select'}
                disabled={disabled}
                name={name}
                style={i18n.language ==="ar"?{backgroundPosition:"left 0.75rem center"}:{backgroundPosition:"right 0.75rem center"}}
             
                >
                    
                    <option className="label" selected disabled={true} >
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
            </Form.Group>
        </Form>
    )

}
