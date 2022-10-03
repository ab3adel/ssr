
import Col from 'react-bootstrap/Col'
import { useFormik} from 'formik'
import './add-post.scss'
import axios from '../tools/apis/axios'
import {apis} from '../tools/apis/apis'
import {useTranslation} from 'react-i18next'
import {useEffect, useState,useContext} from 'react'
import {LargeView} from './lg-view'
import {SmallView} from './sm-view'
import {useGetPropertyType} from '../tools/apis/useGetPropertyType'
import notificationContext from '../tools/context/notification/notification-context'
export interface iProps {
    staticData:any [],postTags:any[],propertyTypes:any[],
    t:Function,checked:number,setChecked:Function,images:string[],setImages:Function
    ,phoneNumbersArray:string[],setPhoneNumbersArray:Function,phoneNumber:string,setPhoneNumber:Function
    ,primary:number,setPrimary:Function,deleteTag:Function,handleTitle:Function,
    handlePhone:Function,addPhone:Function,resetPhone:Function,deleteNumber:Function,values:any,
    setFieldValue:Function,errors:any,handleBlur:Function
}
let staticData= [
    {title:'Offer Type',value:['Rent','sell','bargaining']},
    {title:'Rent Frequency',value:['Yearly','Monnthly','Weakly','Daily']}
]
let postTags=[{name:'cleaning',value:0},{name:'Move',value:1},{name:'Maintaining',value:2}]
let propertyTypes=[
    {title:'Residential',value:['Apartment','Vella','Vella Compound','Half Apartment','Residential building']},
    {title:'Commercial',value:['Apartment','Vella','Vella Compound','Half Apartment','Residential building']}
]
 const AddPost =()=>{
    const {t,i18n} =useTranslation()
    const [checked,setChecked]=useState(0)
    const [images,setImages]=useState([])
    const [phoneNumbersArray,setPhoneNumbersArray]=useState<any[]>([])
    const [phoneNumber,setPhoneNumber]=useState('')
    const[primary,setPrimary]=useState(0)
    const {propertyTypeLoading,propertyTypesData,getPropertyType,propertyTypesError} =useGetPropertyType()
    const {setNotify}=useContext(notificationContext)
const formik =useFormik({
   initialValues:{
    input:{en:'',ar:''},
    offer_type_id:'',
    tags_ids:[],
    rent_freq:'',
    title:{en:'',ar:''},
    description:{en:'',ar:''},
    services_available:{en:'',ar:''},
    area_id:'',
    property_type_id:'',
    price_type_id:'',
    property_site_id:'',
    category_id:'',
    descriptive_address:{ar:'',en:''},
    location_link:'',
    latitude:'',
    longitude:'',
    area:'',
    price:'',
    number_of_rooms:'',
    number_of_bathrooms:'',
    PACIID:'',
    profile_photo_as_an_image:'',
    profile_photo_as_an_image_primary:'',
    pre_defined_images:[{id:'',primary:''}],
    images:[{name:{en:'',ar:''},file:'',primary:''}],
    pre_defined_phone_numbers:[],
    phone_numbers:[{phone:'',international_code:''}]


},
   onSubmit:()=>{} 
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
const handlePhone=(e:React.ChangeEvent<HTMLInputElement>)=>{

  setPhoneNumber(e.target.value)
}
const addPhone =(val:string)=>{
    let newNumbers=[...phoneNumbersArray]
    newNumbers.push(val)

  setPhoneNumbersArray(newNumbers)
}
const resetPhone= ()=>{
    setPhoneNumber('')
}
const deleteNumber =(num:number)=>{
    let newNumbers=phoneNumbersArray.filter((ele,index)=> index !==num)
    setPhoneNumbersArray(newNumbers)

}
const addPost =()=>{
    let formData =new FormData()
    formData.append('title[en]',formik.values.title.en)
    formData.append('title[ar]',formik.values.title.ar)
    formData.append('area_id',formik.values.area_id)
    formData.append('property_type_id',formik.values.property_type_id)
    formData.append('offer_type_id',formik.values.offer_type_id)
    formData.append('price_type_id',formik.values.price_type_id)
    formData.append('property_site_id',formik.values.property_site_id)
    formData.append('category_id',formik.values.category_id)
    formData.append('tags_ids[0]',formik.values.tags_ids[0])
    formData.append('tags_ids[1]',formik.values.tags_ids[1])
    formData.append('tags_ids[2]',formik.values.tags_ids[2])
    formData.append('descriptive_address[ar]',formik.values.descriptive_address.ar)
    formData.append('descriptive_address[en]',formik.values.descriptive_address.en)
    formData.append('services_available[ar]',formik.values.services_available.ar)
    formData.append('services_available[en]',formik.values.services_available.en)
    formData.append('location_link',formik.values.location_link)
    formData.append('latitude',formik.values.latitude)
    formData.append('longitude',formik.values.longitude)
    formData.append('PACIID',formik.values.PACIID)
    formData.append('area',formik.values.area)
    formData.append('price',formik.values.price)
    formData.append('number_of_rooms',formik.values.number_of_rooms)
    formData.append('number_of_bathrooms',formik.values.number_of_bathrooms)
    formData.append('profile_photo_as_an_image',formik.values.profile_photo_as_an_image)
    formData.append('profile_photo_as_an_image_primary',formik.values.profile_photo_as_an_image_primary)
    formData.append('pre_defined_images[0][id]',formik.values.pre_defined_images[0]['id'])
    formData.append('pre_defined_images[0][primary]',formik.values.pre_defined_images[0]['primary'])
    formData.append('images[0][name][en]',formik.values.images[0]['name']['en'])
    formData.append('images[0][name][ar]',formik.values.images[0]['name']['ar'])
    formData.append('images[0][file]',formik.values.images[0]['file'])
    formData.append('images[0][primary]',formik.values.images[0]['primary'])
    formData.append('pre_defined_phone_numbers[0]',formik.values.pre_defined_phone_numbers[0])
    formData.append('phone_numbers[0][phone]',formik.values.phone_numbers[0].phone)
    formData.append('phone_numbers[0][international_code]',formik.values.phone_numbers[0].international_code)
    
    axios.post(apis.posts,formData)
         .then(res=>{
            if(res.data){
                setNotify((pre:any)=>({...pre,type:true,show:true,message:'Your post has been added successfully'}))
            }
         })
         .catch(err=>{
            if (err.message){
                setNotify((pre:any)=>({...pre,type:false,show:true,message:err.message}))
            }
         })



    
}
useEffect(()=>{
getPropertyType()
},[])
useEffect(()=>{
console.log(propertyTypesData)
console.log(propertyTypesError)
},[propertyTypeLoading])

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
               staticData={staticData}
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
             staticData={staticData}
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
            />

           
           </Col>
        </Col>
    )
}
export default AddPost;