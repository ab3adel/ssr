import './forms.scss'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {InputFile} from '../../../tools/photoInput/photoInput'
import {InputWithIcon} from '../../../tools/input/inputIcon'
import {Select} from '../../../tools/select/select'
import facebook from '../../../../images/auth/facebook-icon.svg'
import twitter from '../../../../images/auth/twitter-icon.svg'
import tiktok from '../../../../images/auth/tiktok-icon.svg'
import snapchat from '../../../../images/auth/snapchat-icon.svg'
import youtube from '../../../../images/auth/youtube-icon.svg'
import instagram from '../../../../images/auth/instagram-icon.svg'
import {useTranslation} from 'react-i18next'
interface iProps {type:'User' | 'Commercial'}
export const PersonalInfoForm = ({type}:iProps)=>{
    const {t}=useTranslation()
    if (type === 'User') {

        return (
            <Row className="personalInfoContainer gy-3 gy-sm-0">
                <Col sm={4} xs={12} className="d-flex justify-content-center d-sm-block">
                    <InputFile />
                </Col>
                <Col sm={8} xs={12}>
                    <Col xs={12}>
                        <InputWithIcon 
                        type="text"
                        label={t("FullName")}
                        id="fullName"
                        name="fullName"
    
                           />
                    </Col>
                    <Col xs={12}>
                        <InputWithIcon 
                        type="text"
                        label={t("Email")}
                        id="email"
                        name="email"
    
                           />
                    </Col>
                    <Col xs={12}>
                        <InputWithIcon 
                        type="number"
                        label={t("PhoneNumber")}
                        id="phoneNumber"
                        name="phoneNumber"
    
                           />
                    </Col>
                </Col>
            </Row>
        )
    }

        return (
            <Row className="personalInfoContainer" >
                <Col sm={4} xs={12} className="d-flex d-sm-block justify-content-center p-2 p-sm-0">
                    <InputFile />
                </Col>
                <Col sm={8} xs={12}>
                    <Row  className="gy-3">
                        <Col xs={12}>
                            <Row className="gy-2" >
                                <Col xs={12}>
                                    <Select label={t("CompanyType")}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("FullName")} 
                                    id="FullName"
                                    name="FullName"
                                    type="text"
                                    />       
                                </Col>
                                <Col xs={12}>
                                    <Select label={t("Category")}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("Email")+" "+ t("Optional") }
                                    id="Email"
                                    name="Email"
                                    type="text"
                                    />       
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("PhoneNumber" )}
                                    id="PhoneNumber"
                                    name="PhoneNumber"
                                    type="number"
                                    />       
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                    label={t("Website")} 
                                    id="Website"
                                    name="Website"
                                    type="text"
                                    />       
                                </Col>
                                
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row className='gy-2'>
                                <Col xs={12}>
                                    <div className="text">
                                        {t("SocialMediaAccounts")}
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Facebook')}
                                      name="facebook"
                                      type="text"
                                      id="facebook"
                                      icon={facebook}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Twitter')}
                                      name="twitter"
                                      type="text"
                                      id="twitter"
                                      icon={twitter}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Instagram')}
                                      name="instagram"
                                      type="text"
                                      id="instagram"
                                      icon={instagram}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Youtube')}
                                      name="youtube"
                                      type="text"
                                      id="youtube"
                                      icon={youtube}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Snapchat')}
                                      name="snapchat"
                                      type="text"
                                      id="snapchat"
                                      icon={snapchat}/>
                                </Col>
                                <Col xs={12}>
                                    <InputWithIcon 
                                      label={t('Tiktok')}
                                      name="tiktok"
                                      type="text"
                                      id="tiktok"
                                      icon={tiktok}/>
                                </Col>
                                


                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
        )
    
}