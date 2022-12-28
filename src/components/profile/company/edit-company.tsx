import { iProps } from "../myprofile";

import { Container, Row, Col } from "react-bootstrap";
import { Tab } from "../../tools/tab";
import { UserInfo } from "../views/user";
import { SocialMedia } from "../views/social-media";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { useEffect, useRef, useState } from "react";

import { Data } from "../views/data";
import { GreenButton } from "../../tools/buttons/green-button";
import { Location } from "../views/location";
import SettingContext from "../../tools/context/setting-context/setting-context";
import {useContext} from 'react'
import {useGetArea} from '../../tools/apis/useGetArea'
import { useGetCategories } from "../../tools/apis/useGetCategories";
import { useGetRoles } from "../../tools/apis/useGetRoles";
import { editCompanyProfileSchema } from "../../tools/validation";
import axios from '../../tools/apis/axios'
import {apis} from '../../tools/apis/apis'
import { getLocalStorage } from "../../tools/getLocalstorage";
import { reloadResources } from "i18next";
import { useTranslation } from "react-i18next";

export const EditCompanyProfile = ({ edit, setEdit ,t,lang,data,setNotify}: iProps) => {
  let company = true;
 let fieldsUpdatedRigester=useRef<string[]>([])
  let [tabIndex, setTabIndex] = useState(0);
  let {mobileView} = useContext(SettingContext);
  const [countries,setCountries]=useState<any>([])
  const [categories,setCategories]=useState<any>([])
  const [roles,setRoles]=useState<any>([])
  const [area,setArea]=useState<any>([])
  const [country,setCountry]=useState(0)
  const [imagesToShow,setImagesToShow]=useState<string[]>([])
  const {i18n} =useTranslation()
  const{getArea,getCountries
    ,isAreaLoading
    ,areaData
    ,areaError
  ,countriesData
,countriesError
,isCountriesLoading}= useGetArea()
const {getCategories,categoriesData,CategoriesError,isCategoriesLoading} =useGetCategories()
const {getRoles,isGetRolesLoading,rolesData,rolesError}=useGetRoles()
  const formik = useFormik<any>({
    initialValues: {
      twitter: data?.company?.twitter ? data.company.twitter : "myTwitter.com",
      facebook: data?.company?.facebook
        ? data.company.facebook
        : "myFacebook.com",
      youtube: data?.company?.youtueb ? data.company.youtube : "myYoutube.com",
      snapchat: data?.company?.snapchat
        ? data.company.snapchat
        : "mySnapchat.com",
      tiktok: data?.company?.tiktok ? data.company.tiktok : "myTiktok.com",
      instagram: data?.comapny?.instagram
        ? data.company.instagram
        : "myInstagram.com",
      description: data?.company?.description
        ? data?.company?.description
        : { en: "", ar: "" },
      country: data?.area?.country?data.area.country: {name:{en:'',ar:''},id:0},
      area: data?.area ? data.area : { name: { en: "", ar: "" }, id: 0 },
      flat: data?.flat ? data.flat : "",
      floor: data?.floor ? data?.floor : "",
      block: data?.block ? data.block : "",
      email: data.email ? data.email : "",
      pre_existed_phone_numbers: data.phone_numbers ? data.phone_numbers : [],
      phone_numbers:[],
      avenue: data?.avenue ? data.avenue : "",
      street: data?.street ? data.street : "",
      website: data?.company?.website ? data.company.website : "",
      PACIID: data.PACIID ? data.PACIID : "",
      building: data.building ? data.building : "",
      role: data?.roles ? data.roles[0] : { name:{en: "", ar: ""} ,id: 0 },
      pre_defined_images:[],
      files:  [],
      full_name:data.full_name?data.full_name:'',
      profile_picture:data.profile_pictuer?data.profile_picture:null,
      category:data.company?.categories?data.company.categories:[{id:0,name:{ar:'',en:''}}],
      area_id:-1,
      category_ids:[],
      category_ids_delete:[],
      predefined_post_pictures:[],
      predefined_pictures_delete:[],
      phone_numbers_delete:[],
      phone_number_old_primary:'',
      phone_number_new_primary:''
    },
    onSubmit: () => {},
    enableReinitialize: true,
    validationSchema:editCompanyProfileSchema
  });
  useEffect(()=>{
    if (data && data.company&& data.company.files){
     let{company:{files}}=data
     if (files.length >0) {
      let images_arr:any[]=[]
      let files_arr:any[]=[]
      let images_to_show :string[]=[]
      files.map((ele:any)=>{
        if (ele.file_purpose==='predefined_post_picture') {
          images_arr.push(ele)
          images_to_show.push(ele.path)
        }
        else {
          files_arr.push(ele)
        }
      })
      formik.setFieldValue('pre_defined_images',images_arr)
      formik.setFieldValue('files',files_arr)
      setImagesToShow(images_to_show)
     }
    }
    if (data && data.area && data.area.country_id ) {
      setCountry(data.area.country_id)
    }
    if (data && data.company && data.company.categories) {
      let companyCategories=data.company.categories
      if (companyCategories.length >0) {
        getCategories(1,companyCategories[0].id)
      }
    }
  },[data])
  const customSetFieldValue=(name:string,value:any)=>{
    if (!fieldsUpdatedRigester.current.includes(name))fieldsUpdatedRigester.current.push(name)
    formik.setFieldValue(name,value)
  }
  const customHandleChange=(e:React.ChangeEvent)=>{
    let name =(e.target as HTMLInputElement).name
    if (!fieldsUpdatedRigester.current.includes(name))fieldsUpdatedRigester.current.push(name)
    formik.handleChange(e)
  }

  useEffect(()=>{
    getCountries()
 
    getRoles()
  },[])
  useEffect(()=>{
    if(country)getArea(country)
  },[country])
  useEffect(()=>{
    if(!countriesError) {
      setCountries(countriesData)
    }
  },[isCountriesLoading])
  useEffect(()=>{
    if(!areaError) {
      setArea(areaData)
    }
  },[isAreaLoading])
useEffect(()=>{
  if (!CategoriesError) {
    setCategories(categoriesData)
  }
},[isCategoriesLoading])
useEffect(()=>{
  if(!rolesError) {
    if (rolesData){
  
      setRoles(rolesData)
    }
  }
},[isGetRolesLoading])

const updateProfile =()=>{
 if (fieldsUpdatedRigester.current.length>0) {
  let formdata= new FormData()
  formdata.append('user_id',getLocalStorage()?getLocalStorage().id:'')
  formdata.append('locale',i18n.language)
  fieldsUpdatedRigester.current.map(mainEle=>{
    // for simple values like string and numbers
    if (typeof(formik.values[mainEle]) ==='string' 
    || typeof(formik.values[mainEle]) ==='number' && mainEle !== 'phone_number_old_primary') {
      formdata.append(mainEle,formik.values[mainEle])
    }
    
    else {
      
      if (formik.values['phone_numbers'].length===0) {
       
        if (formik.values['pre_existed_phone_numbers'].length>0 && formik.values['pre_existed_phone_numbers'].length === formik.values['phoen_numbers_delete']) {
         formik.setFieldError('phone_numbers','can not be empty')
         return
        }
        
      }
      if (Array.isArray(formik.values[mainEle])) {
        //for array 
        if (mainEle !== 'phone_numbers' && mainEle !== 'files' && mainEle !=='predefined_post_pictures') {
          formik.values[mainEle].map((ele:any,index:number)=>{
            formdata.append(`${mainEle}[${index}]`,ele)
          })
        }
        else {
          if (mainEle==='files') {
            formik.values[mainEle].map((ele:any,index:number)=>{
              if (formik.values[mainEle][index]['name'] 
              && formik.values[mainEle][index]['name']['ar']
              )
             { formdata.append(`${mainEle}[${index}][file]`,formik.values[mainEle][index]['file'])
              formdata.append(`${mainEle}[${index}][name][ar]`,formik.values[mainEle][index]['name']['ar'])
              formdata.append(`${mainEle}[${index}][name][en]`,formik.values[mainEle][index]['name']['en'])}
            })
          }
          if (mainEle==='phone_numbers') {

             formik.values[mainEle].map((ele:any,index:number)=>{
              formdata.append(`${mainEle}[${index}][phone]`,formik.values[mainEle][index]['phone'])
              formdata.append(`${mainEle}[${index}][international_code]`,formik.values[mainEle][index]['international_code'])
              formdata.append(`${mainEle}[${index}][primary]`,formik.values['phone_number_old_primary']?index===0?'1':'0':'0')
             })
          }
          if (mainEle === 'predefined_post_pictures') {
            formik.values[mainEle].map((ele:any,index:number)=>{
              formdata.append(`${mainEle}[${index}]`,formik.values[mainEle][index]['file'])
             
            })
          }
        }
      }
      if (mainEle === 'description') {
        formdata.append(`${mainEle}[en]`,formik.values[mainEle]['en'])
        formdata.append(`${mainEle}[ar]`,formik.values[mainEle]['ar'])
      }
      if (mainEle=== 'phone_number_old_primary') {
   
        formdata.append('phone_number_old_primary',formik.values['phone_number_old_primary'])
       
        if (formik.values['phone_numbers'].length===0) {
        
          let id = formik.values['pre_existed_phone_numbers'].map((ele:any)=>{
            if (!formik.values['phone_numbers_delete'].includes(ele.id)) return ele
            return null
          }).filter((ele:any)=>ele)
        
          formdata.append('phone_number_new_primary',id.length>0?id[0].id:'')

        }
       
      }
      if (mainEle === 'profile_picture') {
        formdata.append(mainEle,formik.values[mainEle])
      }
    
    }
  })
  
    axios.post(apis.updateProfile,formdata,{
      headers:{'Authorization':`Bearer ${getLocalStorage()?getLocalStorage().token:null}`
    }
    }).then(res=>{
    
      fieldsUpdatedRigester.current=[]
      window.location.reload()

    })
    .catch(err=>{
      setNotify((pre:any)=>(
        {...pre,type:false,message:i18n.language==='en'?'Something wrong happend !!':
        'حدث خطأ ما'
      }))
    })

 }
  setEdit(false)
}


  return( 
     <Container className="p-1 ">
      { !mobileView?
      <Row className="justify-content-evenly d-none d-sm-flex">
        <Col
          sm={3}
          xs={12}
          className={`fixedPart  bg-profile flex-column justify-content-between`}
        >
          <Row className="gy-3 justify-content-center">
            <Col xs={12}>
              <UserInfo company={company}
               edit={edit} t={t}  
              full_name={formik.values.full_name}
              profile_picture={formik.values.profile_picture}
              setFieldValue={customSetFieldValue}
              handleChange={customHandleChange}
              />
            </Col>
            <Col xs={10}>
              <GreenButton label={t("SaveChanges")} fun={() => setEdit(false)} />
            </Col>
          </Row>
        </Col>
        <Col
          sm={8}
          xs={12}
          className="scrollablePart bg-profile py-sm-3 pb-5 pb-sm-3 "
        >
          <Row>
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Location")}
                </Col>

                <Col
                  sm={4}
                  xs={12}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                 {t("Data")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Row>
                  <Info company={true} edit={edit} t={t} 
                  setFieldValue={customSetFieldValue}
                  handleBlur={formik.handleBlur}
                  lang={lang}
                  values={formik.values}
                  countries={countries}
                  categories={categories}
                  roles={roles}
                  errors={formik.errors}
                  touched={formik.touched}
                  handleChange={customHandleChange}
                   />
                  <SocialMedia
                    values={formik.values}
                    handleChange={customHandleChange}
                    edit={edit}
                    t={t}
                  />
                </Row>
                <Location values={formik.values} 
                setFieldValue={customSetFieldValue}
                handleBlur={formik.handleBlur}
                lang={lang}
                t={t}
                setCountry={setCountry}
                countries={countries}
                area={area}
               
                handleChange={customHandleChange} />
                <Data t={t}
                 setFieldValue={customSetFieldValue} 
                handleBlur={formik.handleBlur} 
                values={formik.values}
                edit={true}
                imagesToShow={imagesToShow}
                lang={lang}
                />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
      
      :
      <Row
        className="justify-content-evenly d-flex d-sm-none mobileViewScroll gy-3 bg-profile"
        style={{ height: "fit-content" }}
      >
        <Col sm={3} xs={12} className={`   flex-column`}>
          <Row className="gy-2 justify-content-center">
            <Col xs={12}>
              <UserInfo company={company} edit={edit} t={t} 
               full_name={formik.values.full_name}
               profile_picture={formik.values.profile_picture}
               handleChange={customHandleChange}
               handleBlur={formik.handleBlur}
               setFieldValue={customSetFieldValue}
               errors={formik.errors}
               touched={formik.touched}
               />
            </Col>

            <Col xs={8}>
              <GreenButton label={"Save Changes"} fun={() =>updateProfile()} />
            </Col>
          </Row>
        </Col>
        <Col sm={8} xs={12} className="  py-sm-3 pb-5 pb-sm-3 ">
          <Row className="gy-3">
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  xs={4}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Location")}
                </Col>
                <Col
                  sm={5}
                  xs={4}
                  className={tabIndex === 2 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(2)}
                >
                 {t("Data")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
             
                <Info company={company} edit={edit} t={t} 
                    setFieldValue={customSetFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    values={formik.values}
                    countries={countries}
                    categories={categories}
                    roles={roles}
                    errors={formik.errors}
                    handleChange={customHandleChange}
                    touched={formik.touched}
                    
                    />
                <Location t={t}  values={formik.values} 
                  setFieldValue={customSetFieldValue}
                  handleBlur={formik.handleBlur}
                  lang={lang}
                  setCountry={setCountry}
                  countries={countries}
                  area={area}
                  handleChange={customHandleChange}
                />
                <Data t={t} 
                 setFieldValue={customSetFieldValue} 
                 handleBlur={formik.handleBlur} 
                 values={formik.values}
                 edit={true}
                 lang={lang}
                 imagesToShow={imagesToShow}
                />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
      }
    </Container>
  );
};
