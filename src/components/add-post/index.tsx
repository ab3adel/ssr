
import Col from 'react-bootstrap/Col'
import { Formik, FormikProvider, useFormik} from 'formik'
import './add-post.scss'
import axios from '../tools/apis/axios'
import {apis} from '../tools/apis/apis'
import {useTranslation} from 'react-i18next'
import {useEffect, useState,useContext} from 'react'
import {LargeView} from './lg-view'
import {SmallView} from './sm-view'
import {useGetPropertyType} from '../tools/apis/useGetPropertyType'
import {useGetOffersType} from '../tools/apis/useGetOffersType'
import {useGetPropertySites} from '../tools/apis/useGetPropertySites'
import {useGetCategories} from '../tools/apis/useGetCategories'
import {useGetArea} from '../tools/apis/useGetArea'
import notificationContext from '../tools/context/notification/notification-context'
import {iOption,iToken,iValue} from '../tools/interface'
import {AddPostSchema} from '../tools/validation'
import authContext from '../tools/context/auth-context/auth-context'
interface iPhoneNumber{international_code:string,phone:string}
export interface iProps {
 postTags:any[],propertyTypes:any[],
    t:Function,checked:{profile_photo_as_image:boolean,profile_photo_primary:boolean},setChecked:Function,images:string[],setImages:Function
    ,phoneNumbersArray:string[],setPhoneNumbersArray:Function,phoneNumber:string,setPhoneNumber:Function
    ,primary:number,setPrimary:Function,deleteTag:Function,handleTitle:Function,
    handlePhone:Function,addPhone:Function,resetPhone:Function,deleteNumber:Function,values:any,
    setFieldValue:Function,errors:any,handleBlur:Function,offersType:iOption[],pricesType:iOption[],
    propertySites:iOption[],categories:iOption[],tags:iOption[],language:string,addPost:Function,
    handleChange:Function,area:iOption[],role:number,addTag:Function,selectePropertySubTypeId:Function,
    handleAvailableServices:Function,touched:any,addPostLoading:boolean
}

