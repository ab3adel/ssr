import { Col ,Row} from "react-bootstrap"
import Profile from '../../../images/profile/profile.png'

import { GreenButton } from "../../tools/buttons/green-button"
import editIcon from '../../../images/edit.svg'
import {InputFile} from '../../tools/photoInput/photoInput'
import {useFormik} from 'formik'
import {SteadyIconInput} from '../../tools/steady-group/steady-icon-input/steady-icon-input'
interface iProps {company:boolean,edit:boolean}
export const UserInfo=({company,edit=false}:iProps)=>{
    const formik =useFormik({
        initialValues:{
            profile:'',
            user_name:''
        },
        onSubmit:()=>{}
    })
    return (
        <Col xs={12}>
                    <Row className="gy-2 user my-sm-0 my-1">
                        <Col sm={12} xs={4} className="d-flex justify-content-center ">
                           {edit?
                           
                           <InputFile 
                             value={formik.values.profile}
                             setValue={formik.setFieldValue}
                             name='profile'
                             width={80}
                             height={80}
                             default_image={Profile}
                           />:
                           <img src={Profile} className="profilePicture lg-view" />
                        }
                        </Col>
                      
                           {edit?
                           <Col xs={8} sm={12}>

                               <SteadyIconInput 
                               value={formik.values.user_name}
                               handleBlur={formik.handleBlur}
                               name="user_name"
                               type={"text"}
                               onChange={formik.handleChange}
                               label="Full Name"
                               />
                           </Col>

                           :
                           <Col sm={12} xs={8} className="d-flex justify-content-sm-center  align-items-center align-items-sm-start ">
                             <div className="fw-bold text">Jone Doe</div>
                           </Col>
                           }
                        
                   
                       
                       
                    </Row>
                </Col>
    )
}