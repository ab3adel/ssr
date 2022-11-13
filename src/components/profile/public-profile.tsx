
import { CompanyPublicProfile } from "./company/public-company-profile";
import { NormalUserPublicProfile } from './normal-user/public-profile-user'
import './views/profile-views.scss'
import Col from 'react-bootstrap/Col'
import { useTranslation } from "react-i18next";
export interface PublicProfileProps {t:Function,lang:string}
const PublicProfile = () => {
const {t,i18n}=useTranslation()
    return (
        <Col xs={12} className="profileContainer">

            {/* <CompanyPublicProfile t={t} lang={i18n.language}/> */}
            <NormalUserPublicProfile t={t} lang={i18n.language}/>
        </Col>
    )
}
export default PublicProfile;