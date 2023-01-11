import "./post-details.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ScrollableSection } from "./scrollable-section";
import image1 from "../../images/home/image1.png";
import image2 from "../../images/home/image2.png";
import image3 from "../../images/home/image3.png";
import image4 from "../../images/home/image4.png";
import { FixedSection } from "./fixed-section";
import { useState, useEffect, useContext, useRef } from "react";
import { MobileView } from "./mobile-view";
import { useRecoilState } from "recoil";
import { Posts } from "../store";
import { useLocation, useParams } from "react-router-dom";
import { iPost } from "../tools/interface";
import { useLikePost } from "../tools/apis/uselikePost";
import { useGetPosts } from "../tools/apis/useGetPosts";
import { getLocalStorage } from "../tools/getLocalstorage";
import {useNavigate} from 'react-router-dom'
import notificationContext from "../tools/context/notification/notification-context";
import SettingContext from "../tools/context/setting-context/setting-context";
import ShareBox from "../tools/share-box";
import { useTranslation } from "react-i18next";
import { useIncreaseViews } from "../tools/apis/useIncreaseViews";
export interface iProps {
  images: string[];
  description: string;
  handleReact: Function;
  react: boolean;
  post: any;
  authenticated?: boolean;
  postLikes: number;
  handleChat:Function,
  mobileView:boolean,
  setOpenbox:Function,
  navigateProfile:Function,
  views:number,
  shares:number
}
let images = [image1, image2, image3, image4];

let description = `
        Quis irure tempor consectetur duis Lorem esse pariatur magna 
        nulla. Nostrud quis eu ipsum in voluptate id dolor mollit. 
        Esse nostrud nisi aute Lorem tempor do deserunt est dolore et.
        Quis irure tempor consectetur duis Lorem esse pariatur magna 
        nulla. Nostrud quis eu ipsum in voluptate id dolor mollit. 
        Esse nostrud nisi aute Lorem tempor do deserunt est dolore et.
        Quis irure tempor consectetur duis Lorem esse pariatur magna 
        nulla. Nostrud quis eu ipsum in voluptate id dolor mollit. 
        Esse nostrud nisi aute Lorem tempor do deserunt est dolore et.
        Quis irure tempor consectetur duis Lorem esse pariatur magna 
        nulla. Nostrud quis eu ipsum in voluptate id dolor mollit. 
        Esse nostrud nisi aute Lorem tempor do deserunt est dolore et.

`;

const PostDetails = () => {
  const { page, post_id } = useParams();
  const { setNotify } = useContext(notificationContext);
  const [react, setReact] = useState(false);
  const [storedPosts,setStoredPosts] = useRecoilState(Posts);
  const [openSharebox,setOpenSharebox]=useState(false)
  const navigate =useNavigate()
  let location =useLocation()
  const {i18n,t}=useTranslation()
  const { likeData, likeError, isLikeLoading, setLike, setUnLike } =
  useLikePost();
  const {setView,isViewsLoading,viewsData,viewsError}=useIncreaseViews()
  const [authenticated, setAuthenticated] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  let  currentpostViews=useRef(0).current
let currentpostShares=useRef(0).current
 const [postViews,setPostViews]=useState(0)
 const [postShares,setPostShares]=useState(0)

  const previouseLikesNumber = useRef(0);
  const {mobileView} =useContext(SettingContext)
  const { getPosts, getPostsData, getPostsError, isGetPostsLoading } =
    useGetPosts();

  const [post, setPost] = useState<iPost>({
    images: [{ path: "", file_name: { en: "", ar: "" } }],
    area: { en: "", ar: "" },
    currency: { en: "", ar: "" },
    id: -1,
    likes: 0,
    price: "",
    role: { en: "", ar: "" },
    title: { en: "", ar: "" },
    username: "",
    liked: false,
    number_of_bathrooms: 0,
    number_of_rooms: 0,
    profile_picture: "",
    updated_at: { en: "", ar: "" },
    services_available: { en: "", ar: "" },
    description: { en: "", ar: "" },
    user_id: -1,
    views:-1
  });
  const handelReact = (id: number) => {
    if (authenticated) {
      if (!react) {
        setLike(id);
        setPostLikes(postLikes + 1);
        setReact(true);
      } else {
        setUnLike(id);
        setPostLikes(postLikes - 1);
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
    if (getLocalStorage()) {
      let user = getLocalStorage();
      if (user.role) setAuthenticated(true);
    }
    if (post_id) {
      let specificPost = storedPosts.filter(
        (ele: any) => ele.id === parseInt(post_id)
      )[0];
      if (!specificPost) return;

      setPostLikes(specificPost.likes);
      setPost(specificPost);
     

    }
    return ()=>{
    
    }
  }, []);

  useEffect(() => {
    if (post_id && page) {
      getPosts({ page: parseInt(page), post_id: parseInt(post_id) });
      
    }
  }, [post_id, page]);

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
    if (!getPostsError && getPostsData && getPostsData.data.length > 0) {
      let data = getPostsData.data
        .map((ele: any, index: number) => {
          let data = ele.images;
          currentpostViews= ele.views;
          let news_type=false
          if (ele.tags_ids && ele.tags_ids.length>0) {
            ele.tags_ids.map((ele:any)=>{
              if (ele.id === 3) {
                news_type=true
              }
            })
          }
          if (ele.images && ele.images.length > 0) {
            data = ele.images.map((elem: any) => {
              //  let arr= elem.path.split('/').slice(3)

              // let img ='https://backend.instaaqar.com/'+arr.join('/')
              // return img
              return elem.path;
            });
          }
          // if (ele.updated_at) {
          //   const options = {
          //     year: "numeric",
          //     month: "short",
          //     day: "numeric",
          //   } as const;
          //   updated_at = {
          //     en: new Date(ele.updated_at).toLocaleDateString("en-US", options),
          //     ar: new Date(ele.updated_at).toLocaleDateString("ar-EG", options),
          //   };
          // }
         

          return {
            id: ele.id,
            title: ele.title,
            username: ele.username,
            area: ele.area.name,
            role: ele.role[0].name,
            offer_type: ele.offer_type ? ele.offer_type.name : null,
            main_property_type: ele.main_property_type
              ? ele.main_property_type.name
              : null,
            price_type: ele.price_type ? ele.price_type.name : null,
            number_of_rooms: ele.number_of_rooms,
            number_of_bathrooms: ele.number_of_bathrooms,
            images: data,
            profile_picture: ele.profile_picture,
            property_site: ele.property_site ? ele.property_site.name : null,
            property_type: ele.property_type ? ele.property_type.name : null,
            tags: ele.tags_ids && ele.tags_ids.length > 0 ? ele.tags_ids : null,
            currency: ele.area.country.currency,
            likes: ele.likes,
            liked: ele.liked,
            PACIID: ele.PACIID,
            services_available: ele.services_available,
            updated_at:ele.created_at,
            phone_numbers: ele.phone_numbers,
            category: ele.category ? ele.category.name : null,
            price: ele.price,
            description: ele.description,
            user_id: ele.user_id,
            descriptive_address:ele.descriptive_address?ele.descriptive_address:null,
            space:ele.space,
            shares:ele.shares,
            views:ele.views,
            news_type
          };
        })
        .filter((ele: any) => ele)[0];
      setPost((pre: any) => ({ ...pre, ...data }));
    }
  }, [isGetPostsLoading]);
  useEffect(() => {
    if (post) {
      previouseLikesNumber.current = post.likes;
     
      setReact(post.liked as boolean);
      setPostLikes(post.likes);
      if (getLocalStorage() && getLocalStorage().id && post.user_id !== getLocalStorage().id) {
        if (post_id ){
          setView(parseInt(post_id))
         
        }
      }
      else {

        if (post.views && post.views >0 && postViews !== currentpostViews) {
 
         setPostViews(post.views)
       }
      }
      
     
    }
  }, [post]);
  useEffect(()=>{
    if(Boolean(viewsError)) {
     if (post.views && post.views > -1) {
      
       let pre= post.views
      
       setPostViews(pre)
     }
    }
    else {
      if ( post_id) {
        if (post.views && post.views >-1) {

          let pre= post.views
         
          setPostViews(pre + 1)
        }
        
      }
    }
  },[isViewsLoading])
