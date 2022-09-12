import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import upload from '../../../images/upload-icon.svg'

import './many-input.scss'


interface iProps {images:string[] ,setImages:Function}
export const ManyPhotosInput =({images,setImages}:iProps)=>{
    

    const handleChange=(e:React.ChangeEvent)=>{
        let input = e.target as HTMLInputElement
        let file =null
        if (input.files && input.files?.length >0) {
            file= input.files[0]
        }
        if (file) {
            let arr= [...images]
            let objUrl = URL.createObjectURL(file)
            arr.push(objUrl)
            setImages(arr)
        }
   
    }
    const hanldeInput=()=>{
        let input =document.querySelector('#manyInput') as HTMLInputElement
        if (input) {
            input.click()
        }
    }
   
    const handleDragOver=(e:React.DragEvent)=>{
        e.preventDefault()
    }
    const handleDrop=(e:React.DragEvent)=>{
        if (e.dataTransfer.files && e.dataTransfer.files.length>0) {
            let file= e.dataTransfer.files[0]
            if (file) {
                let arr= [...images]
                let objUrl = URL.createObjectURL(file)
                arr.push(objUrl)
                setImages(arr)
            }

        }
    }

    return (
        <Row className="manyPhotosContainer gy-2 m-sm-0 m-1"
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
            <Col xs={12} className="inputContainer">
                <div className="icon"
                onClick={hanldeInput}>
                    <img src={upload} />
                    <span className='text' >
                        Click to upload
                    </span>
                    <span className="faintText" >
                        or drag and drop here
                    </span>
                </div>
                <Form.Control
                type={'file'}
                className="input"
                id="manyInput"
                onChange={handleChange}
                />
            </Col>
            
        </Row>
    )
}