import { useContext, useEffect, useState, useTransition } from 'react'
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
import { useDeleteAccount } from '../tools/apis/useDeleteAccount'
import { DialogBox } from '../tools/dialogbox/dialogbox'
import notificationContext from '../tools/context/notification/notification-context'
import { useNavigate } from 'react-router-dom'

export interface iProps { edit: boolean, setEdit: 
    Function ,t:Function,data:any,lang:string,
    setShowDeleteAccount:(val:boolean)=>void
   
}
const Profile = () => {
    const [editProfile, setEditProfile] = useState(false)
    const [normalUserType,setNormalUserType]=useState(false)
    const [showDeleteAccount,setShowDeleteAccount] =useState(false)
    const {t,i18n}=useTranslation()
    const {getProfile,getProfileData,getProfileError,isGetProfileLoading}=useGetProfile()
    const [profileData,setProfileData]=useState<any[]>([{}])
    const {setNotify}=useContext(notificationContext)
    const navigate =useNavigate()
    const {deleteAccount,deleteAccountData,deleteAccountError,isDeleteAccountLoading} =useDeleteAccount()
    useEffect(()=>{
        if (!deleteAccountError) {
          if (deleteAccountData) {
      
            navigate('/')
            window.location.reload()
          }
        
        }
        else {
          setNotify((pre:any)=>({...pre,show:true,type:false,message:
            t("SomethingWrong")}))
        }
      },[isDeleteAccountLoading])
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
                    setShowDeleteAccount={setShowDeleteAccount}
                />
                :
                <CompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                    t={t}
                    data={profileData}
                    lang={i18n.language}
                    setShowDeleteAccount={setShowDeleteAccount}
                    
                    
                />}
                </>

 :

            <NormalUserProfile
                edit={editProfile} setEdit={setEditProfile}
                t={t} 
                data={profileData}
                lang={i18n.language}
                setShowDeleteAccount={setShowDeleteAccount}
              
                />
}
            <DialogBox 
                message={t('DeleteAccountWarning')}
                setShow={setShowDeleteAccount}
                show={showDeleteAccount}
                doit={deleteAccount}
                title={t('DeleteAccount')}
                />
        </Col>
    )
}
export default Profile;