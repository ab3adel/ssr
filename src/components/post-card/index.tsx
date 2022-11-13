import "./post-card.scss";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import valid from "../../images/home/valid-account-icon.svg";
import location from "../../images/home/location-icon.svg";
import profile from "../../images/home/icon-profile.svg";
import building from "../../images/home/building-icon.svg";
import { DialogBox } from "../tools/dialogbox/dialogbox";
import share from "../../images/home/share-icon.svg";
import heartFilled from "../../images/home/heart-icon.svg";
import heart from "../../images/home/heart-filled-icon.svg";
import direction from "../../images/home/direction-icon.svg";
import Area from "../../images/home/area-icon.svg";
import amenities from "../../images/home/amenities-icon.svg";
import room from "../../images/home/room-icon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { useLikePost } from "../tools/apis/uselikePost";
import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ImagesGallery } from "../tools/imgs-gallery/imgs-gallery";
import { useNavigate } from "react-router-dom";
import { iPost } from "../tools/interface";
import notificationContext from "../tools/context/notification/notification-context";
import { useDeletePost } from "../tools/apis/useDeletePost";
import { useRecoilState } from "recoil";
import { Posts } from "../store";
export const PostCard = ({
  title = { en: "", ar: "" },
  area = { en: "", ar: "" },
  currency = { en: "", ar: "" },
  images=[{path:'',file_name:{en:'',ar:''}}],
  price,
  role={en:'',ar:''},
  username,
  main_property_type,
  number_of_bathrooms,
  number_of_rooms,
  offer_type={en:'',ar:''},
  price_type={en:'',ar:''},
  profile_picture,
  property_site,
  imgs_gallery_height,
  property_type={en:'',ar:''},
  tags=[{name:{en:'',ar:''}}],
  id,
  likes,
  testImages,
  small_size,
  for_profile = false,
  liked,
  authenticated,
  user_id,
  owner,
  page = 1,
  space,
}: iPost) => {
  const { setNotify } = useContext(notificationContext);
  const [react, setReact] = useState(liked);
  const { i18n, t } = useTranslation();
  const [Imgs, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const [postLikes, setPostLikes] = useState(likes);
  const { setLike, setUnLike, likeData, isLikeLoading, likeError } =
    useLikePost();
  const previouseLikesNumber = useRef(likes);
  const [openDialog, setOpenDialog] = useState(false);
  const { deletePost, deletePostData, deletePostError, isDeletePostLoading } =
    useDeletePost();
  const [postID, setPostID] = useState(-1);
  const [storedPosts, setStoredPosts] = useRecoilState(Posts);
  const navigateToDetails = (id: number) => {
    navigate(`postdetails/${page}/${id}`);
  };
  const navigateToUpdatePost = (post_id: number) => {
    navigate(`updatepost/${page}/${post_id}`);
  };
  const deleteSpecificPost = (id: number) => {
    setOpenDialog(true);
    setPostID(id);
  };
  const doDeletePost = (post_id: number) => {
    deletePost(post_id);
  };

  const handleLike = async (id: number) => {
    if (authenticated) {
      let theLikes = postLikes;
      previouseLikesNumber.current = theLikes;
      if (!react) {
        setLike(id);
        setPostLikes(theLikes + 1);
        setReact(true);
      } else {
        setUnLike(id);
        setPostLikes(theLikes - 1);
        setReact(false);
      }
    } else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: "info",
        message: "You have to login first !",
      }));
    }
  };
  useEffect(() => {
    if (likeError) {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: false,
        message: "Something wrong has happend !!",
      }));
      setReact(!react);
      setPostLikes(previouseLikesNumber.current);
    }
  }, [likeError]);
  useEffect(() => {
    if (!deletePostError) {
      if (deletePostData) {
        setNotify((pre: any) => ({
          ...pre,
          show: true,
          type: true,
          message: "Post has been removed successfully",
        }));
        let newPosts = [...storedPosts].filter((ele) => ele.id !== postID);
        setStoredPosts(newPosts);
      }
    } else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: false,
        message: "Something wrong has happend !",
      }));
    }
  }, [isDeletePostLoading]);
 
  return (
    <Col xs={12} sm={12} className="postCardContainer">
      <Card>
        <Card.Header>
          <Row className="gy-1">
            <Col xs={12}>
              <Row className="justify-content-between">
                <Col xs={10} lg={8}>
                  <Row>
                    <Col xs={3}>
                      <img
                        src={profile_picture ? profile_picture : profile}
                        className="profile"
                        style={
                          small_size ? { width: "45px", height: "45px" } : {}
                        }
                      />
                    </Col>
                    <Col xs={9}>
                      <Row className="gy-1  py-1">
                        <Col xs={12}>
                          <div className="userName">
                            <span
                              style={small_size ? { fontSize: "14px" } : {}}
                              className="px-1"
                            >
                              {username}
                            </span>
                            <img
                              className="icon"
                              src={valid}
                              style={
                                small_size
                                  ? { width: "12.5px", height: "12.5px" }
                                  : {}
                              }
                            />
                          </div>
                        </Col>
                        <Col xs={12}>
                          <div className="location">
                            <img
                              className="icon"
                              src={location}
                              style={
                                small_size
                                  ? { width: "12.5px", height: "12.5px" }
                                  : {}
                              }
                            />
                            <span>
                              {i18n.language === "en" ? area.en : area.ar}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2} className="options">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <ThreeDotsVertical className="icon" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {owner && (
                        <>
                          <Dropdown.Item
                            onClick={() => navigateToUpdatePost(id)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => deleteSpecificPost(id)}>
                            Delete
                          </Dropdown.Item>
                        </>
                      )}
                      <Dropdown.Item onClick={() => navigateToDetails(id)}>
                        Details
                      </Dropdown.Item>
                      <Dropdown.Item>Report</Dropdown.Item>
                      <Dropdown.Item>Hide</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Row className="gy-md-1 gy-lg-0 gy-1">
                <Col xs={6} lg={4}>
                  <div
                    className="tag grey "
                    style={small_size ? { fontSize: "12px" } : {}}
                  >
                    {i18n.language === "en" ? role.en : role.ar}
                  </div>
                </Col>
                <Col xs={6} lg={4}>
                  <div
                    className="tag grey "
                    style={small_size ? { fontSize: "12px" } : {}}
                  >
                    <span>
                      {property_type
                        ? i18n.language === "en"
                          ? property_type.en
                          : property_type.ar
                        : ""}
                    </span>
                    <img src={building} className="icon" />
                  </div>
                </Col>
                <Col xs={6} lg={4}>
                  <div
                    className="tag green"
                    style={small_size ? { fontSize: "12px" } : {}}
                  >
                    {offer_type
                      ? i18n.language === "en"
                        ? offer_type.en
                        : offer_type.ar
                      : ""}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="gy-1">
            <Col xs={12} className="p-0 p-sm-1">
              <ImagesGallery
                images={images as any[]}
                price={price}
                currency={currency}
                height={imgs_gallery_height}
                price_type={price_type}
              />
            </Col>
            <Col xs={12}>
              <Row className="justify-content-between">
                <Col xs={8}>
                  <Row className="gy-1">
                    {tags && tags?.length > 0
                      ? tags?.map((ele, index) => (
                          <Col sm={4} xs={6} key={index}>
                            <div
                              className="badge "
                              style={small_size ? { fontSize: "10px" } : {}}
                            >
                              <span className="p-1">
                                {ele.name
                                  ? i18n.language === "en"
                                    ? ele.name.en
                                    : ele.name.ar
                                  : ""}
                              </span>
                            </div>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Col>
                <Col xs={4}>
                  {!for_profile && (
                    <Row>
                      <Col
                        xs={7}
                        className="iconBtn likeButton "
                        onClick={() => handleLike(id)}
                      >
                        <span className="d-flex align-items-center">
                          {postLikes}
                        </span>
                        <img src={react ? heartFilled : heart} />
                      </Col>
                      <Col xs={5} className="iconBtn">
                        <img src={share} />
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <div className="title">
                {i18n.language === "en" ? title.en : title.ar}
              </div>
            </Col>
            <Col xs={12} className="details">
              <Row className="gy-1 justify-content-between justify-content-sm-start">
                <Col lg={3} md={5} xs={5} className="detail">
                  <img
                    src={direction}
                    style={
                      small_size ? { width: "17.4px", height: "17.4px" } : {}
                    }
                  />
                  <span style={small_size ? { fontSize: "12px" } : {}}>
                    North West
                  </span>
                </Col>
                {number_of_rooms && (
                  <Col lg={3} md={5} xs={5} className="detail">
                    <img
                      src={room}
                      style={
                        small_size ? { width: "17.4px", height: "17.4px" } : {}
                      }
                    />
                    <span style={small_size ? { fontSize: "12px" } : {}}>
                      {number_of_rooms}
                    </span>
                  </Col>
                )}
                {number_of_bathrooms && (
                  <Col lg={3} md={5} xs={5} className="detail">
                    <img
                      src={amenities}
                      style={
                        small_size ? { width: "17.4px", height: "17.4px" } : {}
                      }
                    />
                    <span style={small_size ? { fontSize: "12px" } : {}}>
                      {number_of_bathrooms}
                    </span>
                  </Col>
                )}
                {
                  <Col lg={3} md={5} xs={5} className="detail">
                    <img
                      src={Area}
                      style={
                        small_size ? { width: "17.4px", height: "17.4px" } : {}
                      }
                    />
                    {space ? (
                      <span style={small_size ? { fontSize: "12px" } : {}}>
                        {space} m<sup>2</sup>{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </Col>
                }
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <DialogBox
        show={openDialog}
        setShow={setOpenDialog}
        message={"you are sure you want to delete this post !!"}
        title={"Delete Post"}
        doit={() => doDeletePost(postID)}
      />
    </Col>
  );
};
