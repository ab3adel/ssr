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
interface iProps {
  images: string[];
  description: string;
  handleReact: Function;
  react: boolean;
}
export const ScrollableSection = ({
  images,
  description,
  handleReact,
  react,
}: iProps) => {
  return (
    <Col xs={6} className="scrollableSection">
      <Card>
        <Card.Header>
          <Row className="gy-1">
            <Col xs={12}>
              <Row className="justify-content-between ">
                <Col xs={10} sm={5}>
                  <Row className="gy-3">
                    <Col xs={4}>
                      <img src={profile} className="profile" />
                    </Col>
                    <Col xs={8} className="d-flex  align-items-center">
                      <div className="userName">
                        <span>Jane Done</span>
                        <img className="icon" src={valid} />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="category">Post Category</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="gy-3">
            <Col xs={12}>
              <ImagesGallery images={images} />
            </Col>

            <Col xs={12}>
              <Row>
                <Col xs={8}>
                  <Row className="gy-1">
                    <Col  xs={4}>
                      <div className="badge">Low price</div>
                    </Col>
                    <Col  xs={4}>
                      <div className="badge">Special offer</div>
                    </Col>
                    <Col  xs={4}>
                      <div className="badge">Best seller</div>
                    </Col>
                  </Row>
                </Col>
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
              </Row>
            </Col>
            <Col xs={12}>
              <Col xs={6}>
                KWD <span className="fw-bold">6999</span> Monthly
              </Col>
              <Col xs={6} className="fw-bold fs-5">
                White Space House
              </Col>
            </Col>
            <Col xs={12}>
              <Row className="mt-1 gy-3">
                <Col xs={12}>
                  <Row className="gy-2">
                    <Col
                      xs={3}
                      className="d-flex justify-content-evenly align-items-center"
                    >
                      <img className="locationIcon" src={location} />
                      <span>Kwait City</span>
                    </Col>
                    <Col xs={4}>
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
                      <span>2</span>
                      <span>rooms</span>
                    </Col>
                    <Col sm={3} xs={4} className="detail">
                      <img src={amenities} />
                      <span>1</span>
                      <span>bath</span>
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
                  <TextAccordion description={description} />
                </Col>
                <Col xs={12}>
                  <Col xs={4} className="fw-bold fs-5">
                    Service Available
                  </Col>
                  <Col xs={12}>
                    Veniam occaecat in voluptate eiusmod Lorem commodo irure
                    fugiat adipisicing. Ipsum magna fugiat nisi aliquip mollit
                    reprehenderit sit voluptate quis culpa qui elit. Sunt quis
                    officia eiusmod excepteur laboris culpa. Laborum non dolor
                    in quis deserunt excepteur dolor esse exercitation nulla
                    magna aliquip anim. Ullamco culpa nulla ex incididunt esse
                    labore velit eu Lorem aliquip nisi commodo aliqua. Ut qui
                    veniam fugiat labore ad eu.
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
