
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './forms.scss'
import { Textarea } from '../../../tools/textarea/textarea'
import {FileInput} from '../../../tools/fileInput/fileInput'
import {ManyPhotosInput} from '../../../tools/many-photo-input/many-photo-input'
import { useState } from 'react'
import Delete from '../../../../images/delete-icon.svg'
import {useTranslation} from 'react-i18next'
export const RequiredFilesForm =()=>{
    const {t}=useTranslation()
const [images,setImages]=useState([])
const deleteImage=(num:number)=>{
    let arr =[...images].filter((ele,index)=>index !== num)
    setImages(arr)
}

    return (
        <Row className="requiredFilesContainer gy-3">
            <Col sm={8} xs={12}>
                <Textarea />
            </Col>
            
            <Col sm={8} xs={12}>
                <div className="text">
                    {t("RequiredFiles")}
                </div>
            </Col>
            <Col sm={8} xs={12}>
                <FileInput 
                label={t("File")+" 1"}
                />
            </Col>
            <Col sm={8} xs={12}>
                <FileInput 
                label={t("File")+" 2"}
                />
            </Col>
            <Col sm={8} xs={12}>
                <div className="text">
                {t("PredifinedPostPictures")}
                </div>
            </Col>
            <Col sm={8} xs={12}>
                <ManyPhotosInput
                images={images}
                setImages={setImages} />

            </Col>
            <Col sm={8} xs={12}>
                <Col xs={12}>
                    <Row>

                        {
                            images.map((ele,index)=>{
                                return (
                                    <Col xs={4} key={index}
                                    className='uploadedImageContainer'>
                                        <div className="deleteIcon"
                                        onClick={()=>deleteImage(index)}>
                                            <img src={Delete} 
                                        />
                                        </div>
                                        <img src={ele} className="uploadedImage" />
                                        
                                    </Col>

                                )
                            })
                        }
                    </Row>
                </Col>
            </Col>
            
                
                
            
        </Row>
    )
}