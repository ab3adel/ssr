import { Container, Row, Col } from "react-bootstrap";
import { iProps } from "../myprofile";
import { UserInfo } from "../views/user";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { FollowersFollowing } from "../views/followers-following";
import { GreenButton } from "../../tools/buttons/green-button";
import SettingContext from '../../tools/context/setting-context/setting-context'
import { useContext, useEffect, useState ,useRef } from "react";
import {useGetFollowingFollowers} from '../../tools/apis/useGetFollowersFollowings'
import axios from '../../tools/apis/axios'
import {apis} from '../../tools/apis/apis'
import {getLocalStorage} from '../../tools/getLocalstorage'
import { useGetArea } from "../../tools/apis/useGetArea";
import { ChangePassword } from "../../tools/change-password/changePassword";
import { WhiteButton } from "../../tools/buttons/white-button";
interface iValues  {
  pre_existed_phone_numbers: any [],
  email:string,
  country:string,
  area_id: number,
  block: string,
  avenue:string,
  street: string,
  building: string,
  floor: string,
  flat: string,
  PACIID: string,
  phone_numbers: any[],
  profile_picture:any,
  full_name:string,
  phone_numbers_delete:number[],
  phone_number_old_primary:string
} 
  type key = keyof iValues
export const NormalUserProfile = ({ edit, setEdit,t ,lang,data,setShowDeleteAccount}: iProps) => {
  let company = false;
  let {mobileView}= useContext(SettingContext)
  const [followings,setFollowings]=useState()
  const [area,setArea]=useState<any>([])
  const [country,setCountry]=useState(0)
  const [countries,setCountries]=useState<any>([])
  const fieldsUpdatedRigester=useRef<string[]>([])
  const [showChangePassword,setShowChangePassword]=useState(false)
  let {followingData,getFollowings,followingError,isFollowingLoading} =useGetFollowingFollowers()
  const{getArea,getCountries
    ,isAreaLoading
    ,areaData
    ,areaError
  ,countriesData
,countriesError
,isCountriesLoading}= useGetArea()
  const formik = useFormik<iValues>({
    initialValues: {
      pre_existed_phone_numbers: data?.phone_numbers,
      email: data?.email,
      country: data?.area,
      area_id: data?.area_id,
      block: data?.block,
      avenue: data?.avenue,
      street: data?.street,
      building: data?.building,
      floor: data?.floor,
      flat: data?.flat,
      PACIID: data?.PACIID,
      phone_numbers:[],
      profile_picture:data?.profile_picture,
      full_name:data?.full_name,
      phone_number_old_primary:'',
      phone_numbers_delete:[]
    },
    onSubmit: () => {},
    enableReinitialize:true
  });


useEffect(()=>{
getFollowings()
getCountries()
getArea(1)
},[])
useEffect(()=>{
if (!followingError) {
  if (followingData && followingData.length>0){

    setFollowings(followingData[0])
  }
}
},[isFollowingLoading])
useEffect(()=>{
if (data) {
  formik.setFieldValue('pre_existed_phone_numbes',data.phone_numbers)
  console.log('updated')
  
}
},[data])
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


const customSetFieldValue=(name:string,value:any)=>{
  if (!fieldsUpdatedRigester.current.includes(name))fieldsUpdatedRigester.current.push(name)
  formik.setFieldValue(name,value)
}
const customHandleChange=(e:React.ChangeEvent)=>{
  let name =(e.target as HTMLInputElement).name
  if (!fieldsUpdatedRigester.current.includes(name))fieldsUpdatedRigester.current.push(name)
  formik.handleChange(e)
}
const updateProfile =() =>{
  if (fieldsUpdatedRigester.current.length >0) {
  let formData= new FormData()
   fieldsUpdatedRigester.current.map((elem:string)=>{
    if (typeof (formik.values[elem as key]) === 'string' || typeof (formik.values[elem as key]) === 'number' && elem !== 'phone_number_old_primary')  {
      formData.append(elem,formik.values[elem as key] as string)
    }
    else {
      if (Array.isArray(formik.values[elem as key]) && elem !== 'phone_numbers') {
        formik.values[elem as key].map((ele:any,index:number)=>{
          formData.append(`${elem}[${index}]`,ele)
        })
      }
      if (elem === 'phone_numbers') {
        formik.values[elem].map((ele:any,index:number)=>{
          formData.append(`${elem}[${index}][phone]`,formik.values[elem][index]['phone'])
          formData.append(`${elem}[${index}][international_code]`,formik.values[elem][index]['international_code'])
          formData.append(`${elem}[${index}][primary]`,formik.values['phone_number_old_primary']?index===0?'1':'0':'0')
         })
      }
      if (elem === 'profile_picture') {
        formData.append(elem,formik.values['profile_picture'])
      }
      if (elem=== 'phone_number_old_primary') {
   
        formData.append('phone_number_old_primary',formik.values['phone_number_old_primary'] as string)
       
        if (formik.values['phone_numbers'].length===0) {
        
          let id = formik.values['pre_existed_phone_numbers'].map((ele:any)=>{
            if (!formik.values['phone_numbers_delete'].includes(ele.id)) return ele
            return null
          }).filter((ele:any)=>ele)
        
          formData.append('phone_number_new_primary',id.length>0?id[0].id:'')

        }
       
      }
    }
   })
   axios.post(apis.updateProfile,formData,{
    headers:{'Authorization':`Bearer ${getLocalStorage()?getLocalStorage().token:null}`
  }
  }).then(res=>{
    fieldsUpdatedRigester.current=[]
    window.location.reload()


  })
  .catch(err=>console.log(err))
}
setEdit(false)
}

  return (
    <>

    {!mobileView?
      <Container className="p-1 d-sm-block d-none">
        <Row className="justify-content-evenly">
          <Col
            sm={3}
            xs={12}
            className={`fixedPart bg-profile flex-column justify-content-between py-2 `}
          >
            <Row className="gy-5 justify-content-center">
              <Col xs={12}>
                <Row className="gy-2 justify-content-center">
                  <Col xs={12}>
                    <UserInfo company={company} edit={edit} t={t} 
                           profile_picture={formik.values['profile_picture']}
                           full_name={formik.values.full_name}
                           handleChange={customHandleChange}
                           setFieldValue={customSetFieldValue}
                    />
                  </Col>
                  {!edit && (
                    <>
                      <Col xs={7}>
                        <FollowersFollowing company={false} t={t}  followings={followings}/>
                      </Col>
                      <Col xs={7}>
                        <GreenButton
                          label={t("EditProfile")}
                          fun={() => setEdit(true)}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col xs={11}>
                {edit ? (
                  <GreenButton
                    label={t("SaveChanges")}
                    fun={() => updateProfile()}
                  />
                ) : (
                  <GreenButton label={t("ChangePassword")} 
                  fun={()=>setShowChangePassword(true)}/>
                )}
              </Col>
              <Col xs={11}>
                      <WhiteButton label={t("DeleteAccount")}
                      fun={()=>setShowDeleteAccount(true)}
                       />
              </Col>
              
            </Row>
          </Col>
          <Col
            sm={8}
            xs={12}
            className="scrollablePart  bg-profile py-sm-3 pb-5 pb-sm-3 "
          >
            <Col xs={12}>
            <Info company={company} edit={edit} t={t} 
                   setFieldValue={customSetFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={customHandleChange} 
                    values={formik.values}
                    countries={countries}
                    setCountry={setCountry}
                    area={area}
                    />
            </Col>
          </Col>
        </Row>
      </Container>

   :

      <Container className="pb-2 d-sm-none d-block px-0">
        <Row className="justify-content-evenly mobileViewScroll ">
          <Col xs={12} className=" bg-profile ">
            <Row className="gy-3 justify-content-center">
              <Col xs={12}>
                <UserInfo company={company} edit={edit} t={t} 
                profile_picture={formik.values['profile_picture']}
                full_name={formik.values.full_name}
                handleChange={customHandleChange}
                setFieldValue={customSetFieldValue}
                />
              </Col>
              
                <Col xs={7}>
                  <FollowersFollowing company={false} t={t} followings={followings}/>
                </Col>
              
              {edit ? (
                <Col xs={7}>
                  <GreenButton
                    label={t("SaveChanges")}
                    fun={() => updateProfile()}
                  />
                </Col>
              ) : (
                <Col xs={7}>
                  <GreenButton
                    label={t("EditProfile")}
                    fun={() => setEdit(true)}
                  />
                </Col>
              )}
              <Col xs={7}>
                 <GreenButton label={t("ChangePassword")} 
                 fun={()=>setShowChangePassword(true)}/>
              </Col>
              <Col xs={7}>
                      <WhiteButton label={t("DeleteAccount")}
                      fun={()=>setShowDeleteAccount(true)}
                       />
              </Col>
            </Row>
          </Col>
          <Col xs={12} className=" py-2   bg-profile h-100vh">
            <Info company={company} edit={edit} t={t} 
                   setFieldValue={customSetFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={customHandleChange} 
                    values={formik.values}
                    countries={countries}
                    setCountry={setCountry}
                    area={area}
                    />
          </Col>
          {/* <Col xs={12} className="h-20vh bg-profile">
            {edit ? (
              <GreenButton label={t("SaveChanges")} fun={() => setEdit(false)} />
            ) : (
             
            )}
          </Col> */}
        </Row>
        <ChangePassword 
      open={showChangePassword}
      onClose={()=>setShowChangePassword(false)}
      />
      </Container>
}
    </>
  );
};
