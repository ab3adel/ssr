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
import {useState} from 'react'
import {ImagesGallery} from './images-gallery'
import {LargeView} from './lg-view'
import {SmallView} from './sm-view'
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
const formik =useFormik({
   initialValues:{
    input:{en:'',ar:''},
    offer_type:'',
    tags_ids:[],
    rent_freq:'',
    title:{en:'',ar:''},
    images:[],
    description:{en:'',ar:''},
    services:{en:'',ar:''}
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