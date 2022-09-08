
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {useTranslation} from 'react-i18next'
import {InputWithIcon} from '../../../tools/input/inputIcon'
import {Select} from '../../../tools/select/select'
import location from '../../../../images/auth/location-icon.svg'
let countries=['Syria','Kwait']

interface iProps {type:'User' | 'Commercial'}
export const LocationForm =({type}:iProps)=>{
    const {t}=useTranslation()

    
    return (
        <Row className='gy-2 locationForm'>
            <Col xs={12}>
                <Row className="locationContainer gy-1">

                    <Col sm={4} xs={6}>
                        <Select 
                        options={countries}
                    label={t('Country')}
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                        <Select 
                    
                    label={t('Area')}
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Block")}
                        name="Block"
                        id="Block"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Avenue")}
                        name="Avenue"
                        id="Avenue"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Street")}
                        name="Street"
                        id="Street"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Building")}
                        name="Building"
                        id="Building"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Floor")}
                        name="Floor"
                        id="Floor"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label="Flat"
                        name="Flat"
                        id="Flat"
                        type="text"
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label="PACIID"
                        name="PACIID"
                        id="PACIID"
                        type="text"
                        />
                        
                    </Col>
                </Row>

            </Col>
            {
                type==='Commercial' &&
            (
            <Col xs={12}>
                <div className="mapBtn">
                   
                        <img src={location} />
                        <span>{t("SetLocation")}</span>
                   
                </div>
            </Col>
            )
            }
        </Row>
    )
    }