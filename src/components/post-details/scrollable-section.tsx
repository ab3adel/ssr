import valid from "../../images/home/valid-account-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import heartFilled from "../../images/home/heart-icon.svg";
import heart from "../../images/home/heart-filled-icon.svg";
import share from "../../images/home/share-icon.svg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import location from "../../images/post-details/location.svg";
import { ImagesGallery } from "../tools/imgs-gallery/imgs-gallery";
import area from "../../images/post-details/area.svg";
import amenities from "../../images/post-details/amenities.svg";
import room from "../../images/post-details/room.svg";
import { TextAccordion } from "../tools/text-accordion/text-accordion";
import { useEffect, useRef } from "react";

import {Eye} from 'react-bootstrap-icons'
import {iProps} from './'
import { useTranslation } from "react-i18next";
export const ScrollableSection = ({
  images,
  description,
  handleReact,
  react,
  post,
  postLikes,
  setOpenbox,
  navigateProfile,
  shares,
  views
}: iProps) => {
const {t,i18n}=useTranslation()
const elemRef =useRef()

  return (
    <Col xs={7} className="scrollableSection">
      <Card>
        <Card.Header>
          <Row className="gy-1">
            <Col xs={12}>
              <Row className="justify-content-between ">
                <Col sm={12} lg={10}>
                  <Row className="gy-3">
                    <Col sm={4} lg={4} style={{width:'fit-content'}}
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
                    <Col sm={8} lg={7} className="d-flex  align-items-center">
                      <div className="userName">
                        <span>{post.username} 
                         
                        </span>
                        <img className="icon" src={valid} />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className={post.category?"category":'invisible'}>
                        {post.category
                          ? i18n.language === "en"
                            ? post.category.en
                            : post.category.ar
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
            <Col xs={12} className="d-flex justify-content-center align-items-center">
              <ImagesGallery images={post.images} post_detail={true} />
            </Col>

            <Col xs={12}>
              <Row>
                <Col sm={7} lg={8}>
                  <Row className="gy-1">
                    {post.tags && post.tags.length > 0
                      ? post.tags.map((ele: any, index: number) => (
                          <Col xs={4} key={index}>
                            <div className="badge" key={index}>
                              {i18n.language === "en"
                                ? ele.name.en
                                : ele.name.ar}
                            </div>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Col>
                <Col sm={5} lg={4}>
                  <Row>
                    <Col
                      xs={4}
                      className="iconBtn "
                      onClick={() => handleReact(post.id)}
                    >
                      <img src={react ? heartFilled : heart} />
                      <span className="mx-1 h5 fw-bold">{postLikes}</span>
                    </Col>
                    <Col xs={4} className="iconBtn"
                          onClick={()=>setOpenbox(true)}>
                      <img src={share} />
                      <span className="mx-1 h5 fw-bold">{shares}</span>
                    </Col>
                    <Col xs={4} className="iconBtn"
                    style={{cursor:'auto'}}
                          >
                      <Eye />
                      <span className="mx-1 h5 fw-bold">{views}</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Col sm={12} lg={6}>
                <div>
                  {post.price? i18n.language === "en" ? post.currency.en :'':''}{" "}
                  <span className="fw-bold">{post.price?
                    parseInt(post.price).toLocaleString('en')
                      :''
                    }</span>{}
                    {post.price?i18n.language==='ar'? post.currency.ar:'':''}
                  {post.price_type
                    ? i18n.language === "en"
                      ?(post.price? " / ":'') + post.price_type?.en 
                      :(post.price? " / ":'') +  post.price_type?.ar 
                    : ""}
                </div>
              </Col>
              <Col sm={12} lg={12} className="fw-bold fs-5">
                {i18n.language === "en" ? post.title.en : post.title.ar}
              </Col>
            </Col>
            <Col xs={12}>
              <Row className="mt-1 gy-3">
                <Col xs={12}>
                  <Row className="gy-2">
                    {!post.news_type &&(
                    <Col sm={9} lg={4} className="d-flex  align-items-center">
                      <img className="locationIcon" src={location} />
                      <span className="mx-1">
                        {i18n.language === "en" ? post.area.en : post.area.ar}
                      </span>
                    </Col>)}
                    <Col xs={4}>
                      {/* <Button className="mapBtn">
                        <img src={map} />
                        <span>{t("GoToMap")}</span>
                      </Button> */}
                    </Col>
                    <Col xs={12}>
                      {
                        post.descriptive_address?
                        i18n.language==='en'?
                        post.descriptive_address.en:post.descriptive_address.ar:''
                      }
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                  {post.number_of_rooms && (
                    <Col lg={3} xs={4} className="detail">
                      <img src={room} />
                    (
                        <>
                          <span>{post.number_of_rooms}</span>
                          <span>{t('Rooms')}</span>
                        </>
                    )
                    </Col>
                      )}
                    {post.number_of_bathrooms  &&
                    <Col lg={3} xs={4} className="detail">
                      <img src={amenities} />
                      (
                        <>
                          <span>{post.number_of_bathrooms}</span>
                          <span>{t('Bath')}</span>
                        </>
                      )
                    </Col>}
                    { post.space &&
                    <Col lg={3} xs={4} className="detail">
                      <img src={area} />
                    
                     ( <span>
                        {post.space} m<sup>2</sup>{" "}
                      </span>)
                      
                    </Col>
}
                  </Row>
                </Col>
                <Col xs={12}>
                 <Col lg={4} xs={5} className="fw-bold fs-5">
                    {t('Description')}
                  </Col>
                  <TextAccordion
                    description={
                      i18n.language === "en"
                        ? post?.description?.en
                        : post?.description?.ar
                    }
                  />
                </Col>
                <Col xs={12}>
                 {( post.services_available && post.services_available.en )&&
                 (<Col lg={4} xs={5} className="fw-bold fs-5">
                    {t('ServiceAvailable')}
                  </Col>)
                  }
                  <Col xs={12}>
                    {post.services_available?
                    i18n.language === "en"
                      ? post.services_available.en
                      : post.services_available.ar:''}
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
