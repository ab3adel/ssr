import './fileInput.scss'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import attachment from '../../../images/attachment-icon.svg'
interface iProps {label:string}
export const FileInput =({label}:iProps)=>{
    const [showFile,setShowFile]=useState(false)
const [value,setValue]=useState<File|null>(null)
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
let input= e.target
if (input.files && input.files.length>0) {
  setValue(input.files[0])
    
}
}
const handleInput =(e:React.MouseEvent)=>{
    let parent= (e.target as HTMLSpanElement).offsetParent
    let children= parent?.children
    if (children && children.length>0){

        let input = children[1]
        if (input) {
            (input as HTMLInputElement).click()
        }
    }
    
}


    return (
        <div className="fileInputContainer"
    
        >
            
            <div className="label">
                <div className="icon" 
                   onClick={handleInput}>
                    <img src={attachment} />
                     <span >Upload</span>
                </div>
                <div className={'text'}
                 >
                    {
                        value?
                        value.name:
                         label
                    }
                </div>
            </div>
            <Form.Control 
            className='fileInput'
             id ="fileInput"
             type="file"
             onChange={handleChange}
            />
          
        </div>
    )
}