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
import { ThreeDotsVertical, Eye ,Newspaper } from "react-bootstrap-icons";
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
import { LightGreenButton } from "../tools/buttons/light-green-button";
import ShareBox from "../tools/share-box";
import axios from "../tools/apis/axios";
let test =9999
export const PostCard = ({
  title = { en: "", ar: "" },
  area = { en: "", ar: "" },
  currency = { en: "", ar: "" },
  images = [{ path: "", file_name: { en: "", ar: "" } }],
  price,
  role = { en: "", ar: "" },
  username,
  main_property_type,
  number_of_bathrooms,
  number_of_rooms,
  offer_type = { en: "", ar: "" },
  price_type = { en: "", ar: "" },
  profile_picture,
  property_site,
  imgs_gallery_height,
  property_type = { en: "", ar: "" },
  tags = [{ name: { en: "", ar: "" } }],
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
  shares,
  views,
  category,
  role_id,
  post_card_square
  
  
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
  const [openShare, setOpenShare] = useState(false);
  const [postShares, setPostShares] = useState(0);
  const navigateToDetails = (id: number) => {
    navigate(`/postdetails/${page}/${id}`);
  };
  const navigateToUpdatePost = (post_id: number) => {
    navigate(`/updatepost/${page}/${post_id}`);
  };
  const navigateProfile = () => {
    if (authenticated) {
      if (for_profile) return;
      else {
        navigate(`/publicprofile/${page}/${user_id}`);
      }
    } else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: "info",
        message:
          i18n.language === "en"
            ? "You have to login first !"
            : "عليك تسجيل الدخول أولا !",
      }));
    }
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
        message:
          i18n.language === "en"
            ? "You have to login first !"
            : "عليك تسجيل الدخول أولا !",
      }));
    }
  };
  useEffect(() => {
    if (likeError) {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: false,
        message:
          i18n.language === "en"
            ? "Something wrong has happend !"
            : "حدث خطأ ما",
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
          message:
            i18n.language === "en"
              ? "Post has been removed successfully"
              : "تم حذف البوسا بنجاح",
        }));
        let newPosts = storedPosts.filter((ele) => ele.id !== id);
        setStoredPosts(newPosts);
        setOpenDialog(false);
      }
    } else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: false,
        message:
          i18n.language === "en"
            ? "Something wrong has happend !"
            : "حدث خطأ ما",
      }));
    }
  }, [isDeletePostLoading]);
  useEffect(() => {
    if (shares && shares > 0) {
      setPostShares(shares);
    }
  }, [shares]);

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
                          small_size
                            ? {
                                width: "45px",
                                height: "45px",
                                cursor: "pointer",
                              }
                            : { cursor: "pointer" }
                        }
                        onClick={() =>
                          !for_profile
                            ? owner
                              ? navigate("/profile")
                              : navigateProfile()
                            : {}
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
                          {role_id !==7 &&
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
                                {
                                i18n.language === "en" ? area.en : area.ar
                                }
                              </span>
                            </div>
                          }
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
                            {t("Edit")}
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => deleteSpecificPost(id)}>
                            {t("Delete")}
                          </Dropdown.Item>
                        </>
                      )}

                      <Dropdown.Item>{t("Report")}</Dropdown.Item>
                      <Dropdown.Item>{t("Hide")}</Dropdown.Item>
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
                        :  category?
                        i18n.language === "en"
                       ? category.en
                       : category.ar
                     : ""}
                        
                     
                    </span>
                    {role_id !==7?
                      <img src={building} className="icon" />:
                      <Newspaper className="icon" />

                      }
                  </div>
                </Col>
                {(offer_type && offer_type.en)&&
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
                }
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="gy-1 flex-fill flex-column ">
            <Col xs={12} className="p-0 p-sm-1">
              <ImagesGallery
                images={images as any[]}
                price={price}
                currency={currency}
                height={imgs_gallery_height}
                price_type={price_type}
                post_card_square={post_card_square}
              />
            </Col>
            <Col xs={12}>
              <Row className="justify-content-between">
                <Col xs={6}>
                  {tags && tags.length > 0 && (
                    <Row className="gy-1">
                      {tags && tags?.length > 0 && tags[0].name.en
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
                  )}
                </Col>
                {!for_profile && (
                  <Col xs={6}>
                    <Row>
                      <Col
                        xs={4}
                        className="iconBtn likeButton "
                        onClick={() => handleLike(id)}
                      >
                        <span className="d-flex align-items-center">
                          {postLikes? postLikes.toLocaleString().length<4 ?postLikes:
                           postLikes.toLocaleString().at(0) +'K':''}
                        </span>
                        <img src={react ? heartFilled : heart} />
                      </Col>
                      <Col
                        xs={4}
                        className="iconBtn likeButton"
                        onClick={() => setOpenShare(true)}
                      >
                        <span className="d-flex align-items-center">
                          {postShares?postShares.toLocaleString().length <4?postShares:
                          postShares.toLocaleString().at(0)+'K':''}
                        </span>
                        <img src={share} />
                      </Col>
                      <Col
                        xs={4}
                        className="iconBtn likeButton"
                        style={{ cursor: "auto" }}
                      >
                        <span className="d-flex align-items-center">
                          {views?views.toLocaleString().length <4? views:views.toLocaleString().at(0)+'K':''}
                        </span>
                        <Eye size={24} />
                      </Col>
                    </Row>
                  </Col>
                )}
              </Row>
            </Col>
            <Col xs={12}>
              <div className="title">
                {i18n.language === "en" ? title.en : title.ar}
              </div>
            </Col>
            <Col xs={12} className="details">
              <Row
                className="gy-3 justify-content-between justify-content-sm-start flex-fill "
                style={{ alignItems: "flex-end" }}
              >
                {/* <Col lg={3} md={5} xs={5} className="detail">
                  <img
                    src={direction}
                    style={
                      small_size ? { width: "17.4px", height: "17.4px" } : {}
                    }
                  />
                  <span style={small_size ? { fontSize: "12px" } : {}}>
                    North West
                  </span>
                </Col> */}
                {Boolean(number_of_rooms) && number_of_rooms !== 0 && (
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
                {Boolean(number_of_bathrooms) && number_of_bathrooms !== 0 && (
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
                {space && (
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
                )}
                <Col xs={12} className="">
                  <Row className="justify-content-center m-auto">
                    <Col xs={6} sm={5}>
                      <LightGreenButton
                        label={t("MoreDetails")}
                        fun={() => navigateToDetails(id)}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <DialogBox
        show={openDialog}
        setShow={setOpenDialog}
        message={
          i18n.language === "en"
            ? "you are sure you want to delete this post !!"
            : "!!انت على وشك حذف المنشور "
        }
        title={i18n.language === "en" ? "Delete Post" : "حذف البوست"}
        doit={() => doDeletePost(postID)}
        loading={isDeletePostLoading}
      />
      <ShareBox
        open={openShare}
        setOpen={() => setOpenShare(false)}
        url={`https://www.instaaqar.com/postdetails/${page}/${id}`}
        postId={id}
        postShares={postShares}
        setPostShares={setPostShares}
      />
    </Col>
  );
};
