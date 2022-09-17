
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './forms.scss'
import { Textarea } from '../../../tools/textarea/textarea'
import {FileInput} from '../../../tools/fileInput/fileInput'
import {ManyPhotosInput} from '../../../tools/many-photo-input/many-photo-input'
import { useState } from 'react'
import Delete from '../../../../images/delete-icon.svg'
import {useTranslation} from 'react-i18next'

import {InitialValues,iTouched,iErrors} from '../initial-values'
import { Formik } from 'formik'
interface iFile {en:string,ar:string}
interface iProps {
                 touched:Partial<iTouched>
                 ,errors:Partial<iErrors>
                 ,values:Partial<InitialValues>
                 ,handleBlur:Function
                 ,setValue:Function
                 ,requiredFiles: iFile []
                 ,setField:Function
                }
export const RequiredFilesForm =(
    {
        touched,
        errors,
        values,
        handleBlur,
        setValue,
        requiredFiles,
        setField
}:iProps)=>{
    const {t,i18n}=useTranslation()
const [images,setImages]=useState([])
const deleteImage=(num:number)=>{
    let arr =[...images].filter((ele,index)=>index !== num)
    setImages(arr)
}

    return (
        <Row className="requiredFilesContainer gy-3">
            <Col sm={8} xs={12}>
                <Textarea 
                touched={touched.description as boolean}
                error={errors.description as string}
                value={values.description}
                setValue={setValue}
                handleBlur={handleBlur}
                name="description"
                />
            </Col>
            
          {   requiredFiles.length >0 &&  
             (  <>
                            <Col sm={8} xs={12}>
                                <div className="text">
                                    {t("RequiredFiles")}
                                </div>
                            </Col>
                            {
                                requiredFiles.map((ele,index)=> (
                                    <Col sm={8} xs={12}
                                    key={index}>
                                        <FileInput 
                                        label={i18n.language ==='en'?ele.en : ele.ar}
                                        name="files"
                                        value={values.files}
                                        setValue={setField}
                                        error={errors.files as string}
                                        touched={touched.files as boolean}
                                        handleBlur={handleBlur}
                                        fileName={{en:ele.en,ar:ele.ar}}

                                        />
                                </Col>
                                ))
                            }
                        
                            
                </>
                )
                }
            <Col sm={8} xs={12}>
                <div className="text">
                {t("PredifinedPostPictures")}
                </div>
            </Col>
            <Col sm={8} xs={12}>
                <ManyPhotosInput
                images={images}
                setImages={setImages} 
                value={values.predefined_post_pictures}
                error={values.predefined_post_pictures}
                setValue={setValue}
                name="predefined_post_pictures"
                />

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