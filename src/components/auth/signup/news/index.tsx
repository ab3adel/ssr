import {useTranslation} from 'react-i18next'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


interface iProps {tab:number,setTab:Function,children:React.ReactNode []}
const NewsType = ({tab,setTab,children}:iProps) =>{
const {t,i18n}=useTranslation()
   return (
       <Row className="gy-5">
                           <Col xs={12} >
                               <Row className="tabs gy-2 justify-content-center">

                               <Col xs={3}
                               
                               
                               className={tab===0?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}
                               >
                                 <span>
                                      {t("PersonalInfo")}
                                   </span>
                               </Col>
                              
                               <Col xs={3}
                               
                       
                               className={tab===1?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                  <span>
                                       {t("Security")}
                                   </span>
                               </Col>
                               <Col xs={3}
                               
                              
                               className={tab===2?"tab tabActive":"tab tabInactive"}
                               style={i18n.language==="ar"?{justifyContent:"center"}:{justifyContent:"flex-start"}}>
                                 <span>
                                       {t("Description")}
                                   </span>
                               </Col>
                               </Row>
                           </Col>
                           <Col xs={12}>
                          
                            {/* {tab===0 && ( <PersonalInfoForm  
                                            type={'Commercial'}/>)}
                            {tab===1 && ( <LocationForm
                                           type="Commercial"
                                             />)}
                            {tab===2 && ( <SecurityForm />)}
                            {tab===3 && (<RequiredFilesForm />)} */}
                            {children?.map((ele,index)=> {
                                if (index === tab) return ele
                            })}
                           </Col>
                       </Row>
   )
}
export default NewsType;