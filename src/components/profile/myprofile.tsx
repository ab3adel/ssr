import { useEffect, useState, useTransition } from 'react'
import Col from 'react-bootstrap/Col'
import { NormalUserProfile } from './normal-user/normal-user'
import { CompanyProfile } from './company/company'
import { EditCompanyProfile } from './company/edit-company'
import {useTranslation} from 'react-i18next'
import './views/profile-views.scss'
import {useGetProfile} from '../tools/apis/useGetProfile'
import { getLocalStorage } from '../tools/getLocalstorage'
import {Spinner} from '../tools/spinner'
import {useGetFollowingFollowers} from '../tools/apis/useGetFollowersFollowings'

export interface iProps { edit: boolean, setEdit: 
    Function ,t:Function,data:any,lang:string,
   
}
const Profile = () => {
    const [editProfile, setEditProfile] = useState(false)
    const [normalUserType,setNormalUserType]=useState(false)
    const {t,i18n}=useTranslation()
    const {getProfile,getProfileData,getProfileError,isGetProfileLoading}=useGetProfile()
    const [profileData,setProfileData]=useState<any[]>([{}])


    useEffect(()=>{
        if (getLocalStorage()) {
            let userInfo=getLocalStorage()
           
            getProfile({user_id:userInfo.id})
            if (userInfo.role >2) setNormalUserType(false)
            else {
                setNormalUserType(true)
            }
          

        }
     
    },[])
    useEffect(()=>{
       
        if(!getProfileError) {
           if (getProfileData  && getProfileData.data && getProfileData.data.length>0) {
            
            setProfileData(getProfileData.data[0])
           }
        }
    },[isGetProfileLoading])

    if (isGetProfileLoading) return (<Spinner />)

    return (
        <Col xs={12} className="profileContainer">
            { !normalUserType ?
            <>
            {editProfile ?
                <EditCompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                    t={t}
                    lang={i18n.language}
                    data={profileData}
                />
                :
                <CompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                    t={t}
                    data={profileData}
                    lang={i18n.language}
                    
                    
                />}
                </>

 :

            <NormalUserProfile
                edit={editProfile} setEdit={setEditProfile}
                t={t} 
                data={profileData}
                lang={i18n.language}
              
                />
}
        </Col>
    )
}
export default Profile;