import valid from "../../images/home/valid-account-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import heartFilled from "../../images/home/heart-icon.svg";
import heart from "../../images/home/heart-filled-icon.svg";
import share from "../../images/home/share-icon.svg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import location from "../../images/post-details/location.svg";
import map from "../../images/post-details/map.svg";
import Button from "react-bootstrap/Button";
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
interface iProps {
  images: string[];
  description: string;
  handleReact: Function;
  react: boolean;
  post: any;
  authenticated?: boolean;
  postLikes: number;
}

export const MobileView = ({
  images,
  description,
  handleReact,
  react,
  post,
}: iProps) => {
  const { openSidebar } = useContext(SettingContext);
  const { i18n } = useTranslation();
  return (
    <Col xs={12} className="scrollableSection">
      <Card>
        <Card.Header>
          <Row className="gy-1">
            <Col xs={12}>
              <Row className="justify-content-between ">
                <Col xs={12}>
                  <Row className="gy-3">
                    <Col xs={4}>
                      <img
                        src={
                          post.profile_picture
                            ? post.pprofile_picture.path
                            : profile
                        }
                        className="profile"
                      />
                    </Col>
                    <Col xs={8} className="d-flex  align-items-center">
                      <div className="userName">
                        <span>{post.username}</span>
                        <img className="icon" src={valid} />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="category">
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
            <Col xs={12} className="p-0 p-sm-1">
              <ImagesGallery images={post.images} />
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={4}>
                  <Row>
                    <Col
                      xs={6}
                      className="iconBtn "
                      onClick={() => handleReact()}
                    >
                      <img src={react ? heartFilled : heart} />
                    </Col>
                    <Col xs={6} className="iconBtn">
                      <img src={share} />
                    </Col>
                  </Row>
                </Col>
                <Col xs={8}>
                  <Col xs={12} className="fw-bold ">
                    {i18n.language === "en" ? post.title.en : post.title.ar}
                  </Col>
                  <Col xs={12}>
                    <div>
                      {i18n.language === "en"
                        ? post.currency.en
                        : post.currency.ar}{" "}
                      <span className="fw-bold">{post.price}</span>{" "}
                      {post.price_type
                        ? i18n.language === "en"
                          ? post.price_type.en
                          : post.price_type.ar
                        : ""}
                    </div>
                  </Col>
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
                                ? ele.name.en
                                : ele.name.ar}
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
              <FixedSection post={post} />
            </Col>
            <Col xs={12}>
              <Row className="mt-1 gy-3">
                <Col xs={12}>
                  <Row className="gy-2">
                    <Col
                      sm={3}
                      xs={5}
                      className="d-flex justify-content-evenly align-items-center"
                    >
                      <img className="locationIcon" src={location} />
                      <span className="mx-1">
                        {i18n.language === "en" ? post.area.en : post.area.ar}
                      </span>
                    </Col>
                    <Col sm={4} xs={7}>
                      <Button className="mapBtn">
                        <img src={map} />
                        <span>Go To Map</span>
                      </Button>
                    </Col>
                    <Col xs={12}>
                      Est reprehenderit id elit Lorem dolore adipisicing
                      occaecat. Commodo do proident eiusmod sit do anim. Culpa
                      laborum id nulla laborum labore qui esse laboris commodo.
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <Row>
                    <Col sm={3} xs={4} className="detail">
                      <img src={room} />
                      {post.number_of_rooms && (
                        <>
                          <span>{post.number_of_rooms}</span>
                          <span>rooms</span>
                        </>
                      )}
                    </Col>
                    <Col sm={3} xs={4} className="detail">
                      <img src={amenities} />
                      {post.number_of_bathrooms && (
                        <>
                          <span>{post.number_of_bathrooms}</span>
                          <span>bath</span>
                        </>
                      )}
                    </Col>
                    <Col sm={3} xs={4} className="detail">
                      <img src={area} />
                      <span>
                        200 m<sup>2</sup>{" "}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={12}>
                  <TextAccordion
                    description={
                      i18n.language === "en"
                        ? post.description.en
                        : post.description.ar
                    }
                  />
                </Col>
                <Col xs={12}>
                  <Col sm={4} xs={12} className="fw-bold fs-5">
                    Service Available
                  </Col>
                  <Col xs={12}>
                    {i18n.language === "en"
                      ? post.services_available.en
                      : post.services_available.ar}
                  </Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Col
        xs={12}
        className={
          openSidebar ? "d-none" : "fixed-bottom d-flex justify-content-center"
        }
      >
        <Col xs={10} className="chatBtn  ">
          <img src={chat} />
          <span>Chat</span>
        </Col>
      </Col>
    </Col>
  );
};