useEffect(()=>{
  if (post_id && postViews !== currentpostViews){

    let pre= postViews
          let newStoredPosts=[...storedPosts].map(ele=> {
            if (ele.id === parseInt(post_id) ) {
              let newobj= {...ele}
              newobj.views= pre
            
              return newobj
            }
            return ele
          })
          setStoredPosts(pre=> (newStoredPosts))
  }
},[postViews])
  const handleChat=()=>{
    if (getLocalStorage() && getLocalStorage().id && getLocalStorage().id !== 'Guest'){
  
      if (post.user_id ) {
      
        navigate('/messages',{state:{action:'create-chat',body:{user_1:getLocalStorage().id,user_2:post.user_id}}})
      }
    }
    else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: "info",
        message: i18n.language==='en'? "You have to login first !":"يجب تسجيل الدخول أولا",
      }));
    }
   }
   const navigateProfile =()=>{
    if (getLocalStorage() && getLocalStorage().id && getLocalStorage().id !== 'Guest'){
  
      if (post.user_id ) {
      if (getLocalStorage().id === post.user_id) {
        navigate('/profile')
      }
      else {

        navigate(`/publicprofile/1/${post.user_id}`)
      }
      }
    }
    else {
      setNotify((pre: any) => ({
        ...pre,
        show: true,
        type: "info",
        message: i18n.language==='en'? "You have to login first !":"يجب تسجيل الدخول أولا",
      }));
    }
   }


  return (
    <Col xs={12} className="postDetailsContainer">
      {
        !mobileView?
     
      <Col xs={0} lg={12} className="p-0">
        <Row className="justify-content-evenly d-none d-sm-flex">
          <Col xs={12} className="d-flex  scrollableContainer">
            <ScrollableSection
              images={images}
              description={description}
              react={react}
              handleReact={handelReact}
              post={post}
              authenticated={authenticated}
              postLikes={postLikes}
              handleChat={handleChat}
              mobileView={mobileView}
              setOpenbox={setOpenSharebox}
              navigateProfile={navigateProfile}
              views={postViews}
              shares={postShares}
            />
          </Col>
          <FixedSection post={post} mobileView={mobileView} />
        </Row>
      </Col>:
      <Col xs={12} className="d-block d-sm-none">
        <MobileView
          images={images}
          description={description}
          react={react}
          handleReact={handelReact}
          post={post}
          authenticated={authenticated}
          postLikes={postLikes}
          handleChat={handleChat}
          navigateProfile={navigateProfile}
          mobileView={mobileView}
          setOpenbox={setOpenSharebox}
          views={postViews}
          shares={postShares}
        />
      </Col>
}
      <ShareBox 
      open={openSharebox}
      setOpen={()=>setOpenSharebox(false)}
      url={`https://www.instaaqar.com/${location.pathname}`}
      postId={post_id?parseInt(post_id):0}
      setPostShares={setPostShares}
      postShares={postShares}

      />

    
    </Col>
  );
};
export default PostDetails;