let postTags=[{name:'cleaning',value:0},{name:'Move',value:1},{name:'Maintaining',value:2}]

 const AddPost =()=>{
    const {t,i18n} =useTranslation()
    const [checked,setChecked]=useState({profile_photo_as_image:false,profile_photo_primary:false})
    const [images,setImages]=useState([])
    const [phoneNumbersArray,setPhoneNumbersArray]=useState<any[]>([])
    const [phoneNumber,setPhoneNumber]=useState('')
    const[primary,setPrimary]=useState(0)
    const {propertyTypeLoading,propertyTypesData,getPropertyType,propertyTypesError} =useGetPropertyType()
    const {getOffers,offersTypeData,offersTypeError,isOffersTypeLoading} =useGetOffersType()
    const {getPropertySites,propertySitesData,propertySitesError,isPropertySitesLoading}=useGetPropertySites()
    const {getCategories,isCategoriesLoading,CategoriesError,categoriesData}=useGetCategories()
    const {areaData,areaError,isAreaLoading,getArea} =useGetArea()
    const {setNotify}=useContext(notificationContext)
    const [propertyTypes,setPropertyTypse]=useState<any[]>([])
    const[offersType,setOffersType]=useState<any[]>([])
    const [pricesType,setPricesType]=useState<any[]>([])
    const [propertySites,setPropertySites]=useState<any[]>([])
    const [categories,setCategories]=useState<any[]>([])
    const [tags,setTags]=useState<any[]>([])
    const {token,setToken} =useContext(authContext)
    const [area,setArea]=useState<iOption[]>([])
    const [addPostLoading,setAddPostLoading]=useState(false)
const formik =useFormik({
   initialValues:{
    input:{en:'',ar:''},
    offer_type_id:0,
    tags_ids:[],
    rent_freq:'',
    title:{en:'',ar:''},
    description:{en:'',ar:''},
    services_available:{en:'',ar:''},
    area_id:'',
    property_type_id:'1',
    price_type_id:'',
    property_site_id:'',
    category_id:0,
    descriptive_address:{ar:'',en:''},
    location_link:'',
    latitude:'',
    longitude:'',
    area:'',
    price:'',
    number_of_rooms:'',
    number_of_bathrooms:'',
    PACIID:'',
    profile_photo_as_an_image:'0',
    profile_photo_as_an_image_primary:'0',
    pre_defined_images:[{id:'',primary:''}],
    images:[{name:{en:'',ar:''},file:'',primary:''}],
    pre_defined_phone_numbers:[],
    phone_numbers:[{phone:'',international_code:''}]


},
   onSubmit:()=>{} ,
   validationSchema:AddPostSchema(token.role)
})
const deleteTag =(id:string)=>{
    let values= formik.values.tags_ids.filter(ele=>ele !== id)
   
    formik.setFieldValue('tags_ids',values)
    
}
const handleTitle=(event:React.ChangeEvent<HTMLInputElement>)=>{
    let newVal= {...formik.values.title}
    newVal.ar=event.target.value
    newVal.en=event.target.value
    formik.setFieldValue('title',newVal)
}
const handlePhone=(value:string)=>{
   
    setPhoneNumber(value)
    
}
const addPhone =(value:iPhoneNumber)=>{
    let phons= [...formik.values.phone_numbers].filter(ele=>ele.phone)
    let newNumbers=[...phoneNumbersArray]
    phons.push(value)
    newNumbers.push(value.phone)
  formik.setFieldValue('phone_numbers',phons)

  setPhoneNumbersArray(newNumbers)
}
const addTag =(name:string,value:number[])=> {
    if (value.length>3) return
    formik.setFieldValue(name,value)
}
const resetPhone= ()=>{
    setPhoneNumber('')
}
const deleteNumber =(num:number)=>{
    let newNumbers=phoneNumbersArray.filter((ele,index)=> index !==num)
    let phons=formik.values.phone_numbers.filter((ele:any,index)=>index !== num)
    setPhoneNumbersArray(newNumbers)
    formik.setFieldValue('phone_numbers',phons)

}
const selectePropertySubTypeId =(name:string,subType:number)=>{
    
    formik.setFieldValue(name,subType)
}
const handleAvailableServices=(name:string,value:iValue) => {
 
    
    formik.setFieldValue(name,value)
}
const checkError=()=>{
    Object.keys(formik.errors).forEach(element => {
        formik.setFieldTouched(element,true)
    }); 
    return  Object.keys(formik.errors).length >0
}
const addPost =()=>{
   if (checkError()) return
    setAddPostLoading(true)
    let formData =new FormData()
    if (formik.values.title.ar || formik.values.title.en){

        formData.append('title[en]',formik.values.title.en)
        formData.append('title[ar]',formik.values.title.ar)
    }
    formData.append('area_id',formik.values.area_id)
    if (token.role ===3) {

        formData.append('property_type_id',formik.values.property_type_id)
        formData.append('offer_type_id',JSON.stringify(formik.values.offer_type_id))
        formData.append('price_type_id',formik.values.price_type_id)
        formData.append('property_site_id',formik.values.property_site_id)
        formData.append('location_link',formik.values.location_link)
        formData.append('latitude',formik.values.latitude)
        formData.append('longitude',formik.values.longitude)
        formData.append('number_of_rooms',formik.values.number_of_rooms)
        formData.append('number_of_bathrooms',formik.values.number_of_bathrooms )
        formData.append('area',formik.values.area)
    }
    if (token.role !== 3) {

        formData.append('category_id',JSON.stringify(formik.values.category_id))
    }
    if (formik.values.tags_ids.length>0) {
        formik.values.tags_ids.map((ele,index)=>{   
        formData.append(`tags_ids[${index}]`,ele)
    
        })
    }

    if (formik.values.descriptive_address.ar || formik.values.descriptive_address.en){

        formData.append('descriptive_address[ar]',formik.values.descriptive_address.ar)
        formData.append('descriptive_address[en]',formik.values.descriptive_address.en)
    }
   
    if (formik.values.services_available.ar || formik.values.services_available.en ){

        formData.append(`services_available[ar]`,formik.values.services_available.ar)
        formData.append(`services_available[en]`,formik.values.services_available.en) 
    
    }   
    
   
    formData.append('PACIID',formik.values.PACIID)

    formData.append('price',formik.values.price)
   
    formData.append('profile_photo_as_an_image',JSON.stringify(formik.values.profile_photo_as_an_image))
    formData.append('profile_photo_as_an_image_primary',JSON.stringify(formik.values.profile_photo_as_an_image_primary))
    if (formik.values.pre_defined_images.length>0 &&formik.values.pre_defined_images[0].id ) {
        formik.values.pre_defined_images.map((ele,index)=>{

            formData.append(`pre_defined_images[${index}][id]`,ele['id'])
            formData.append(`pre_defined_images[${index}][primary]`,ele['primary'])
        })
    }
    if (formik.values.images.length>0 && formik.values.images[0].file) {
        formik.values.images.map((ele,index)=>{

            formData.append(`images[${index}][name][en]`,ele['name']['en'])
            formData.append(`images[${index}][name][ar]`,ele['name']['ar'])
            formData.append(`images[${index}][file]`,ele['file'])
            formData.append(`images[${index}][primary]`,ele['primary'])
        })
    }
    if (formik.values.pre_defined_phone_numbers.length>0) {

        formData.append('pre_defined_phone_numbers[0]',formik.values.pre_defined_phone_numbers[0])
    }
    formData.append(
        "phone_numbers[0][phone]",
        (formik.values.phone_numbers as Array<any>)[0]["phone"]
      );
      formData.append(
        "phone_numbers[0][international_code]",
        (formik.values.phone_numbers as Array<any>)[0]["international_code"]
      );
    axios.post(apis.posts,formData,{headers:{'Authorization':`Bearer ${token.token}`}})
         .then(res=>{
            setAddPostLoading(false)
            if(res.data){
                setNotify((pre:any)=>({...pre,type:true,show:true,message:'Your post has been added successfully'}))
            }
         })
         .catch(err=>{
            setAddPostLoading(false)
            if (err.response && err.response.data.message){
                
                setNotify((pre:any)=>({...pre,type:false,show:true,message:err.response.data.message}))
            }
         })



    
}
    useEffect(()=>{
       
        let imgs_arr= [...formik.values.images].filter(ele=>ele.file).map((ele,index)=>{
            if (primary===index) {
                return ({...ele,primary:1})
            }
            else {
                return ({...ele,primary:0})
            }
        })
        formik.setFieldValue('images',imgs_arr)
        
    },[primary])

    useEffect(()=>{
    checked.profile_photo_as_image?formik.setFieldValue('profile_photo_as_an_image',1):formik.setFieldValue('profile_photo_as_an_image',0)
    checked.profile_photo_primary?formik.setFieldValue('profile_photo_as_an_image_primary',1):formik.setFieldValue('profile_photo_as_an_image_primary',0)
    },[checked])

    useEffect(()=>{
        getPropertyType()
        getOffers(0)
        getPropertySites()
        getCategories(1)
        getArea()
        
    },[])

   
    useEffect(()=>{
    if (formik.values.offer_type_id) {
        getOffers(1,formik.values.offer_type_id)
    }
},[formik.values.offer_type_id])
useEffect(()=>{

},[isOffersTypeLoading])

      useEffect(()=>{
        if (!propertyTypesError) {
            if (propertyTypesData.length>0){

                let data=propertyTypesData.map((ele)=>{
                    
    
                        let type= {title:{ar:ele.name.ar,en:ele.name.en},type_id:ele.id,value:[]}
                        if (ele.sub_types.length>0) {
        
                            ele.sub_types.map((elem:any)=>{
                                (type['value'] as any).push({title:{ar:elem.name.ar,en:elem.name.en},id:elem.id})
                            })
                        }
                        return type
                    
                })
              
                if (data.length>0) {
                    setPropertyTypse(data)
                    selectePropertySubTypeId('property_type_id',(data[0].value[0] as any).id)
                }
            }
        
        }
       },[propertyTypeLoading])
 
       useEffect(()=>{
       if(!offersTypeError) {
        if (!formik.values.offer_type_id ){
            if (offersTypeData && (offersTypeData as any[]).length >0) {
                
                    let offers=(offersTypeData as any[]).map((ele:any)=>{
                        return ({title:{en:ele.name.en,ar:ele.name.ar},id:ele.id})
                    })
                    if (offers.length >0) {
                        setOffersType(offers)
                    }
            }
            }
        else {
           
            let prices=(offersTypeData as any[]).map((ele:any)=>{
                return ({title:{en:ele.name.en,ar:ele.name.ar},id:ele.id})
            })
          
             setPricesType(prices)
        }
       }
       },[isOffersTypeLoading])

       useEffect(()=>{
        if(!propertySitesError) {
            if (propertySitesData.length >0) {
                let data= propertySitesData.map(ele=>{
                    return ({title:{ar:ele.name.ar,en:ele.name.en},id:ele.id})
                })
                setPropertySites(data)
            }
        }
       },[isPropertySitesLoading])
       useEffect(()=>{
        if(!CategoriesError && !formik.values.category_id ) {
            if (categoriesData && categoriesData.length >0) {
                let data= categoriesData.map(ele=>{
                    return ({title:{ar:ele.name.ar,en:ele.name.en},value:ele.id})
                })
                setCategories(data)
            }
        }
        if (!CategoriesError && formik.values.category_id) {
            if (categoriesData && categoriesData.length >0) {
                let data= categoriesData.map(ele=>{
                    return ({title:{ar:ele.name.ar,en:ele.name.en},value:ele.id})
                })
                setTags(data)
            }
            else {
                setTags([])
            }
       
        }
        if (token.role ===3) {
            if (categoriesData && categoriesData.length >0) {
                let data= categoriesData.map(ele=>{
                    return ({title:{ar:ele.name.ar,en:ele.name.en},value:ele.id})
                })
                setTags(data)
            }
            else {
                setTags([])
            }
        }
       },[isCategoriesLoading])

       useEffect(()=>{
       
        if(formik.values.category_id) {
            formik.setFieldValue('tags_ids',[])
            getCategories(0,formik.values.category_id)
        }
       },[formik.values.category_id])

       useEffect(()=>{
        if (token.role ===3) {
            getCategories(1)

        }
       },[token])
    useEffect(()=>{
        if(!areaError) {
            if (areaData && areaData.length >0 ) {
                let data= areaData.map(ele=>{
                    return ({title:{ar:ele.name.ar,en:ele.name.en},value:ele.id})
                })
                setArea(data)
            }
        }
    },[isAreaLoading])
   console.log(formik.values.images)
    return (
        <Col xs={12} className="addPostContainer">
           <Col xs={12} className="d-sm-block d-none">
               <LargeView 
               postTags={postTags}
               phoneNumber={phoneNumber}
               phoneNumbersArray={phoneNumbersArray}
               addPhone={addPhone}
               resetPhone={resetPhone}
               deleteNumber={deleteNumber}
               deleteTag={deleteTag}
               values={formik.values}
               setFieldValue={formik.setFieldValue}
               errors={formik.errors}
               handleBlur={formik.handleBlur}
               handlePhone={handlePhone}
               handleTitle={handleTitle}
             
               t={t}
               checked={checked}
               setChecked={setChecked}
               images={images}
               setImages={setImages}
               setPhoneNumbersArray={setPhoneNumbersArray}
               propertyTypes={propertyTypes}
               setPhoneNumber={setPhoneNumber}
               setPrimary={setPrimary}
               primary={primary}
               offersType={offersType}
               pricesType={pricesType}
               propertySites={propertySites}
               categories={categories}
               tags={tags}
               language={i18n.language}
               addPost={addPost}
               handleChange={formik.handleChange}
               area={area}
               role={token.role}
               addTag={addTag}
               selectePropertySubTypeId={selectePropertySubTypeId}
               handleAvailableServices={handleAvailableServices}
               touched={formik.touched}
               addPostLoading={addPostLoading}
               />

           </Col>
           <Col xs={12} className="d-block d-sm-none">
            <SmallView
             postTags={postTags}
             phoneNumber={phoneNumber}
             phoneNumbersArray={phoneNumbersArray}
             addPhone={addPhone}
             resetPhone={resetPhone}
             deleteNumber={deleteNumber}
             deleteTag={deleteTag}
             values={formik.values}
             setFieldValue={formik.setFieldValue}
             errors={formik.errors}
             handleBlur={formik.handleBlur}
             handlePhone={handlePhone}
             handleTitle={handleTitle}
         
             t={t}
             checked={checked}
             setChecked={setChecked}
             images={images}
             setImages={setImages}
             setPhoneNumbersArray={setPhoneNumbersArray}
             propertyTypes={propertyTypes}
             setPhoneNumber={setPhoneNumber}
             setPrimary={setPrimary}
             primary={primary}
             offersType={offersType}
             pricesType={pricesType}
             propertySites={propertySites}
             categories={categories}
             tags={tags}
             language={i18n.language}
             addPost={addPost}
             handleChange={formik.handleChange}
             area={area}
             role={token.role}
             addTag={addTag}
             selectePropertySubTypeId={selectePropertySubTypeId}
             handleAvailableServices={handleAvailableServices}
             touched={formik.touched}
             addPostLoading={addPostLoading}
            />

           
           </Col>
        </Col>
    )
}
export default AddPost;