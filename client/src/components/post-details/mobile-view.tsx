import valid from "../../images/home/valid-account-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import heartFilled from "../../images/home/heart-icon.svg";
import heart from "../../images/home/heart-filled-icon.svg";
import share from "../../images/home/share-icon.svg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import location from "../../images/post-details/location.svg";
import {Eye} from 'react-bootstrap-icons'
import { ImagesGallery } from "../tools/imgs-gallery/imgs-gallery";
import area from "../../images/post-details/area.svg";
import amenities from "../../images/post-details/amenities.svg";
import room from "../../images/post-details/room.svg";
import { TextAccordion } from "../tools/text-accordion/text-accordion";
import { FixedSection } from "./fixed-section";
import chat from "../../images/post-details/chat-icon.svg";
import SettingContext from "../tools/context/setting-context/setting-context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import {iProps} from './'

export const MobileView = ({
  images,
  description,
  handleReact,
  react,
  post,
  postLikes,
  handleChat,
  mobileView,
  setOpenbox,
  navigateProfile,
  shares,
  views
}: iProps) => {
  const { openSidebar } = useContext(SettingContext);
  const { i18n,t } = useTranslation();

return (
    <Col xs={12} className="scrollableSection">
      <Card>
        <Card.Header>
          <Row className="gy-1">
            <Col xs={12}>
              <Row className="justify-content-between ">
                <Col xs={12}>
                  <Row className="gy-3">
                    <Col xs={3}
                    onClick={()=>navigateProfile()}>
                      <img
                        src={
                          post.profile_picture
                            ? post.profile_picture
                            : profile
                        }
                        className="profile"
                      />
                    </Col>
                    <Col xs={9} className="d-flex  align-items-center">
                      <div className="userName">
                        <span>{post.username}</span>
                        <img className="icon" src={valid} />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className={post.category?"category":'invisible'}>
                        {post.category
                          ? i18n.language === "en"
                            ? post.category?.en
                            : post.category?.ar
                          : "Post Category"}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="gy-3">
            <Col xs={12} className="p-0 p-sm-1 d-flex justify-content-center align-items-center">
              <ImagesGallery images={post.images} post_detail={true} />
            </Col>
            <Col xs={12}>
              <Row className='gy-3'>
                <Col xs={12} >
                  <Row className="d-flex align-items-center">
                    <Col xs={5}>

                      <Row  >
                        <Col
                          xs={4}
                          className="iconBtn "
                          onClick={() => handleReact(post.id)}
                        >
                          <span className="fw-bold mx-1">{postLikes}</span>
                          <img src={react ? heartFilled : heart} />
                        </Col>
                        <Col xs={4} className="iconBtn"
                        onClick={()=>setOpenbox(true)}>
                           <span className="fw-bold mx-1">{shares}</span>
                          <img src={share} />
                        </Col>
                        <Col xs={4} className="iconBtn"
                        >
                             <span className="fw-bold mx-1">{views}</span>
                          <Eye />
                        </Col>

                      </Row>
                    </Col>
                    <Col xs={7} className='d-flex justify-content-evenly align-items-center'>
                      <>
                      <span className="fw-bold">{post.price?
                      parseInt(post.price).toLocaleString('en')
                      :''
                    }
                      </span>{" "}
                      <span style={{margin:'0 2px'}}>
                      {" "}
                        {post.price ?i18n.language === "en"
                       
                          ? post.currency?.en
                          : post.currency?.ar:''}
                          </span>
                       
                        <span>
                        {false
                          ? i18n.language === "en"
                            ? (post.price ? "/ ":"") + post.price_type?.en 
                            :(post.price ?"/ ":'') +  post.price_type?.ar 
                          : ""}
                          </span>
                      </>
                    </Col>
                  </Row>
                </Col>
                
                  <Col xs={12} className="fw-bold h4 ">
                    {i18n.language === "en" ? post.title?.en : post.title?.ar}
                  </Col>
                  
                
              </Row>
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                  <Row className="gy-1">
                    {post.tags && post.tags.length > 0
                      ? post.tags.map((ele: any, index: number) => (
                          <Col xs={4} key={index}>
                            <div className="badge" key={index}>
                              {i18n.language === "en"
                                ? ele.name?.en
                                : ele.name?.ar}
                            </div>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={12}></Col>
            <Col xs={12} className="p-0">
              <FixedSection post={post} mobileView={mobileView}/>
            </Col>
            <Col xs={12}>
              <Row className="mt-1 gy-3">
                <Col xs={12}>
                  <Row className="gy-2">
                    {!post.news_type&&
                    (<Col
                      sm={3}
                      xs={5}
                      className="d-flex align-items-center"
                    >
                      <img className="locationIcon" src={location} />
                      <span className="mx-1"style={{fontSize:'0.777rem'}}>
                        {i18n.language === "en" ? post.area?.en : post.area?.ar}
                      </span>
                    </Col>)}
                    <Col sm={4} xs={7}>
                      {/* <Button className="mapBtn">
                        <img src={map} />
                        <span>{t("GoToMap")}</span>
                      </Button> */}
                    </Col>
                
                    { post.descriptive_address &&
                      ( 
                        <>
                     <Col sm={4} xs={12} className="fw-bold fs-5">
                     {t('DescriptiveAddress')}
                     </Col>
                    <Col xs={12}>
                     
                    
                      <TextAccordion
                       description={
                        i18n.language==='en'?
                        post.descriptive_address.en:post.descriptive_address.ar
                       }
                     />
                       
                    
                      
                    </Col>
                    </>
                    )}
                   
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                  {post.number_of_rooms && (
                    <Col sm={3} xs={4} className="detail">
                      <img src={room} />
                 
                        <>
                          <span>{post.number_of_rooms}</span>
                          <span>{t("Rooms")}</span>
                        </>
                      
                    </Col>
                    )}
                    {post.number_of_bathrooms && (
                    <Col sm={3} xs={4} className="detail">
                      <img src={amenities} />
                     
                        <>
                          <span>{post.number_of_bathrooms}</span>
                          <span>{t("Baths")}</span>
                        </>
                    
                    </Col>  )}
                   { post.space &&
                    (<Col sm={3} xs={4} className="detail">
                      <img src={area} />
                      <span>
                        {post.space} m<sup>2</sup>{" "}
                      </span>
                    </Col>)
                    }
                  </Row>
                </Col>
                

               { post.description &&
               (
               <Col xs={12}>
                 <Col sm={4} xs={12} className="fw-bold fs-5">
                  {t('Description')}
                  </Col>
                  <TextAccordion
                    description={
                      i18n.language === "en"
                        ? post.description?.en
                        : post.description?.ar
                    }
                  />
                </Col>
                
                )}
                <Col xs={12}>
                {
                    post.services_available&&
                   (
                    <>
                  <Col sm={4} xs={12} className="fw-bold fs-5">
                    {t('ServicesAvailable')}
                  </Col>
                  <Col xs={12}>

                  <TextAccordion
                    description={
                      i18n.language === "en"
                      ? post.services_available?.en
                      : post.services_available?.ar
                    }
                  />
                    
                    
                  </Col>
                  </>)
}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
     {!post.news_type &&
      <Col
        xs={12}
        className={
          openSidebar ? "d-none" : "fixed-chat-button d-flex justify-content-center"
        }
      >
        <Col xs={10} className="chatBtn  "
        onClick={()=>handleChat()}>
          <img src={chat} />
          <span>{t("Chat")}</span>
        </Col>
      </Col>
      }
    </Col>
  );
};
