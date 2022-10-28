
import {iProps} from '../myprofile'
import { Container ,Row,Col} from "react-bootstrap"
import {Tab} from '../../tools/tab'
import {UserInfo} from '../views/user'
import {SocialMedia} from '../views/social-media'
import {useFormik} from 'formik'
import {Info} from '../views/info'
import { useState } from "react"
import {Posts} from '../views/posts'
import {Data} from '../views/data'
import { GreenButton } from "../../tools/buttons/green-button"


export const  CompanyPublicProfile =()=>{
    let company=true
    
    let [tabIndex,setTabIndex]=useState(0)
    const formik= useFormik({
        initialValues:{
            twitter:'myTwitter.com',
            facebook:'myFacebook.com',
            youtube:'myYoutube.com',
            snapchat:'mySnapchat.com',
            tiktok:'myTiktok.com',
            instagram:'myInstagram.com',
            description:''
        },
        onSubmit:()=>{}
    })
    return (
       <Container className="p-1 ">
            <Row className="justify-content-evenly d-none d-sm-flex">

                <Col sm={3} xs={12} className={`fixedPart  bg-profile flex-column justify-content-between${company?'':'py-2'}`}>
                       
                       <Row className="gy-1 justify-content-center">

                        
                            <Col xs={12}>

                                <UserInfo 
                                 company={company}  
                                 edit={false} />
                            </Col>
                            <Col xs={12} className="mt-2 justify-content-center d-flex ">
                             

                                <Col xs={9}>
                                        <GreenButton
                                        label="Follow" 
                                        
                                        />
                                
                              </Col>
                             
                          
                            </Col>    
                        
                        
                            <Col xs={12}>

                                <SocialMedia 
                                        values={formik.values}
                                        handleChange={formik.handleChange}
                                        company={company}
                                    />
                            </Col>
                            <Col xs={12}>
                           
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8} xs={12} className="scrollablePart bg-profile py-sm-3 pb-5 pb-sm-3 ">
                        <Row>
                        
                        <Col xs={12}>
                            <Row className="p-sm-2 justify-content-center">
                                <Col sm={5} xs={12}
                                className={tabIndex===0?"tab active-tab":"tab"}
                                onClick={()=>setTabIndex(0)}>
                                
                               Personal Info
                                    
                                </Col>
                                <Col sm={5} xs={12}
                                className={tabIndex===1?"tab active-tab":"tab"}
                                onClick={()=>setTabIndex(1)}>
                                 Posts
                                </Col>
                              
                            </Row>
                        </Col>
                        <Col xs={12} >

                            <Tab num={tabIndex}>
                                <Info company={true} edit={false} publicProfile={true} />
                                <Posts />
                            </Tab>
                        </Col>
                    </Row>
                    </Col>
            
            </Row>
            {/* Mobile View */}
            <Row className="justify-content-evenly d-flex d-sm-none mobileViewScroll gy-3 bg-profile"
            style={{height:'fit-content'}}>

                <Col sm={3} xs={12} className={`   flex-column`}
               >
                <Row className='gy-2'>

                
                        <Col xs={12}>

                            <UserInfo company={company} edit={false}/>
                        </Col>
                        
                            <Col xs={12} className="mt-2 justify-content-center d-flex">
                              
                                    <Col xs={10}>
                                            <GreenButton
                                            label="Follow" 
                                            
                                            />
                                    </Col>
                                   
                                
                            </Col>
                   </Row> 
                           
                        
                </Col>
                <Col sm={8} xs={12} className="  py-sm-3 pb-5 pb-sm-3 ">
                            <Row className="gy-3">
                            
                            <Col xs={12}>
                                <Row className="p-sm-2 justify-content-center">
                                <Col  xs={6}
                                    className={tabIndex===0?"tab active-tab":"tab"}
                                    onClick={()=>setTabIndex(0)}>
                                    
                                        Posts
                                    </Col>
                                    <Col xs={6}
                                    className={tabIndex===1?"tab active-tab":"tab"}
                                    onClick={()=>setTabIndex(1)}>
                                    
                                        Info
                                    </Col>
                                    
                                </Row>
                            </Col>
                            <Col xs={12} >

                                <Tab num={tabIndex}>
                                    <Posts />
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={12}>

                                                <Info company={company} edit={false}
                                                publicProfile={true} />
                                            </Col>
                                            <Col xs={12} className="px-0 py-2">
                                                <Row>
                                                    <Col xs={12} className="fw-bold d-flex justify-content-center">
                                                        Socials Media
                                                    </Col>
                                                    <Col xs={12} className="px-0 ">

                                                        <SocialMedia 
                                                            values={formik.values}
                                                            handleChange={formik.handleChange}
                                                            company={company}
                                                        />
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Col>
                                   
                                
                                </Tab>
                            </Col>
                        </Row>
                    
                </Col>
            
            </Row>

       </Container>)
}