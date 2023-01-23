import './fileInput.scss'
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from 'react'
import attachment from '../../../images/attachment-icon.svg'
interface iProps {
    value:any,error?:string,
    touched?:boolean,setValue:Function,
    name:string,handleBlur:any,label:string,fileName:{en:string,ar:string},
    fileIndex?:number
}
export const FileInput =({
    label,
    value,
    error,
    touched,
    setValue,
    name,
    handleBlur,
    fileName,
    fileIndex=0

}:iProps)=>{
    const [showFile,setShowFile]=useState(false)
const [file,setFile]=useState<File|null>(null)
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
let input= e.target
if (input.files && input.files.length>0) {
  setFile(input.files[0])
  let files= [...value]
  files.push({file:input.files[0],name:fileName})
  setValue(name,files)
    
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
useEffect(()=>{
if (value && value.length>0) {
setFile(value[fileIndex].file)
}
},[])


    return (
        <div className={Boolean(error)? "fileInputContainer invalid":"fileInputContainer"}
    
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
                        file?
                        file.name:
                         label
                    }
                </div>
            </div>
            <Form.Control 
            className='fileInput'
             id ="fileInput"
             type="file"
             onChange={handleChange}
             isInvalid={Boolean(error)}
            />
          
        </div>
    )
}