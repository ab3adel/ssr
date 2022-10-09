import {cloneElement} from 'react'
import {PersonalInfoForm} from '../views/personalInfo-form'
import {SecurityForm} from '../views/security-form'
import {LocationForm} from '../views/location-form'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {useTranslation} from 'react-i18next'


interface iProps {tab:number,children?:React.ReactNode[]}
 const UserType = ({tab,children}:iProps) =>{
   const {t,i18n}=useTranslation()

    return (
        <Row className="gy-5">
                            <Col xs={12} >
                                <Row className="tabs justify-content-center">

                                    <Col xs={4}
                                    
                                    
                                    className={tab===0?"tab tabActive":"tab tabInactive"}
                                    style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}
                                    >
                                       <span>
                                          {t("PersonalInfo")}
                                       </span>
                                    </Col>
                                    
                                    <Col xs={4}
                                    
                                    
                                    className={tab===1?"tab tabActive":"tab tabInactive"}
                                    style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                       <span>
                                             {t("Security")}
                                       </span>
                                    </Col>
                                    <Col xs={4}
                                    
                                    
                                    className={tab===2?"tab tabActive":"tab tabInactive"}
                                    style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                       <span>
                                             Location
                                       </span>
                                    </Col> 
                                </Row>
                            </Col>
                            <Col xs={12}>
{/*                            
                             {/* tab===0 && ( <PersonalInfoForm  
                             type={'User'}/>) */}
                             {/* {tab===1 && ( <LocationForm
                                              type="User"/>)} */}
                             {/*tab===1 && ( <SecurityForm />) */} 
                           {children?.map((ele,index)=>{
                              if (index === tab) {
                                 return ele
                              }
                           })}
                            </Col>
                        </Row>
    )
}
export default UserType;