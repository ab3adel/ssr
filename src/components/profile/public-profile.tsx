
import { CompanyPublicProfile } from "./company/public-company-profile";
import {NormalUserPublicProfile} from './normal-user/public-profile-user'
import './views/profile-views.scss'
import Col from 'react-bootstrap/Col'
const PublicProfile=()=>{
    return (
        <Col xs={12} className="profileContainer">

             <CompanyPublicProfile /> 
            {/* <NormalUserPublicProfile />*/}
        </Col>
    )
}
export default PublicProfile;