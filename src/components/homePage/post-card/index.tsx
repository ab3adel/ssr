import './post-card.scss'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import valid from '../../../images/home/valid-account-icon.svg'
import location from '../../../images/home/location-icon.svg'
import profile from '../../../images/home/icon-profile.svg'
import building from '../../../images/home/building-icon.svg'

import share from '../../../images/home/share-icon.svg'
import heartFilled from '../../../images/home/heart-icon.svg'
import heart from '../../../images/home/heart-filled-icon.svg'

import direction from '../../../images/home/direction-icon.svg'
import area from '../../../images/home/area-icon.svg'
import amenities from '../../../images/home/amenities-icon.svg'
import room from '../../../images/home/room-icon.svg'
import Dropdown from 'react-bootstrap/Dropdown'
import {ThreeDotsVertical} from 'react-bootstrap-icons'
import image1 from '../../../images/home/image1.png'
import image2 from '../../../images/home/image2.png'
import image3 from '../../../images/home/image3.png'
import image4 from '../../../images/home/image4.png'
import {useEffect, useState,useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {ImagesGallery} from '../../tools/imgs-gallery/imgs-gallery'
import {useNavigate} from 'react-router-dom'
let images=[image1,image2,image3,image4]
export const PostCard =()=>{

    const [fullImage,setFullImage]=useState(false)
    const [react,setReact]=useState(false)
    const {i18n,t} = useTranslation()
 
    const navigate= useNavigate()


 
  
    const handelReact =()=>{
        setReact(!react)
    }
    return (
        <Col xs={12} sm={6}
        className="postCardContainer">
            <Card>
                <Card.Header>
                    <Row className="gy-1">
                        <Col xs={12}>
                            <Row className="justify-content-between">
                                <Col xs={10} sm={5}>
                                    <Row>
                                        <Col xs={4}>
                                            <img src={profile} className="profile"/>
                                        </Col>
                                        <Col xs={8}>
                                            <Col xs={12}>
                                                <div className="userName">
                                                    <span >Jane Done</span>
                                                    <img className="icon" src={valid} />
                                                </div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className="location">
                                                    <img className='icon' src={location}/>
                                                    <span>Kwait city</span>
                                                </div>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={2} className="options">
                                   
                                    <Dropdown>
                                        <Dropdown.Toggle  id="dropdown-basic">
                                           <ThreeDotsVertical className='icon' />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={()=>navigate('/postdetails/1')}>
                                                Details
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Report
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                Hide
                                            </Dropdown.Item>
                                           
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <Row>

                                <Col xs={6} sm={3}>
                                    <div className="tag grey">
                                        Real_Estate
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="tag grey">
                                        <span>Flat</span>
                                        <img src={building} className="icon" />
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="tag green">
                                        For Rent
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row className='gy-1'>
                        <Col xs={12} className="p-0 p-sm-1">
                           <ImagesGallery 
                            images={images}
                            price={6999}
                            />
                        </Col>
                        <Col xs={12}>
                            <Row className='justify-content-between'>

                                <Col xs={8}>
                                    <Row className="gy-1">

                                        <Col sm={4} xs={6}>
                                            <div className="badge">
                                                Low price
                                            </div>
                                        </Col>
                                        <Col sm={4} xs={6}>
                                            <div className="badge">
                                                Special offer
                                            </div>
                                        </Col>
                                        <Col sm={4} xs={6}>
                                            <div className="badge">
                                                Best seller
                                            </div>
                                        </Col>
                                    
                                    </Row>
                                </Col>
                                <Col xs={3}>
                                    <Row>

                                        <Col xs={6} className="iconBtn "
                                         onClick={handelReact}
                                         >
                                            <img src={react ? heartFilled: heart} />
                                        </Col>
                                        <Col xs={6} className="iconBtn">
                                            <img src={share} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <div className="title">
                                White space house
                            </div>
                        </Col>
                        <Col xs={12} className="details">
                            <Row className="gy-1">

                                <Col sm={3} xs={6} className="detail">
                                    
                                    <img  src={direction} />
                                    <span>North West</span>
                                </Col>
                                <Col sm={3} xs={6} className="detail">
                                    <img  src={room} />
                                    <span>2</span>
                                </Col>
                                <Col sm={3} xs={6} className="detail">
                                    <img  src={amenities} />
                                    <span>2</span>
                                </Col>
                                <Col sm={3} xs={6} className="detail">
                                    <img  src={area} />
                                    <span>200 m<sup>2</sup> </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

