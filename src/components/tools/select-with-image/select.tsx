import './select.scss'

import Dropdown from 'react-bootstrap/Dropdown'
import React, { useState } from 'react'
interface iEle {title:string,icon?:string}
interface iProps {options:iEle [],onChange?:Function,lang?:string}
export const Select=({options,onChange,lang}:iProps)=>{
    const [selected,setSelected]=useState(lang==='ar'?1:0)
    const handleClick=(index:number)=>{
        setSelected(index)
        if (typeof(onChange) !== 'undefined'){
            onChange(index)
        }

    }
    return (
        <div className="customSelect">
            <Dropdown
               >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <Dropdown.Item
              className="optionStyle">
                 {
                                options[selected].icon? <img src={options[selected].icon} className="icon"/>:''
                }
                            <span>{options[selected].title}</span>
              </Dropdown.Item>
            </Dropdown.Toggle>

            <Dropdown.Menu
            >
                {
                options.map((ele:iEle,index:number)=>{
                    return (
                        <Dropdown.Item 
                        value={ele.title}
                        className="optionStyle"
                        onClick={()=>handleClick(index)}
                        key={index}
                        >
                            {
                                ele.icon? <img src={ele.icon} className="icon"/>:''
                            }
                            <span>{ele.title}</span>
                        </Dropdown.Item>
                    )
                })
            }
            </Dropdown.Menu>
            </Dropdown>
        
        </div>

    )
}