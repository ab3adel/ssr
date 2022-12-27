import './forms.scss'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {InputFile} from '../../../tools/photoInput/photoInput'
import {InputWithIcon} from '../../../tools/input/inputIcon'
import {Select} from '../../../tools/select/select'
import facebook from '../../../../images/auth/facebook-icon.svg'
import twitter from '../../../../images/auth/twitter-icon.svg'
import tiktok from '../../../../images/auth/tiktok-icon.svg'
import snapchat from '../../../../images/auth/snapchat-icon.svg'
import youtube from '../../../../images/auth/youtube-icon.svg'
import instagram from '../../../../images/auth/instagram-icon.svg'
import {useTranslation} from 'react-i18next'
import {PhoneInput} from '../../../tools/phone-input/phoneInput'
import {useEffect, useState} from 'react'
import { MyMultiSelect } from '../../../tools/multi-select/multi-select';

import {iErrors,iTouched, InitialValues} from '../initial-values'
interface iCategories{categoriesOption:any[],data:any[]}
interface iCompanies{companiesOptions:any[]}
interface iTab {type:'User' | 'Commercial'
,setValue:Function,handleBlur:Function,setFieldTouched:Function
,getCategories?:Function,categories?:iCategories
,getCompanies?:Function,companies?:iCompanies,
needCategory?:boolean
}
interface iProps extends iTab  {values:Partial<InitialValues>,errors:Partial<iErrors>,touched:Partial<iTouched>}
let phoneError=''
let codeError=''
export const PersonalInfoForm  = (props:iProps)=>{
  let   {type,setValue,values
          ,errors,touched
      ,handleBlur,setFieldTouched
    ,getCategories,categories
    ,getCompanies,companies,needCategory
}= props

    const {t,i18n}=useTranslation()
    const handleField=(field: keyof InitialValues,value:string)=>{
  
            if (Array.isArray(values[field]) ){
                let arr= [...(values[field] as Array<any>)]
                arr.push(value)
                setValue(field,arr)
            }
            else {

                setValue(field,value)
            }
        
    }
   const deleteItem =(item:number)=>{
    let arr= values.category_ids?.filter(ele=>ele.toString() !== item.toString())
    setValue('category_ids',arr)
    
   }
    useEffect(()=>{
        if (typeof(getCategories)==='function') {
            
            getCategories()
        }
        if (typeof(getCompanies) === 'function') {
            getCompanies()
        }
        if (errors.phone_numbers && (errors.phone_numbers as Array<any>).length >0) {
            phoneError=(errors.phone_numbers as any)[0].phone
            codeError=(errors.phone_numbers as any)[0].international_code
       }
       
    },[])
 
   


   
    

    if (type === 'User') {

        return (
            <Row className="personalInfoContainer gy-3 gy-sm-0">
                <Col sm={4} xs={12} className="d-flex justify-content-center d-sm-block">
                    <InputFile 
                     value={values.profile_picture}
                     name="profile_picture"
                     error={errors.profile_picture as string}
                     touched={touched.profile_picture as boolean}
                     setValue={handleField}
                    
            
                     />
                </Col>
                <Col sm={8} xs={12}>
                    <Col xs={12}>
                        <InputWithIcon 
                        type="text"
                        label={t("FullName")}
                        id="fullName"
                        name="full_name"
                        value={values.full_name as string}
                        onChange={handleField}
                        error={errors.full_name as string}
                        touched={touched.full_name as boolean}
                        handleBlur={handleBlur}
                        required={true}
                        
    
                           />
                    </Col>
                    <Col xs={12}>
                        <InputWithIcon 
                        type="text"
                        label={t("Email")}
                        id="email"
                        name="email"
                        value={values.email as string}
                        onChange={handleField}
                        error={errors.email as string}
                        touched={touched.email as boolean}
                        handleBlur={handleBlur}
                        required={true}
    
                           />
                    </Col>
                    <Col xs={12}>
                       <PhoneInput 
                        phone={values.phone_numbers?values.phone_numbers[0].phone :''}
                        internationalCode={values.phone_numbers?values.phone_numbers[0].international_code :''}
                        setValue={setValue as Function}
                     
                       phoneNumberError={errors.phone_numbers &&( errors.phone_numbers as []).length>0? (errors.phone_numbers as any[])[0].phone :''}
                        touched={touched.phone_numbers as boolean}
                        handleBlur={setFieldTouched}
                        
                        
                       />
                    </Col>
                </Col>
            </Row>
        )
    }

        return (
            <Row className="personalInfoContainer p-1" >
                <Col sm={4} xs={12} className="d-flex d-sm-block justify-content-center p-2 p-sm-0">
                    <InputFile 
                         value={values.profile_picture}
                         name="profile_picture"
                         error={errors.profile_picture as string}
                         touched={touched.profile_picture as boolean}
                         setValue={handleField}
                         
                    />
                </Col>
                <Col sm={8} xs={12}>
                    <Row  className="gy-3">
                        <Col xs={12}>
                            <Row className="gy-2" >
                                <Col xs={12}>
                                    <Select 
                                     label={t("CompanyType")}
                                     name="role_id"
                                     options={companies?.companiesOptions}
                                     setSelect={handleField}
                                     error={errors.role_id as string}
                                     touched={touched.role_id as boolean}
                                     handleBlur={handleBlur}
                                     />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("FullName")} 
                                    id="FullName"
                                    name="full_name"
                                    type="text"
                                    value={values.full_name}
                                    onChange={setValue}
                                    touched={touched.full_name as boolean}
                                    error={errors.full_name as string}
                                    handleBlur={handleBlur}
                                    required={true}
                                    />       
                                </Col>
                                <Col xs={12}>
                                    {/* <Select label={t("Category")}
                                     options={categories?.categoriesOption}
                                     error={errors.category_ids as string}
                                     touched={touched.category_ids as boolean}
                                     setSelect={handleField}
                                    name="category_ids"
                                    handleBlur={handleBlur}
                                    multiSelect={true}
                                    /> */}
                                    <MyMultiSelect 
                                     options={categories?.categoriesOption as any[]}
                                     label={t("Category")}
                                     name="category_ids"
                                     setSelect={setValue}
                                     error={errors.category_ids as string}
                                     touched={touched.category_ids as boolean}
                                     handleBlur={setFieldTouched}
                                     needCategory={needCategory}
                                     

                                    />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("Email") }
                                    id="Email"
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={setValue}
                                    touched={touched.email as boolean}
                                    error={errors.email as string} 
                                    handleBlur={handleBlur}
                                    required={true}
                                    />       
                                </Col>
                                <Col xs={12}>
                                <PhoneInput 
                                    phone={values.phone_numbers?values.phone_numbers[0].phone :''}
                                    internationalCode={values.phone_numbers?values.phone_numbers[0].international_code :''}
                                    setValue={setValue as Function}
                                
                                    phoneNumberError={errors.phone_numbers &&( errors.phone_numbers as []).length>0? (errors.phone_numbers as any[])[0].phone :''}
                                    touched={touched.phone_numbers as boolean}
                                    handleBlur={setFieldTouched}
                                    />    
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("Website")} 
                                    id="Website"
                                    name="website"
                                    type="text"
                                    value={values.website}
                                    onChange={setValue}
                                    error={errors.website as string}
                                    touched={touched.website as boolean}
                                    handleBlur={handleBlur}
                                    required={true}
                                    />       
                                </Col>
                                
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row className='gy-2'>
                                <Col xs={12}>
                                    <div className="text">
                                        {t("SocialMediaAccounts")}
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Facebook')}
                                      name="facebook"
                                      type="text"
                                      id="facebook"
                                      icon={facebook}
                                      value={values.facebook}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Twitter')}
                                      name="twitter"
                                      type="text"
                                      id="twitter"
                                      icon={twitter}
                                      value={values.twitter}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Instagram')}
                                      name="instagram"
                                      type="text"
                                      id="instagram"
                                      icon={instagram}
                                      value={values.instagram}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Youtube')}
                                      name="youtube"
                                      type="text"
                                      id="youtube"
                                      icon={youtube}
                                      value={values.youtube}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Snapchat')}
                                      name="snapchat"
                                      type="text"
                                      id="snapchat"
                                      icon={snapchat}
                                      value={values.snapchat}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Tiktok')}
                                      name="tiktok"
                                      type="text"
                                      id="tiktok"
                                      icon={tiktok}
                                      value={values.tiktok}
                                      onChange={setValue}
                                      required={false}
                                      />
                                </Col>
                                


                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
        )
    
}