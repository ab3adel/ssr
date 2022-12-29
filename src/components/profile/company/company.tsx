import { iProps } from "../myprofile";
import { Container, Row, Col } from "react-bootstrap";
import { Tab } from "../../tools/tab";
import { UserInfo } from "../views/user";
import { SocialMedia } from "../views/social-media";
import { useFormik } from "formik";
import { Info } from "../views/info";
import { useEffect, useState } from "react";
import { Posts } from "../views/posts";
import { Data } from "../views/data";
import { GreenButton } from "../../tools/buttons/green-button";
import { FollowersFollowing } from "../views/followers-following";
import { useGetPosts } from "../../tools/apis/useGetPosts";
import SettingContext from "../../tools/context/setting-context/setting-context";
import {useContext} from 'react'
import { ChangePassword } from "../../tools/change-password/changePassword";

import { Files } from "react-bootstrap-icons";
import { useGetFollowingFollowers } from "../../tools/apis/useGetFollowersFollowings";

import { WhiteButton } from "../../tools/buttons/white-button";

export const CompanyProfile = ({ edit, setEdit, t, data ,lang,setShowDeleteAccount}: iProps) => {
  let company = true;
  
  let [tabIndex, setTabIndex] = useState(0);
  let {mobileView} = useContext(SettingContext);
  let [posts,setPosts]=useState([])
  const [followers,setFollowers]=useState<any>([])
  const [following,setFollowing]=useState<any>([])
  
  const [showChangePassword,setShowChangePassword]=useState(false)


  let {getPosts,getPostsData,getPostsError,isGetPostsLoading} =useGetPosts()
  let {getFollowers
    ,getFollowings
    ,followersData
    ,followingData
    ,followersError
    ,followingError
  ,isFollowersLoading
,isFollowingLoading}=useGetFollowingFollowers()

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
  },[])

  useEffect(() => {
    if (data) {

      if ( data.company && data.company.files) {
       let required_files:any[]=[]
        let images = data.company.files.map((ele: any) => {
          if (ele.file_purpose === "predefined_post_picture") return ele.path;
          if (ele.file_purpose === 'required_file') required_files.push(ele)
        }).filter((ele:any)=>ele)
        formik.setFieldValue("pre_defined_images", images);
        formik.setFieldValue('files',required_files)
      }
      if (data.id) {
        getPosts({user_id:data.id})
      }
    }
  }, [data]);
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
                  space:ele.space,
                  authenticated:true

          }
          )
          
          
        })
        if (returnedPosts) setPosts(returnedPosts)
    }
  }
 },[isGetPostsLoading])
 useEffect(()=>{
  if (!followersError && followersData && followersData.length>0) {
    setFollowers(followersData[0])
  }
},[isFollowersLoading])
useEffect(()=>{
  if (!followingError && followingData && followingData.length>0) {
     setFollowing(followingData[0])
      
  }
    },[isFollowingLoading]) 

  return (
    <Container className="p-1 " style={{height:'100vh'
    ,maxHeight:'100vh',overflowY:'scroll',overflowX:'hidden',maxWidth:'100vw'
    }}>
      {!mobileView ? (
        <Row className="justify-content-evenly d-none d-sm-flex">
          <Col
            sm={3}
            xs={12}
            className={`fixedPart  bg-profile flex-column justify-content-between${
              company ? "" : "py-2"
            }`}
          >
            <Row className="gy-3 justify-content-center">
              <Col xs={12}>
                <Row className="gy-1">
                  <Col xs={12}>
                    <UserInfo
                      company={company}
                      edit={edit}
                      t={t}
                      full_name={data.full_name}
                      profile_picture={data.profile_picture}
                    />
                  </Col>
                  <Col xs={12} className="d-flex justify-content-center ">
                    <FollowersFollowing company={company} t={t} 
                    followers={followers}
                    followings={following}
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
              <Col xs={12}>
                {edit ? (
                  <Col xs={11}>
                    <GreenButton
                      label={t("EditProfile")}
                      fun={() => setEdit(true)}
                    />
                  </Col>
                ) : (
                  <Row className="gy-1">
                    <Col xs={11}>
                      <GreenButton
                        label={t("EditProfile")}
                        fun={() => setEdit(true)}
                      />
                    </Col>
                    <Col xs={11}>
                      <GreenButton label={t("ChangePassword")}
                      fun={()=>setShowChangePassword(true)}
                       />
                    </Col>
                    <Col xs={11}>
                      <WhiteButton label={t("DeleteAccount")}
                      fun={()=>setShowDeleteAccount(true)}
                       />
                    </Col>
                  </Row>
                )}
              </Col>
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
                  <Info
                    company={company}
                    edit={edit}
                    t={t}
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={formik.handleChange}
                    categories={formik.values['category']}
                    
                  />
                  <Posts
                  posts={posts} />
                </Tab>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Row
          className="justify-content-evenly d-flex d-sm-none mobileViewScroll
           gy-3 bg-profile h-100"
          
        >
          <Col sm={3} xs={12} className={`   flex-column`}>
            <Row className="gy-2">
              <Col xs={12}>
                <UserInfo
                  company={company}
                  edit={edit}
                  t={t}
                  full_name={data.full_name}
                  profile_picture={data.profile_picture}
                />
              </Col>

              <Col xs={12} className="mt-2  ">
                <Row className='justify-content-center gy-4'>

                  <Col xs={8}>
                    <FollowersFollowing company={company} t={t}
                     followers={followers}
                     followings={following}
                    />
                  </Col>
                  <Col xs={8}>
                    <Row className="gy-2">

                      <Col xs={12} >
                        <GreenButton
                          label={t("EditProfile")}
                          fun={() => setEdit(true)}
                        />
                      </Col>
                      <Col xs={12}>
                          <GreenButton label={t("ChangePassword")}
                          fun={()=>setShowChangePassword(true)}
                          />
                        </Col>
                      <Col xs={12}>
                          <WhiteButton label={t("DeleteAccount")}
                          fun={()=>setShowDeleteAccount(true)}
                          />
                        </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm={8} xs={12} className="  py-3 pb-5 pb-sm-3  ">
            <Row className="gy-3">
              <Col xs={12}>
                <Row className="p-sm-2 justify-content-center">
                  <Col
                    xs={3}
                    className={tabIndex === 0 ? "tab active-tab" : "tab"}
                    onClick={() => setTabIndex(0)}
                  >
                    {t("Posts")}
                  </Col>
                  <Col
                    sm={5}
                    xs={3}
                    className={tabIndex === 1 ? "tab active-tab" : "tab"}
                    onClick={() => setTabIndex(1)}
                  >
                    {t("Info")}
                  </Col>
                  <Col
                    sm={5}
                    xs={3}
                    className={tabIndex === 2 ? "tab active-tab" : "tab"}
                    onClick={() => setTabIndex(2)}
                  >
                    {t("Data")}
                  </Col>
                  <Col
                    sm={5}
                    xs={3}
                    className={tabIndex === 3 ? "tab active-tab" : "tab"}
                    onClick={() => setTabIndex(3)}
                  >
                    {t("Socials")}
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Tab num={tabIndex}>
                  <>
                    <Col xs={12}>

                    <Posts 
                    posts={posts}/>
                    </Col>
                    <Col xs={12} style={{height:'80px'}} ></Col>
                  </>
                  <>
                  <Col xs={12}>
                  <Info
                    company={company}
                    edit={edit}
                    t={t}
                    values={formik.values}
                    setFieldValue={formik.setFieldValue}
                    handleBlur={formik.handleBlur}
                    lang={lang}
                    handleChange={formik.handleChange}
                    categories={formik.values['category']}
                    
                  />
                  </Col>
                  <Col xs={12} style={{height:'80px'}} ></Col>
                  </>
                  <>
                    <Col xs={12}>
                    <Data
                      t={t}
                      setFieldValue={formik.setFieldValue}
                      handleBlur={formik.handleBlur}
                      values={formik.values}
                      edit={false}
                      lang={lang}
                    />
                    </Col>
                    <Col xs={12} style={{height:'60px'}} ></Col>
                  </>
                  <>
                  <Col xs={12}>
                  <SocialMedia
                    values={formik.values}
                    handleChange={formik.handleChange}
                    t={t}
                  />
                  </Col>
                    <Col xs={12} style={{height:'80px'}} ></Col>
                  </>
                </Tab>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <ChangePassword 
      open={showChangePassword}
      onClose={()=>setShowChangePassword(false)}
      />
     

    </Container>
  );
};
