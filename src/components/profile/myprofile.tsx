import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import { NormalUserProfile } from './normal-user/normal-user'
import { CompanyProfile } from './company/company'
import { EditCompanyProfile } from './company/edit-company'
import './views/profile-views.scss'
export interface iProps { edit: boolean, setEdit: Function }
const Profile = () => {
    const [editProfile, setEditProfile] = useState(false)

    return (
        <Col xs={12} className="profileContainer">

            {editProfile ?
                <EditCompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                />
                :
                <CompanyProfile
                    edit={editProfile}
                    setEdit={setEditProfile}
                />}



            <NormalUserProfile
                edit={editProfile} setEdit={setEditProfile} />

        </Col>
    )
}
export default Profile;