import {Row,Col} from 'react-bootstrap'
import snapchat from '../../../images/auth/snapchat-icon.svg'
import tiktok from '../../../images/auth/tiktok-icon.svg'
import twitter from '../../../images/auth/twitter-icon.svg'
import instagram from '../../../images/auth/instagram-icon.svg'
import youtube from '../../../images/auth/youtube-icon.svg'
import facebook from '../../../images/auth/facebook-icon.svg'
import {SteadyIconInput} from '../../tools/steady-group/steady-icon-input/steady-icon-input'
import React from 'react'
import { GreenButton } from '../../tools/buttons/green-button'
let icons=[{icon:snapchat,title:'snapchat'},
{icon:tiktok,title:'tiktok'},{icon:twitter,title:'twitter'}
,{icon:instagram,title:'instagram'},{icon:youtube,title:'youtube'},
{icon:facebook,title:'facebook'}]
interface iProps {values:any,
    handleChange:(e:React.ChangeEvent)=>void
    ,company:boolean,edit?:boolean
}
export const SocialMedia =({values,handleChange,company,edit}:iProps)=>{

    return (
        <Row className="gy-1 py-sm-1 socialMediaContainer justify-content-end flex-column">
            { 
           company &&
           (<> <Col xs={12} className="d-sm-flex d-none justify-content-center">
                <div className="fw-bold h6">
                    Social Media Accountes
                </div>
            </Col>
          <Row className="justify-content-center gy-sm-1 gy-3">


                {
                    icons.map((ele,index:number)=>
                    <Col xs={edit?6:12} key={index}>

                        <SteadyIconInput icon={ele.icon} 
                        name={ele.title} type="text" 
                        height={'35px'} disabled={edit?false:true}
                        value={values[ele.title]} onChange={handleChange}
                    
                        
                    
                        />
                    </Col>
                    )
                }
            
            </Row>
            </>)
            }
            <Col xs={12}>
            {false &&
                (
                <Row className="gy-1 d-none d-sm-flex">
               
                    <Col xs={11}>
                        <GreenButton
                        label="Edit Profile" />
                    </Col>
                    
                    <Col xs={11} className="d-none d-sm-block">
                        <GreenButton 
                        label={'Change Password'}/>
                    </Col>
                   
                </Row>)
            }
            </Col>
        </Row>
    )
}