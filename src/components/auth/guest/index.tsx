import  Row  from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Select } from '../../tools/select/select'
import './guest.scss'
import male from '../../../images/auth/icon-male.svg'
import female from '../../../images/auth/icon-female.svg'
import Button from 'react-bootstrap/Button'
import { useState,useEffect ,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import axios, { responseEncoding } from 'axios'
import myAxios from '../../tools/apis/axios'
import {apis} from '../../tools/apis/apis'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import notificationContext from '../../tools/context/notification/notification-context'
let age_range=[
    {name:'7-20',value:'7-20'},
    {name:'20-40',value:'20-40'},
    {name:'40-100',value:'40-100'},
   
]
 const Guest =()=>{

const [gender,setGender]=useState({male:true,female:false})
const navigate=useNavigate()
const {notify,setNotify} = useContext(notificationContext)
const [disableBtn,setDisableBtn]=useState(false)
const {t,i18n}= useTranslation()
const [IPAddress,setIPAddress]=useState('')
const [selectedCountry,setSelectedCountry]=useState(0)
const [area,setArea]=useState({data:[],options:[]})
const [countries,setCountries]=useState({data:[],options:[]})
const formik = useFormik({
    initialValues:{
        ip_address:'',
        gender:'Male',
        area_id:'',
        age_range:''

    },
    onSubmit:()=>{},
    validationSchema:Yup.object().shape({
        ip_address:Yup.string().required('This fields is required'),
        gender:Yup.string().required('This fields is required'),
        area_id:Yup.string().required('This fields is required'),
        age_range:Yup.string().required('This fields is required')
    })
})

useEffect(()=>{
axios.post('https://geolocation-db.com/json/')
     .then(res=>{
        if (res.data) {
           
            formik.setFieldValue('ip_address',res.data.IPv4)
        }
     })
     .catch(err=>console.log(err))

},[])
const addGuest= ()=>{
    myAxios.post(apis.addGuest,formik.values)
          .then(res=>{
            localStorage.setItem('token',JSON.stringify({token:null,full_name:'Guest'}))
            setNotify((pre:any)=>({...pre,message:res.data.message,type:true,show:true}))
            formik.resetForm()
            navigate('/')
        })
          .catch(err=>{
            setNotify((pre:any)=>({...pre,message:err.response.data.message,type:false,show:true}))
          })
           
}
const handleGender=(male:boolean,female:boolean)=>{
    setGender((pre:any)=>({male,female}))
    if (male) {
        formik.setFieldValue('gender','Male')
    }
    else {
        formik.setFieldValue('gender','Female')
    }
}
useEffect(()=>{
    myAxios.get(apis.country_id(selectedCountry))
          .then(res=>{
           let options= res.data.payload.map((ele:any)=>{
               if (i18n.language=== 'en'){
                   return {name:ele.name.en,value:ele.id}
               }
               else {
                   return {name:ele.name.ar,value:ele.id}
               }
   
       })
           setArea(pre=>({data:res.data.payload,options:options}))
          })
          .catch(err=>console.log(err))
},[selectedCountry])
useEffect(()=>{
    myAxios.get(apis.countries)
          .then(res=>{
            let options= res.data.payload.map((ele:any)=>{
                    if (i18n.language=== 'en'){
                        return {name:ele.name.en,value:ele.id}
                    }
                    else {
                        return {name:ele.name.ar,value:ele.id}
                    }
        
            })
            setCountries(pre=>({...pre,data:res.data.payload,options}))
            
        })
          .catch(err=>console.log(err))

},[])
useEffect(()=>{
checkError()
},[formik.errors])
const checkError=()=>{
    let {age_range,area_id,ip_address,gender}=formik.errors
    if (Boolean(age_range) || Boolean(area_id) || Boolean(ip_address) || Boolean(gender)){
        setDisableBtn(true)
    }
    else {
        setDisableBtn(false)
    }
    
}

return (

    
        <Col sm={10} xs ={12} className="guestContainer">
            <Row className="gy-6">
                <Col sm={6} xs={12}>
                    <Col xs={12}>
                        <span className="title">

                            {t("Location")} 
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">
                    <Select 
                        options={countries.options}
                        tempSelect={setSelectedCountry}
                        label={t('Country')}
                        handleBlur={formik.handleBlur}
                        name="country"
                        />
                        
                    </Col>
                    
                </Col>
                <Col sm={6} xs={12}>
                    <Col xs={12}>
                        <span className="title">

                            {t("Area")} 
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">
                    <Select 
                        options={area.options}
                        name="area_id"
                        label={t('Area')}
                        setSelect={formik.setFieldValue}
                        touched={formik.touched.area_id as boolean}
                        error={formik.errors.area_id as string}
                        handleBlur={formik.handleBlur}
                        />
                    </Col>
                    
                </Col>
                <Col sm={6} xs={12}>
                    <Col xs={12}>
                        <span className="title">

                            {t("Age")} 
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">
                        <Select 
                        label="20-30"
                        name="age_range"
                        setSelect={formik.setFieldValue}
                        options={age_range}
                        error={formik.errors.age_range}
                        touched={formik.touched.age_range}
                        handleBlur={formik.handleBlur}

                        />
                    </Col>
                </Col>
                <Col xs={12} >
                    <Col xs={12}>
                        <span className="title">
                            {t("Gender")}
                        </span>
                    </Col>
                    <Col xs={12} className="mt-2">

                        <Row className="Btns">
                          

                                <Button className={gender.male? "Btn left active":"Btn left inactive" }
                                onClick={()=>handleGender(true,false)}
                                >
                                    <img src={male} />
                                    <span>{t("Male")}</span>
                                </Button>
                     

                                <Button className={gender.female? "Btn right active":"Btn right inactive" }
                                onClick={()=>()=>handleGender(false,true)}>
                                    <img src={female} />
                                    <span>{t("Female")}</span>
                                </Button>
                         
                        </Row>
                    </Col>
                </Col>
                <Col xs={12} className='d-flex justify-content-center'>
                    <Col xs={4}>

                        <Button className="doneBtn"
                        onClick={()=>addGuest()}
                        disabled={disableBtn}

                        >
                            {t("Done")}
                        </Button>
                    </Col>
                </Col>
            </Row>

        </Col>

    
)
 }

  

export default Guest;