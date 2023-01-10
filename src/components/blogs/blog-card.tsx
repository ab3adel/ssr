import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import profile from "../../images/home/icon-profile.svg";
import image1 from '../../images/home/image1.png'
let txt =`
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
Consequat qui quis pariatur reprehenderit est aute nostrud officia irure 
occaecat anim. Excepteur laboris fugiat minim in. Irure laboris excepteur 
commodo voluptate consequat ut velit.
`
console.log(txt.split(' '))
export default function BlogCard() {
  return (
    <Col xs={12} className="blogCard p-4">
        <Row className="gy-3">
            <Col xs={12}className="header">
                <Row >
                    <Col xs={8}>
                        <Col xs={8}>
                            <Row className="user">
                                
                                <div className='mx-2 profileImage'>
                                    <img  src={profile} />
                                </div>
                                <span className='d-flex flex-column ' style={{width:'fit-content'}}>

                                    <span className="userName fw-bold">userName</span>
                                    <span className="date"> 2 hours</span>
                                    
                                </span>
                                    
                                   
                                    

                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} className="body">
                <Row className="gy-3">
                    <Col xs={12}className="p-1">
                        <div className="image"
                        style={{background:`url(${image1})`}}>

                        </div>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12} className="title ">
                                <div className="p-1 fw-bold">
                                    TItle For the News TItle For the News
                                    TItle For the News
                                </div>
                            </Col>
                            <Col xs={12} className="short-description">
                                <div className="p-2">
                                    {txt.length>200? txt.split(' ').slice(0,25).join(' '):txt}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Col>
  )
}
