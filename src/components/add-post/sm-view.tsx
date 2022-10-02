
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Input} from '../tools/float-label-group/input/input'
import {Select} from '../tools/float-label-group/select/select'
import { TextArea } from '../tools/float-label-group/text/text'
import {ManyPhotosInput} from '../tools/many-photo-input/many-photo-input'
import {Badge} from '../tools/badge/badge'
import {FormikProvider, useFormik} from 'formik'
import './add-post.scss'
import { FormFloating } from 'react-bootstrap'
import {useTranslation} from 'react-i18next'
import {Tabs} from '../tools/tabs/tabs'
import {CheckCircleFill, PhoneLandscape} from 'react-bootstrap-icons'
import {useState,useContext} from 'react'
import {ImagesGallery} from './images-gallery'
import {iProps} from './index'

export const SmallView = (
    {
        postTags,propertyTypes,addPhone,checked
        ,deleteNumber,deleteTag,handlePhone,handleTitle,images,phoneNumber,
        phoneNumbersArray,primary,resetPhone,setChecked,setImages,setPhoneNumber
        ,setPhoneNumbersArray,setPrimary
        ,staticData,t,setFieldValue,values,errors,handleBlur
    }:iProps
)=>{
  
    return (
        <Col xs={12} className="scrollable">
            <Row>

            <Col xs={12}>
                <Row className='gx-2 gy-3'>
                    <Col xs={12} className="pt-3">
                    <Select
                    label='Post Category' />
                    </Col>
                   
                    <Col xs={12} className="p-2 box">
                            <Col xs={12}>
                                <Select label="Post Tags (max-3)"
                                options={postTags} 
                                setSelect={setFieldValue}
                                name="tags_ids"
                                selectedValue={values.tags_ids}
                                multiSelect={true}
                                />
                            </Col>
                            
                                <Col xs={12}>
                                    <Row className="gx-2">
                                    {
                                        values.tags_ids.length >0 ?
                                        values.tags_ids.map((ele:any,index:number)=>{
                                            let item= postTags.filter(elem=>elem.value === parseInt(ele))[0]
                                            return (
                                                <Col xs={4} key={index} >
                                                    <div className='mybadge'>
                                                        <span >
                                                        {item.name}
                                                        </span>
                                                        <div className="icon"
                                                        onClick={()=>deleteTag(ele)}>
                                                            X
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }) 
                                    :''
                                        }
                                    </Row>
                                </Col>
                    </Col>
                    <Col xs={12}>
                        <Input 
                        label={'Post Title'} 
                        name="title"
                        value={values.title.en}
                        onChange={handleTitle}
                        error={errors.title?.en || errors.title?.ar}
                        />
                    </Col>
                    <Col xs={12}>
                        <Row className="gy-2">
                            <Col xs={12} className="greyBack ">
                                <span className="font-weight-bolder"> Property Type</span>
                            </Col>
                            <Col xs={12}>
                               <Tabs 
                                data={propertyTypes}/>
                            </Col>
                        </Row>
                    </Col>
                   <Col xs={12} className="p-1 ">
                    <Row className="gy-2">

                    
                    <Col xs={12} className="greyBack">

                      <span className="font-weight-bolder "> Predefined post picture</span>
                    </Col>
                      <Col xs={12} >
                        <Row className="gy-2">
                            <Col xs={10} className='checkbox'
                            onClick={()=>setChecked(0)}>
                                <Row>
                                    <Col xs={2}
                                    >
                                        <CheckCircleFill 
                                        className={checked===0 ?'checked icon':'unchecked icon'} 
                                    
                                        />
                                    </Col>
                                    <Col xs={10}>

                                    <span>Add your profile picture to post</span>
                                    </Col>
                                </Row>   
                            </Col>
                            <Col xs={10} className='checkbox'
                                onClick={()=>setChecked(1)}>
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleFill 
                                        className={checked===1 ?'checked icon':'unchecked icon'} 
                                    
                                        />
                                    </Col>
                                    <Col xs={10}>
                                        <span>Set your profile picture as primary</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <ManyPhotosInput 
                                images={images}
                                setImages={setImages}
                                name="images"
                                setValue={setFieldValue}
                                externalButton={true}
                                value={values.images}
                                />
                            </Col>
                            <Col xs={12} >
                                <ImagesGallery 
                                imgs={images}
                                setImgs={setImages}
                                primary={primary}
                                setPrimary={setPrimary}/>
                                

                            </Col>
                        </Row>
                      </Col>
                      </Row>
                   </Col>
                </Row>
            </Col>
            <Col xs={12}>
                <Row className='gx-2 gy-3'>

                    <Col xs={12} >
                            <Badge 
                            items={staticData[0].value}
                            label={staticData[0].title}
                            name="offer_type"
                            selected={values.offer_type}
                            setSelected={setFieldValue}
                            />
                    </Col>
                    <Col xs={12} >
                        <Badge 
                            items={staticData[1].value}
                            label={staticData[1].title}
                            name="rent_freq"
                            selected={values.rent_freq}
                            setSelected={setFieldValue}
                            />

                    </Col>
                    <Col xs={12}>
                        <Select label="Area" />
                    </Col>
                    <Col xs={12}>
                        <Input label='Location' />
                    </Col>
                    <Col xs={12}>
                        <Select label='Direction' />
                    </Col>
                    <Col xs={12}>
                        <TextArea label={'Description'} 
                        value={values.description}
                        setValue={setFieldValue}
                        name="description"
                        handleBlur={handleBlur}
                        />
                    </Col>
                    <Col xs={12}>
                        <TextArea 
                        label={'Services Available'} 
                        value={values.services}
                        setValue={setFieldValue}
                        name="services"
                        handleBlur={handleBlur}
                        />
                    </Col>
                    <Col xs={12}>
                        <Row className="gy-3">
                            <Col xs={12} className="font-weight-bolder greyBack">
                                Phone Number
                            </Col>
                            <Col xs={12}>
                                <Input 
                                phoneNumber={true} 
                                label="Phone Number" 
                                type="number"
                                onChange={handlePhone}
                                add={addPhone}
                                value={phoneNumber}
                                reset={resetPhone}

                                />
                            </Col>
                            <Col xs={12} className="numbers">
                                <Row className="gy-3">

                                    {
                                        phoneNumbersArray.map((ele,index)=>{
                                            return (
                                                <Col xs={6} key={index}>
                                                    <div className='number'>
                                                        <span>{ele}</span>
                                                        <span className="delete"
                                                        onClick={()=>deleteNumber(index)}>X</span>
                                                    </div>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
            </Row>
        </Col>
    )
}