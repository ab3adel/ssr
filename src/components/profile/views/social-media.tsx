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
    edit?:boolean,t:Function
}
export const SocialMedia =({values,handleChange,edit,t}:iProps)=>{

    return (
        <Row className="gy-1 py-sm-1 socialMediaContainer justify-content-end flex-column">
           <Col xs={11} className={`d-sm-flex d-none ${edit? '':'justify-content-center'}`}>
                <div className="fw-bold" style={{fontSize:edit?'16px':'12px'}}>
                   {t("SocialMediaAccountes")}
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
           
           
        </Row>
    )
}