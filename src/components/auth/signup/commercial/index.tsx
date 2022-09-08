

import {PersonalInfoForm} from '../views/personalInfo-form'
import {SecurityForm} from '../views/security-form'
import {LocationForm} from '../views/location-form'
import {RequiredFilesForm} from '../views/requiredFiltes-form'
import {useTranslation} from 'react-i18next'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


interface iProps {tab:number,setTab:Function}
const CommercialType = ({tab,setTab}:iProps) =>{
const {t,i18n}=useTranslation()
   return (
       <Row className="gy-5">
                           <Col xs={12} >
                               <Row className="tabs gy-2">

                               <Col xs={3}
                               
                               onClick={()=>setTab(0)}
                               className={tab===0?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}
                               >
                                 <span>
                                      {t("PersonalInfo")}
                                   </span>
                               </Col>
                               <Col xs={3}
                               
                               onClick={()=>setTab(1)}
                               className={tab===1?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                   <span>
                                       {t("Location")}
                                   </span>
                               </Col>
                               <Col xs={3}
                               
                               onClick={()=>setTab(2)}
                               className={tab===2?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                  <span>
                                       {t("Security")}
                                   </span>
                               </Col>
                               <Col xs={3}
                               
                               onClick={()=>setTab(3)}
                               className={tab===3?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                 <span>
                                       {t("RequiredFiles")}
                                   </span>
                               </Col>
                               </Row>
                           </Col>
                           <Col xs={12}>
                          
                            {tab===0 && ( <PersonalInfoForm  
                                            type={'Commercial'}/>)}
                            {tab===1 && ( <LocationForm
                                           type="Commercial"
                                             />)}
                            {tab===2 && ( <SecurityForm />)}
                            {tab===3 && (<RequiredFilesForm />)}
                           </Col>
                       </Row>
   )
}
export default CommercialType;