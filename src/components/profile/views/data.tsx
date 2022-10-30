import Delete from '../../../images/delete-icon.svg'
import {useState} from 'react'
import predefinedImage from '../../../images/home/image1.png'
import predefinedImage1 from '../../../images/home/image2.png'
import predefinedImage2 from '../../../images/home/image3.png'
import predefinedImage3 from '../../../images/home/image4.png'
import {ManyPhotosInput} from '../../tools/many-photo-input/many-photo-input'
import { Container ,Row,Col} from "react-bootstrap"
import {FileDownloader} from '../views/file'
import { TextArea } from "../../tools/steady-group/textarea/textarea"
import { ImagesGallery } from "../../tools/imgs-gallery/imgs-gallery"
import {useFormik} from 'formik'
export const Data=()=>{
    const [images,setImages]=useState([predefinedImage,predefinedImage3,predefinedImage1,predefinedImage2])
    const formik= useFormik({
        initialValues:{
            twitter:'myTwitter.com',
            facebook:'myFacebook.com',
            youtube:'myYoutube.com',
            snapchat:'mySnapchat.com',
            tiktok:'myTiktok.com',
            instagram:'myInstagram.com',
            description:'',
            image:[]
        },
        onSubmit:()=>{}
    })
    const deleteImage=(num:number,img:string)=>{
   
        let arr =[...images].filter((ele,index)=>index !== num)
        setImages(arr)
    }
    return (
        <Row className="gy-1 d-flex justify-content-center py-2">
                                        <Col sm={10} xs={11}>
                                            <TextArea name="description" 
                                            label="Description"
                                            value={formik.values.description}
                                            setValue={formik.setFieldValue}
                                            handleBlur={formik.handleBlur}
                                            />
                                        </Col>  
                                        <Col  xs={11}>
                                            <FileDownloader 
                                            edit={true}/>
                                        </Col>  
                                        <Col  xs={11}>
                                            <Row className="gy-2">
                                                <Col xs={12}>
                                                <span className="fw-bold">Predefined Post Pictures</span> 
                                                </Col>
                                                <Col sm={12} xs={12} style={{height:'174px'}}>
                                                    {/* <ImagesGallery
                                                    images={[predefinedImage,predefinedImage3,predefinedImage1,predefinedImage2,]}
                                                    height={'175px'}
                                                    /> */}
                                                    <ManyPhotosInput 
                                                    setValue={formik.setFieldValue}
                                                    images={[predefinedImage,predefinedImage3,predefinedImage1,predefinedImage2]}
                                                    name="image"
                                                    value={formik.values.image}
                                                    setImages={setImages}
                                                    />
                                                </Col>
                                                <Col xs={12}>
                                                <Col xs={12}>
                                                    <Row className="gy-2 gy-sm-0 my-1 my-sm-0">

                                                        {
                                                            images.map((ele,index)=>{
                                                                return (
                                                                    <Col xs={4} key={index}
                                                                    className='uploadedImageContainer'>
                                                                        <div className="deleteIcon"
                                                                        onClick={()=>deleteImage(index,ele)}>
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
                                        </Col>
                               </Row>    
    )
}