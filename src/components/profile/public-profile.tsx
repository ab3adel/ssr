
import { CompanyPublicProfile } from "./company/public-company-profile";
import { NormalUserPublicProfile } from './normal-user/public-profile-user'
import './views/profile-views.scss'
import Col from 'react-bootstrap/Col'
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useGetProfile} from '../tools/apis/useGetProfile'
import { getLocalStorage } from "../tools/getLocalstorage";

export interface PublicProfileProps {t:Function,lang:string,data:any}
const PublicProfile = () => {
const {t,i18n}=useTranslation()
const {user_id,page}=useParams()
const navigate=useNavigate()

const {getProfile,getProfileData,getProfileError,isGetProfileLoading}=useGetProfile()
const [profileData,setProfileData]=useState({})
const [isCompany,setIsCompany]=useState(true)
useEffect(()=>{
    if (getLocalStorage() && getLocalStorage().id.toString() === user_id?.toString()){
        navigate('/')
    }
},[])
useEffect(()=>{
    if (user_id && page && !isNaN(parseInt(user_id))){

        getProfile({user_id:parseInt(user_id),page:parseInt(page)})
    }
},[user_id])
useEffect(()=>{
    if(!getProfileError) {
       if (getProfileData &&  getProfileData.length>0) {
      
        setProfileData(getProfileData[0])
       }
    }
},[isGetProfileLoading])
console.log(profileData)
    return (
        <Col xs={12} className="profileContainer">

            {
            isCompany? 
            <CompanyPublicProfile t={t} lang={i18n.language} data={profileData}/> :
            <NormalUserPublicProfile t={t} lang={i18n.language} data={profileData}/>
            }
        </Col>
    )
}
export default PublicProfile;