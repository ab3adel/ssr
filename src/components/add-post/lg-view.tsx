
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Input} from '../tools/float-label-group/input/input'
import {Select} from '../tools/float-label-group/select/select'
import { TextArea } from '../tools/float-label-group/text/text'
import {ManyPhotosInput} from '../tools/many-photo-input/many-photo-input'
import {Badge} from '../tools/badge/badge'

import './add-post.scss'

import {useTranslation} from 'react-i18next'
import {Tabs} from '../tools/tabs/tabs'
import {CheckCircleFill, PhoneLandscape} from 'react-bootstrap-icons'
import {useState} from 'react'
import {ImagesGallery} from './images-gallery'
import {iProps} from './index'

export const LargeView = (
    {
        postTags,propertyTypes,addPhone,checked
        ,deleteNumber,deleteTag,handlePhone,handleTitle,images,phoneNumber,
        phoneNumbersArray,primary,resetPhone,setChecked,setImages,setPhoneNumber
        ,setPhoneNumbersArray,setPrimary
        ,t,setFieldValue,values,errors,handleBlur,offersType,pricesType
        ,propertySites,categories,tags,language,addPost,handleChange,area,role,addTag,
        selectePropertySubTypeId,handleAvailableServices,touched
    }:iProps
)=>{


    return (
        <Row className="mw-100 justify-content-between">
        <Col xs={9} className="scrollable">
            <Row>

            <Col xs={6}>
                <Row className='gx-2 gy-3'>
                { role !== 3 &&
                   (<Col xs={12} className="pt-3">
                    <Select
                    label={t('PostCategory' )}
                    options={categories }
                    name='category_id'
                    setSelect={setFieldValue}
                    selectedValue={values.category_id}
                    error={errors['category_id']}
                    touched={touched['category_id']}
                    handleBlur={handleBlur}
                    />
                    </Col>)
                    }
                   
                    <Col xs={12} className="p-2 box">
                            <Col xs={12}>
                                <Select label={t("PostTags")}
                                options={tags} 
                                setSelect={addTag}
                                name="tags_ids"
                                selectedValue={values.tags_ids}
                                multiSelect={true}
                                error={errors['tags_ids']}
                                touched={touched['tags_ids']}
                                handleBlur={handleBlur}
                                />
                            </Col>
                            
                                <Col xs={12}>
                                    <Row className="gx-2">
                                    {
                                        values.tags_ids.length >0 ?
                                        values.tags_ids.map((ele:any,index:number)=>{
                                            let item= tags.filter(elem=>elem.value === parseInt(ele))[0]
                                          if (item)
                                          {  return (
                                                <Col xs={4} key={index} >
                                                    <div className='mybadge'>
                                                        <span >
                                                        {language ==='en' ? item.title?.en : item.title?.ar}
                                                        </span>
                                                        <div className="icon"
                                                        onClick={()=>deleteTag(ele)}>
                                                            X
                                                        </div>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                        }) 
                                    :''
                                        }
                                    </Row>
                                </Col>
                    </Col>
                    <Col xs={12}>
                        <Input 
                        label={t('PostTitle')} 
                        name="title"
                        value={values.title.en}
                        onChange={handleTitle}
                        error={errors.title?.en || errors.title?.ar}
                        handleBlur={handleBlur}
                        touched={touched['title']}
                        />
                    </Col>
                    {
                        role===3 &&
                   ( <Col xs={12}>
                        <Col xs={12}>
                            <span className="font-weight-bolder"> {t("PropertyType")}</span>
                        </Col>
                        <Tabs 
                        data={propertyTypes}
                        setFieldValue={selectePropertySubTypeId}
                        name="property_type_id"
                        />
                    </Col>)
                    }
                   <Col xs={12} className="p-1">
                      <span className="font-weight-bolder"> {t("PredefinedPostPicture")}</span>
                      <Col xs={12} >
                        <Row className="gy-2">
                            <Col xs={10} className='checkbox'
                               onClick={()=>setChecked((pre:any)=>({...pre,profile_photo_as_image:!checked.profile_photo_as_image}))}>
                            
                                <Row>
                                    <Col xs={2}
                                    >
                                        <CheckCircleFill 
                                        className={checked.profile_photo_as_image ?'checked icon':'unchecked icon'} 
                                    
                                        />
                                    </Col>
                                    <Col xs={10}>

                                    <span>{t("AddProfilePicture")}</span>
                                    </Col>
                                </Row>   
                            </Col>
                            <Col xs={10} className='checkbox'
                                onClick={()=>setChecked((pre:any)=>({...pre,profile_photo_primary:!checked.profile_photo_primary}))}>
                                <Row>
                                    <Col xs={2}>
                                        <CheckCircleFill 
                                        className={checked.profile_photo_primary ?'checked icon':'unchecked icon'} 
                                    
                                        />
                                    </Col>
                                    <Col xs={10}>
                                        <span>{t('SetProfilePrimary')}</span>
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
                                setPrimary={setPrimary}
                                value={values.images}
                                setFieldValue={setFieldValue}
                                
                                />
                                

                            </Col>
                        </Row>
                      </Col>

                   </Col>
                </Row>
            </Col>
            <Col xs={6}>
                <Row className='gx-2 gy-3'>
                   { role===3 &&
                  ( <>
                   <Col xs={12} >
                            <Badge 
                            items={propertySites}
                            label={t("PropertySites")}
                            name="property_site_id"
                            selected={values.property_site_id}
                            setSelected={setFieldValue}
                            />
                    </Col>
                    
                   <Col xs={12} >
                            <Badge 
                            items={offersType}
                            label={t('OfferType')}
                            name="offer_type_id"
                            selected={values.offer_type_id}
                            setSelected={setFieldValue}
                            />
                    </Col>
                    <Col xs={12} >
                        <Badge 
                            items={pricesType}
                            label={t("Rent")}
                            name="price_type_id"
                            selected={values.price_type_id}
                            setSelected={setFieldValue}
                            />

                    </Col>
                    </>
                    )
                    }
                    <Col xs={12}>
                        <Select 
                        label={t("Area" )}
                        setSelect={setFieldValue}
                        name="area_id"
                        selectedValue={values.area_id}
                        options={area}
                        error={errors['area_id']}
                        touched={touched['area_id']}
                        handleBlur={handleBlur}
                        />
                    </Col>
                  {  role===3 &&
                 ( <Col xs={12}>
                        <Input 
                        label={t('Location') }
                        type='text'
                        value={values.location_link}
                        name="location_link"
                        onChange={handleChange}
                        error={errors['location_link']}
                        touched={touched['location_link']}
                        handleBlur={handleBlur}

                        />
                    </Col>)
                    }
                    {role===3 &&
                    ( <Col xs={12}>
                        <Select label='Direction' />
                    </Col>)
                    }
                    <Col xs={12}>
                        <TextArea label={t("Description")} 
                        value={values.description}
                        setValue={setFieldValue}
                        name="description"
                        handleBlur={handleBlur}
                        error={errors['description'] }
                        touched={touched['description']}
                        />
                    </Col>
                    <Col xs={12}>
                        <TextArea 
                        label={t('ServicesAvailable')} 
                        value={values.services_available}
                        setValue={handleAvailableServices}
                        name="services_available"
                        handleBlur={handleBlur}
                        error={errors['services_available']}
                        touched={touched['services_available']}
                        />
                    </Col>
                    <Col xs={12}>
                        <Row className="gy-3">
                            <Col xs={12} className="font-weight-bolder">
                                {t("PhoneNumber")}
                            </Col>
                            <Col xs={12}>
                                <Input 
                                phoneNumber={true} 
                                label={t("PhoneNumber")}
                                type="number"
                                onChange={handlePhone}
                                add={addPhone}
                                value={phoneNumber}
                                reset={resetPhone}
                                error={errors['phone_numbers']}
                                touched={touched['phone_numbers']}
                                handleBlur={handleBlur}
                                

                                />
                            </Col>
                            <Col xs={10} className="numbers">
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

        <Col xs={3} className="fixed p-1">
            <Col lg={11} xs={12}  className="body">
                <Row className="gy-6">

                    <Col xs={12}>

                        <Row className="gy-4 align p-1 justify-content-center">

                            <Col lg={10} xs={12}>
                                <Input 
                                numberControl={true} 
                                label={t("Rooms")}
                                name="number_of_rooms"
                                setValue={setFieldValue}
                                value={values.number_of_rooms}
                                type="number"
                                disabled={role !==3}
                                onChange={handleChange}
                                error={errors['number_of_rooms']}
                                touched={touched['number_of_rooms']}
                                handleBlur={handleBlur}
                                />
                            </Col>
                            <Col lg={10} xs={12}>
                                <Input numberControl={true} label={t("Bathrooms")}
                                 name="number_of_bathrooms"
                                 setValue={setFieldValue}
                                 value={values.number_of_bathrooms}
                                 type="number"
                                 disabled={role !==3}
                                 onChange={handleChange}
                                 error={errors['number_of_bathrooms']}
                                touched={touched['number_of_bathrooms']}
                                handleBlur={handleBlur}
                                 />
                            </Col>
                            <Col lg={10} xs={12}>
                                <Input 
                                label={t("Area_m")}
                                type="number"
                                onChange={handleChange}
                                name="area"
                                value={values.area}
                                disabled={role !==3}
                                error={errors['area']}
                                touched={touched['area']}
                                handleBlur={handleBlur}
                            
                                 />
                            </Col>
                            <Col lg={10} xs={12}>
                                <Input label={t("Price")}
                                unit='KWD' 
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                                type="number"
                                error={errors['price']}
                                touched={touched['price']}
                                handleBlur={handleBlur}
                                />
                            </Col>
                            <Col lg={10} xs={12}>
                                <Input 
                                label='PACIID'
                                type='text'
                                onChange={handleChange}
                                value={values.PACIID} 
                                name="PACIID"
                                error={errors['PACIID']}
                                touched={touched['PACIID']}
                                handleBlur={handleBlur}
                                
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center">
                        <Col xs={9}>

                            <button className="shareBtn"
                            onClick={()=>addPost()}>
                               {t("SharePost")}
                            </button>
                        </Col>
                    </Col>
                </Row>
            </Col>

        </Col>
    </Row>
    )
}