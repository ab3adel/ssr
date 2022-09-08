import React from 'react'
import Form from 'react-bootstrap/Form'
import Camera from '../../../images/auth/Icon-camera.svg'
import person from '../../../images/auth/profile.svg'
import './photoInput.scss'
import {useState} from 'react'
export const InputFile =()=>{
    const [uploadedImage,setUploadedImage]=useState('')
    const handleFile=()=>{
        let input = document.querySelector('#input') as HTMLInputElement
        input.click()
    }
    const handleChange=(e:React.ChangeEvent)=>{
        let input = e.target as HTMLInputElement
        let file =null
        if (input.files && input.files?.length >0) {
            file= input.files[0]
        }
        if (file) {

            let objUrl = URL.createObjectURL(file)
            setUploadedImage(objUrl)

        }
   
    }
    return (
        <Form.Group className="photoInput">
            <div className="iconContainer"
               onClick={handleFile}
              >
                {
                    uploadedImage?
                    <img src={uploadedImage} className="profile" />:
                    <img src={person} className=" person"/>

                }
                
                <div className="cameraContainer icon">
                    <img src={Camera} className=" camera" />
                </div>
            </div>
            <Form.Control
            type={'file'}
            className="input"
            id="input"
            onChange={handleChange}
            />
        </Form.Group>
    )
}