import './post-card.scss'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import valid from '../../images/home/valid-account-icon.svg'
import location from '../../images/home/location-icon.svg'
import profile from '../../images/home/icon-profile.svg'
import building from '../../images/home/building-icon.svg'

import share from '../../images/home/share-icon.svg'
import heartFilled from '../../images/home/heart-icon.svg'
import heart from '../../images/home/heart-filled-icon.svg'

import direction from '../../images/home/direction-icon.svg'
import Area from '../../images/home/area-icon.svg'
import amenities from '../../images/home/amenities-icon.svg'
import room from '../../images/home/room-icon.svg'
import Dropdown from 'react-bootstrap/Dropdown'
import {ThreeDotsVertical} from 'react-bootstrap-icons'
import {useLikePost} from '../tools/apis/uselikePost'
import {useEffect, useState,useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {ImagesGallery} from '../tools/imgs-gallery/imgs-gallery'
import {useNavigate} from 'react-router-dom'
import {iPost} from '../tools/interface'


export const PostCard =(
    {
        title,area,currency,images,price,role,username,main_property_type,number_of_bathrooms,
        number_of_rooms,offer_type,price_type,profile_picture,property_site,imgs_gallery_height,
        property_type,tags,id,likes,testImages,small_size,for_profile=false
    }:iPost
)=>{

    const [fullImage,setFullImage]=useState(false)
    const [react,setReact]=useState(false)
    const {i18n,t} = useTranslation()
    const [Imgs,setImages]=useState<string[]>([])
    const navigate= useNavigate()
    const [postLikes,setPostLikes]=useState(likes)
    const {setLike,setUnLike,likeData,isLikeLoading,likeError}=useLikePost()


 
  
    const handleLike =(id:number)=>{
       let theLikes=postLikes
        if (!react) {
            setLike(id)
            setPostLikes(theLikes + 1)
            setReact(true)
        }
        else {
            setUnLike(id)
            setPostLikes(theLikes - 1)
            setReact(false)
        }
       
    }
   
   
    return (
        <Col xs={12} sm={12}
        className="postCardContainer">
            <Card>
                <Card.Header>
                    <Row className="gy-1">
                        <Col xs={12}>
                            <Row className="justify-content-between">
                                <Col xs={10} lg={8}>
                                    <Row>
                                        <Col xs={3}>
                                            
                                               
                                            <img src={ profile_picture? profile_picture:profile} className="profile"
                                               style={small_size?{width:'45px',height:'45px'}:{}}/>

                                            
                                        </Col>
                                        <Col xs={8}>
                                            <Row className="gy-1 py-1">

                                                <Col xs={12}>
                                                    <div className="userName">
                                                        <span  style={small_size?{fontSize:'14px'}:{}} >{username}</span>
                                                        <img className="icon" src={valid}
                                                         style={small_size?{width:'12.5px',height:'12.5px'}:{}}
                                                      />
                                                    </div>
                                                </Col>
                                                <Col xs={12}>
                                                    <div className="location">
                                                        <img className='icon' src={location}
                                                          style={small_size?{width:'12.5px',height:'12.5px'}:{}}
                                                        />
                                                        <span>
                                                            {i18n.language==='en'?area.en:area.ar}
                                                        </span>
                                                    </div>
                                                </Col>
                                            </Row>
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
                            <Row className="gy-md-1 gy-lg-0">

                                <Col xs={6} lg={4}>
                                    <div className="tag grey "
                                    style={small_size?{fontSize:'12px'}:{}} >
                                      {i18n.language==='en'?role.en:role.ar}
                                    </div>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <div className="tag grey "
                                     style={small_size?{fontSize:'12px'}:{}}>
                                        <span>
                                            {
                                                property_type?
                                                i18n.language==='en'?
                                                property_type.en:property_type.ar:''
                                            }
                                        </span>
                                        <img src={building} className="icon" />
                                    </div>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <div className="tag green"
                                     style={small_size?{fontSize:'12px'}:{}}>
                                    {
                                        offer_type?
                                    i18n.language==='en'?offer_type.en:offer_type.ar:''
                                }
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
                            images={testImages as any[]}
                            price={price}
                            currency={currency}
                            height={imgs_gallery_height}
                            price_type={price_type}
                            />
                        </Col>
                        <Col xs={12}>
                            <Row className='justify-content-between'>

                                <Col xs={8}>
                                    <Row className="gy-1">
                                       
                                       {
                                        tags && tags?.length>0?
                                        tags?.map((ele,index)=>
                                        (
                                            <Col sm={4} xs={6} key={index}>
                                            <div className="badge "
                                            style={small_size?{fontSize:'10px'}:{}}>
                                               <span className="p-1">
                                               {i18n.language === 'en'?ele.name.en:ele.name.ar}
                                                </span> 
                                            </div>
                                        </Col>
                                        )
                                        )
                                        :''
                                       }
                                    
                                    </Row>
                                </Col>
                                <Col xs={4}>
                                  {  !for_profile &&
                                  ( <Row>
                                   
                                        <Col xs={7} className="iconBtn likeButton "
                                         onClick={()=>handleLike(id)}
                                         >
                                            <span >{postLikes}</span>
                                            <img src={react ? heartFilled: heart} />
                                          
                                        </Col>
                                        <Col xs={5} className="iconBtn">
                                            <img src={share} />
                                        </Col>
                                    
                                    </Row>)
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={12}>
                            <div className="title">
                               {i18n.language === 'en'?title.en:title.ar}
                            </div>
                        </Col>
                        <Col xs={12} className="details">
                            <Row className="gy-1">

                                <Col lg={3} md={5} xs={6} className="detail"
                                >
                                    
                                    <img  src={direction} style={small_size?{width:'17.4px',height:'17.4px'}:{}}/>
                                    <span style={small_size?{fontSize:'12px'}:{}}>North West</span>
                                </Col>
                                {number_of_rooms &&
                                (<Col lg={3} md={5} xs={6} className="detail">
                                    <img  src={room}  style={small_size?{width:'17.4px',height:'17.4px'}:{}} />
                                    <span style={small_size?{fontSize:'12px'}:{}}>{number_of_rooms}</span>
                                </Col>)
                                }
                                {
                                    number_of_bathrooms&&
                                (<Col lg={3} md={5} xs={6} className="detail">
                                    <img  src={amenities}  style={small_size?{width:'17.4px',height:'17.4px'}:{}} />
                                    <span style={small_size?{fontSize:'12px'}:{}}>{number_of_bathrooms}</span>
                                </Col>)
                                }
                               { 
                                <Col lg={3} md={5} xs={6} className="detail">
                                    <img  src={Area}  style={small_size?{width:'17.4px',height:'17.4px'}:{}}/>
                                    <span style={small_size?{fontSize:'12px'}:{}}>200 m<sup>2</sup> </span>
                                </Col>}
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

