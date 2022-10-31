import { useState, useTransition } from 'react'
import Col from 'react-bootstrap/Col'
import { NormalUserProfile } from './normal-user/normal-user'
import { CompanyProfile } from './company/company'
import { EditCompanyProfile } from './company/edit-company'
import {useTranslation} from 'react-i18next'
import './views/profile-views.scss'
export interface iProps { edit: boolean, setEdit: Function ,t:Function}
const Profile = () => {
    const [editProfile, setEditProfile] = useState(false)
    const {t}=useTranslation()

    return (
        <Col xs={12} className="profileContainer">
{/* 
            {editProfile ?
                <EditCompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                    t={t}
                />
                :
                <CompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                    t={t}
                />}

 */}

            <NormalUserProfile
                edit={editProfile} setEdit={setEditProfile}
                t={t} />

        </Col>
    )
}
export default Profile;