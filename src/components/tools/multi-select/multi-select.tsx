import './multi-select.scss'
import {MultiSelect}  from 'react-multi-select-component'
import {useState} from 'react'

interface iProps {
    label:string,options:any[]
    ,setSelect:Function,error?:string
    ,touched?:boolean,name:string,handleBlur:Function,
    needCategory?:boolean
}

export const  MyMultiSelect= ({
                               label,options,setSelect
                              ,error,touched,name,handleBlur,needCategory}:iProps)=>{
const [selected,setSelected]=useState([])
const menuToggleHandler=()=>{
    handleBlur(name,true)
}
const handleChange=(e:any)=>{
let ids=e.map((ele:any)=> ele.value)
setSelect('category_ids',ids)

setSelected(e)
}

    return (
        <div className={(Boolean(error) && touched) ? "myMultiSelectContainer invalid":"myMultiSelectContainer"}>

            <MultiSelect 
             className={selected.length>0  ?"myMultiSelect selected":"myMultiSelect"}
             labelledBy={label}
             value={selected}
             onChange={handleChange}
             options={options}
             onMenuToggle={menuToggleHandler}
             disabled={needCategory? options.length >0? false:true:true}
            />
            
               { (Boolean(error) && touched) ? (
                    <span className='invalid'> {error}</span>):''
                }
        </div> 
    )
}