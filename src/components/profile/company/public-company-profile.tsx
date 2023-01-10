import { iProps } from "../myprofile";
import { Container, Row, Col } from "react-bootstrap";
import { Tab } from "../../tools/tab";
import { UserInfo } from "../views/user";
import { SocialMedia } from "../views/social-media";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { useEffect, useRef, useState } from "react";
import { Posts } from "../views/posts";
import { Data } from "../views/data";
import { GreenButton } from "../../tools/buttons/green-button";
import { WhiteButton } from "../../tools/buttons/white-button";
import { FollowersFollowing } from "../views/followers-following";
import {PublicProfileProps} from '../public-profile'
import SettingContext from "../../tools/context/setting-context/setting-context";
import {useContext} from 'react'
import {useGetPosts} from '../../tools/apis/useGetPosts'
import {useFollowUnFollow} from '../../tools/apis/useFollowCompany'
import {useGetFollowingFollowers} from '../../tools/apis/useGetFollowersFollowings'
import notificationContext from "../../tools/context/notification/notification-context";

export const CompanyPublicProfile = ({t,lang,data}:PublicProfileProps) => {
  let company = true;
  let [isFollowed,setIsFollowed]=useState( data?.followed)
  const previousFollowState=useRef<boolean>(false)
  const immediateFollowers=useRef<any[]>([])
  const [tempFollowers,setTempFollowers]=useState<any[]>([])
  const {mobileView} =useContext(SettingContext)
  const {setNotify} =useContext(notificationContext)

  let [tabIndex, setTabIndex] = useState(0);
  let [posts,setPosts]=useState([])
  let [folloings,setFollowings]=useState<any>()
  let {getPosts,getPostsData,getPostsError,isGetPostsLoading} =useGetPosts()
  const {setFollow,setUnFollow,followData,followError,isFollowLoading} =useFollowUnFollow()
  const {
    getFollowers,
    getFollowings,
    isFollowersLoading,
    isFollowingLoading,
    followersData,
    followingData,
    followersError,
    followingError

  }=useGetFollowingFollowers()

  const formik = useFormik({
    initialValues: {
      twitter: data?.company?.twitter ? data.company.twitter : "myTwitter.com",
      facebook: data?.company?.facebook
        ? data.company.facebook
        : "myFacebook.com",
      youtube: data?.company?.youtueb ? data.company.youtube : "myYoutube.com",
      snapchat: data?.company?.snapchat
        ? data.company.snapchat
        : "mySnapchat.com",
      tiktok: data?.company?.tiktok ? data.company.tiktok : "myTiktok.com",
      instagram: data?.comapny?.instagram
        ? data.company.instagram
        : "myInstagram.com",
      description: data?.company?.description
        ? data?.company?.description
        : { en: "", ar: "" },
      country: data?.area?.country?data.area.country: {name:{en:'',ar:''},id:0},
      area: data?.area ? data.area : { name: { en: "", ar: "" }, id: 0 },
      flat: data?.flat ? data.flat : "",
      floor: data?.floor ? data?.floor : "",
      block: data?.block ? data.block : "",
      email: data.email ? data.email : "",
      pre_existed_phone_numbers: data.phone_numbers ? data.phone_numbers : [],
      avenue: data?.avenue ? data.avenue : "",
      street: data?.street ? data.street : "",
      website: data?.company?.website ? data.company.website : "",
      PACIID: data.PACIID ? data.PACIID : "",
      building: data.building ? data.building : "",
      role: data?.roles ? data.roles[0] : { name:{en: "", ar: ""} ,id: 0 },
      pre_defined_images: [],
      files: data?.comapny?.files ? data.company.files : [],
      category:data?.company?.categories?data.company.categories: [{ name:{en: "", ar: ""} ,id: 0 }]
    },
    onSubmit: () => {},
    enableReinitialize: true,
  });
  useEffect(()=>{
    getFollowers()
    getFollowings()
  },[isFollowed])
  useEffect(()=>{
    if (data) {
      let {id,company}=data
      if (id) {
        getPosts({user_id:data.id})
      }
      setIsFollowed(data.followed)
      setTempFollowers(data?.followers)
      
      immediateFollowers.current=data?.followers
      previousFollowState.current=data?.followed
      
    }

  },[data])
  useEffect(()=>{
    if(!getPostsError) {
      if (getPostsData && getPostsData.data && getPostsData.data.length>0) {
      
        let returnedPosts =getPostsData.data.map((ele:any)=>{
        let   updated_at=null
        let handled_images:string[]=[]
          if (ele.updated_at) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' } as const
            updated_at={
                en:new Date(ele.updated_at).toLocaleDateString('en-US',options),
                ar:new Date(ele.updated_at).toLocaleDateString('ar-EG',options)
            }
        }
        if (ele.images && ele.images.length>0) {
          handled_images=ele.images.map((ele:any)=>ele.path)
        }
  
          return (
            {
                    id:ele.id,
                    title:ele.title,
                    username:ele.username,
                    area:ele.area.name,
                    role:ele.role[0].name,
                    offer_type:ele.offer_type?ele.offer_type.name:null,
                    main_property_type:ele.main_property_type?ele.main_property_type.name:null,
                    price_type:ele.price_type?ele.price_type.name:null,
                    number_of_rooms:ele.number_of_rooms,
                    number_of_bathrooms:ele.number_of_bathrooms,
                    images:handled_images,
                    profile_picture:ele.profile_picture,
                    property_site:ele.property_site?ele.property_site.name:null,
                    property_type:ele.property_type?ele.property_type.name:null,
                    tags:ele.tags_ids && ele.tags_ids.length>0?ele.tags_ids:null,
                    currency:ele.area.country.currency,
                    likes:ele.likes,
                    liked:ele.liked,
                    PACIID:ele.PACIID,
                    services_available:ele.services_available,
                    updated_at,
                    phone_numbers:ele.phone_numbers,
                    category:ele.category?ele.category.name:null,
                    price:ele.price,
                    description:ele.description,
                    user_id:ele.user_id,
                    owner:ele.user_id === data.id,
                    space:ele.space
  
            }
            )
            
            
          })
          if (returnedPosts) setPosts(returnedPosts)
      }
    }
   },[isGetPostsLoading])
   useEffect(()=>{
    if(!followError) {
      return
    }
    else {
      setIsFollowed(previousFollowState.current)
      setTempFollowers(immediateFollowers.current )
      setNotify((pre:any)=>({...pre,type:false,message:lang==='en'?'Something wrong happend':"حدث خطا ما"}))
    }
   },[isFollowLoading])
   useEffect(()=>{
    if(!followingError) {
      setFollowings(followingData)
    }
   },[isFollowingLoading])
   const follow = ()=>{
    if (data && data.company) {
      setFollow(data.company.id)
      setIsFollowed(true)
      let newFollowers=[...tempFollowers,{id:''}]

      setTempFollowers(newFollowers)
      

    }
  }
   const unFollow = ()=>{
    if (data && data.company) {
      setUnFollow(data.company.id)
      setIsFollowed(false)
      
      let newFollowers=[...tempFollowers].slice(0,-1)

      setTempFollowers(newFollowers)
    }
   
  }

  return (
    <Container className="p-1 ">
      {!mobileView?
      <Row className="justify-content-evenly d-none d-sm-flex">
        <Col
          sm={3}
          xs={12}
          className={`fixedPart  bg-profile flex-column justify-content-between${
            company ? "" : "py-2"
          }`}
        >
          <Row className="gy-5 justify-content-center">
            <Col xs={12}>
              <Col xs={12}>
                <UserInfo company={company} edit={false} t={t} 
                full_name={data.full_name}
                profile_picture={data.profile_picture}/>
              </Col>
              <Row className="mt-2 justify-content-center d-flex gy-1 ">
                <Col sm={9} lg={6}>
                 { 
                 isFollowed?
                 <WhiteButton label={t('Unfollow')} 
                  fun={()=>unFollow()}
                 />:
                 <GreenButton label={t("Follow") }
                  fun={
                    ()=>follow()
                  }
                  />
                  }
                </Col>
                <Col xs={9}>
                  <FollowersFollowing company={true} t={t} 
                  followers={tempFollowers}
                  followings={folloings?folloings[0]:[]}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs={12}>
              <SocialMedia
                values={formik.values}
                handleChange={formik.handleChange}
                t={t}
              />
            </Col>
            <Col xs={12}></Col>
          </Row>
        </Col>
        <Col
          sm={8}
          xs={12}
          className="scrollablePart bg-profile py-sm-3 pb-5 pb-sm-3 "
        >
          <Row>
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  sm={5}
                  xs={12}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("PersonalInfo")}
                </Col>
                <Col
                  sm={5}
                  xs={12}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Posts")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <Info company={true} edit={false} 
                setFieldValue={formik.setFieldValue}
                handleBlur={formik.handleBlur}
                publicProfile={true}  t={t}
                lang={lang}
                handleChange={formik.handleChange}
                values={formik.values}
                categories={formik.values['category']}
                />
                <Posts posts={posts} />
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
      :
      <Row
        className="justify-content-evenly d-flex d-sm-none mobileViewScroll gy-3 bg-profile"
        style={{ height: "fit-content" }}
      >
        <Col sm={3} xs={12} className={`   flex-column`}>
          <Row className="gy-2">
            <Col xs={12}>
              <UserInfo company={company} edit={false} t={t} 
                 full_name={data.full_name}
                 profile_picture={data.profile_picture}/>
            </Col>

            <Col xs={12} className="mt-2 ">
              <Row className="justify-content-center gy-2">
                <Col xs={5}>
                { 
                 isFollowed?
                 <WhiteButton label={t('Unfollow')} 
                  fun={()=>unFollow()}
                 />:
                 <GreenButton label={t("Follow") }
                  fun={
                    ()=>follow()
                  }
                  />
                  }
                </Col>
                <Col xs={10}>
                  <FollowersFollowing company={true} t={t}
                   followers={tempFollowers}
                   followings={folloings?folloings[0]:[]}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={8} xs={12} className="  py-sm-3 pb-5 pb-sm-3 ">
          <Row className="gy-3">
            <Col xs={12}>
              <Row className="p-sm-2 justify-content-center">
                <Col
                  xs={6}
                  className={tabIndex === 0 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(0)}
                >
                  {t("Posts")}
                </Col>
                <Col
                  xs={6}
                  className={tabIndex === 1 ? "tab active-tab" : "tab"}
                  onClick={() => setTabIndex(1)}
                >
                  {t("Info")}
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Tab num={tabIndex}>
                <>
                  <Col xs={12}>

                  <Posts posts={posts}/>
                  </Col>
                  <Col xs={12} style={{height:'60px'}} ></Col>
                </>
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <Info
                        company={company}
                        edit={false}
                        publicProfile={true}
                        t={t}
                        setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={formik.handleChange}
                    categories={formik.values['category']}
                    values={formik.values}
                      />
                    </Col>
                    <Col xs={12} className="px-0 py-2">
                      <Row>
                        <Col
                          xs={12}
                          className="fw-bold d-flex justify-content-center"
                        >
                          {t("SocialMediaAccounts")}
                        </Col>
                        <Col xs={12} className="px-0 ">
                          <SocialMedia
                            values={formik.values}
                            handleChange={formik.handleChange}
                            t={t}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} style={{height:'60px'}} ></Col>
                  </Row>
                </Col>
              </Tab>
            </Col>
          </Row>
        </Col>
      </Row>
}
    </Container>
  );
};
