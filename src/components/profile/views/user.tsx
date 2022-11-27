import { Col ,Row} from "react-bootstrap"
import Profile from '../../../images/home/icon-profile.svg'

import { GreenButton } from "../../tools/buttons/green-button"
import editIcon from '../../../images/edit.svg'
import {InputFile} from '../../tools/photoInput/photoInput'
import {useFormik} from 'formik'
import {SteadyIconInput} from '../../tools/steady-group/steady-icon-input/steady-icon-input'
interface iProps {
    company:boolean
    ,edit:boolean
    ,t:Function
    ,full_name?:string
    ,profile_picture?:string
    ,setFieldValue?:Function
    ,handleChange?:Function
    ,handleBlur?:Function
    ,errors?:{[key:string]:any}
    ,touched?:{[key:string]:any}
}
export const UserInfo=({company,edit=false,t,profile_picture
    ,full_name,setFieldValue=()=>{}
    ,handleChange=()=>{},handleBlur=()=>{},
    errors,touched
}:iProps)=>{

   return (
        <Col xs={12}>
                    <Row className="gy-2 user my-sm-0 my-1">
                        <Col sm={12} xs={4} className="d-flex justify-content-center ">
                           {edit?
                           
                           <InputFile 
                             value={profile_picture}
                             setValue={setFieldValue}
                             name='profile_picture'
                             width={80}
                             height={80}
                             default_image={Profile}
                           />:
                           <img src={profile_picture?profile_picture:Profile} className="profilePicture lg-view" />
                        }
                        </Col>
                      
                           {edit?
                           <Col xs={8} sm={12}>

                               <SteadyIconInput 
                               value={full_name}
                               handleBlur={handleBlur}
                               name="full_name"
                               type={"text"}
                               onChange={handleChange}
                               label={t("FullName")}
                               error={errors?errors['full_name']:''}
                               touched={touched?touched['full_name']:false}

                               />
                           </Col>

                           :
                           <Col sm={12} xs={8} className="d-flex justify-content-sm-center  align-items-center align-items-sm-start ">
                             <div className="fw-bold text">{full_name?full_name:'Unknown User'}</div>
                           </Col>
                           }
                        
                   
                       
                       
                    </Row>
                </Col>
    )
}