
import { CompanyPublicProfile } from "./company/public-company-profile";
import { NormalUserPublicProfile } from './normal-user/public-profile-user'
import './views/profile-views.scss'
import Col from 'react-bootstrap/Col'
import { useTranslation } from "react-i18next";
export interface PublicProfileProps {t:Function}
const PublicProfile = () => {
const {t}=useTranslation()
    return (
        <Col xs={12} className="profileContainer">

            {/* <CompanyPublicProfile t={t}/> */}
            <NormalUserPublicProfile t={t} />
        </Col>
    )
}
export default PublicProfile;