
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {PostCard} from '../post-card'
import {useGetPosts} from '../tools/apis/useGetPosts'
import React, { useEffect ,useState,useRef} from 'react'
import { Spinner } from '../tools/spinner'
import Fade from 'react-bootstrap/Fade'
import back from '../../images/home/home-back.svg' 
import {useRecoilState} from 'recoil'
import {newsFeedsPosts} from '../store'
import {getLocalStorage} from '../tools/getLocalstorage'
import  {useNavigate,useLocation} from 'react-router-dom'
import GuestBar from '../tools/guest-bar/guestBar'
import { useTranslation } from 'react-i18next'

 const  NewsFeed = ()=>{
    const [posts,setPosts]=useState<any>([])
    const [page,setPage]=useState(1)
    let previousePage=useRef(1)
    const [authenticated,setAuthenticated]=useState(false)
    const postsId=useRef<number[]>([])
    let waitMin=useRef<any>(false)
    const {getPosts,getPostsData,getPostsError,isGetPostsLoading,getNewsFeeds}=useGetPosts()
    const [storedPosts,storePosts] =useRecoilState(newsFeedsPosts)
    
    const navigate =useNavigate()
    const [userId,setUserId]=useState(-1)
    const [isGeuest,setIsGuest]=useState(false)
    const location =useLocation()
    const {i18n,t}=useTranslation()
    useEffect(()=>{
        let obj= getLocalStorage()
        if (obj && obj.id !== 'Guest' ) {

            if ( obj.role) setAuthenticated(true)
            if (obj.id) setUserId(obj.id)
            setIsGuest(false)
        }
        if (!obj) {
            localStorage.setItem('token',JSON.stringify({token:null,full_name:'Guest',id:'Guest'}))
            setIsGuest(true)
        }
        else {
            if (obj && obj.id==='Guest') {
                setIsGuest(true)
            }
        }
    
    },[])
    useEffect(()=>{

        if (!isGetPostsLoading && !waitMin.current) {
            waitMin.current=true
           
            getNewsFeeds(page)
          
            setTimeout(()=>waitMin.current=false,5000)
        }
    },[page,location])
    useEffect(()=>{
        
    },[location])
   
    useEffect(()=>{
        if(!getPostsError) {
            if (getPostsData && getPostsData.length >0) {
            
                let data= getPostsData.map((ele:any,index:number)=>{
                    
                    if (!storedPosts.postsIds.includes(ele.id)) {
                        let newIds=[...storedPosts.postsIds]
                        newIds.push(ele.id)
                       storePosts(pre=>({...pre,postsIds:newIds}))
                        let data= ele.images
                        let updated_at=null
                        let profile_picture=null
                        if (ele.images && ele.images.length>0) {
                             data=ele.images.map((elem:any)=>{
                                
                                //  let arr= elem.path.split('/').slice(3)
                              
                                // let img ='https://backend.instaaqar.com/'+arr.join('/')
                                // return img
                                return elem.path
                            
                
                
                            })
                        }
                       
                        if (ele.updated_at) {
                            const options = { year: 'numeric', month: 'short', day: 'numeric' } as const
                            updated_at={
                                en:new Date(ele.updated_at).toLocaleDateString('en-US',options),
                                ar:new Date(ele.updated_at).toLocaleDateString('ar-EG',options)
                            }
                        }
                   
                        return ({
                           id:ele.id,
                           title:ele.title,
                           username:ele.username,
                           area:ele.area.name,
                           role:ele.role && ele.role.length>0?ele.role[0].name:'',
                           offer_type:ele.offer_type?ele.offer_type.name:null,
                           main_property_type:ele.main_property_type?ele.main_property_type.name:null,
                           price_type:ele.price_type?ele.price_type.name:null,
                           number_of_rooms:ele.number_of_rooms,
                           number_of_bathrooms:ele.number_of_bathrooms,
                           images:data,
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
                           owner:ele.user_id === userId,
                           page_number:page,
                           space:ele.space,
                           shares:ele.shares,
                           views:ele.views
                       

                         })
                    }

                }).filter((ele:any)=>ele)
              
                setPosts((pre:any)=>([...pre,...data]))
                let newPosts= [...storedPosts.posts]
                if (data && data[0])newPosts.push(data[0])
                storePosts(pre=>({...pre,posts:newPosts}))
            }
            else {
                if (getPostsData) {
                    setPage(previousePage.current)
                }
            }
        }
    },[isGetPostsLoading])

   const fetchPost =(e:React.UIEvent<HTMLDivElement>)=>{
    let target =e.currentTarget
        if(target.scrollHeight- target.scrollTop === target.clientHeight) {
            if (!waitMin.current) {

                previousePage.current=page
                let newPage=   page +1
                setPage(newPage)
            }
        }
   }
  
    return (
        <Col xs={12} className="homeContainer" onScroll={fetchPost} >

        <Row className="p-1">
            {
                storedPosts.posts && 
                storedPosts.posts.length>0 ?
                storedPosts.posts.map((ele:any,index:number)=> 
                <Col xs={12} sm={9} lg={6} key={index} className="mx-sm-auto mx-lg-0">
                  <PostCard {...ele} authenticated={authenticated} 
                />
                </Col>
                ):
                <Col xs={12} className='d-flex justify-content-center align-items-center'>

                    <Col xs={12} className="noDataContainer">
                        <Col xs={5} >
                            <img src={back} />
                        </Col> 
                        <div className="text">
                            {i18n.language==='en'?
                            <>
                            <span>
                            Your following list is empty
                            
                            </span>
                            <span>follow some users to see their recent posts</span>
                            </>
                            :
                            <>
                            <span>
                                لا يوجد بوستات لنعرضها لك
                            </span>
                            <span>
                                تابع بعض المستخدمين لتحصل على المزيد من البوستات
                            </span>
                            </>
                            }
                        </div>
                </Col>
                </Col>
            }
           
            <div className="spacer" style={{height:isGetPostsLoading?'100px':'50px'}}></div>
        </Row>
       {
       <Fade in={isGetPostsLoading} >

            <Row  className='postLoadingContainer' style={{height:isGetPostsLoading?'30px':'0px'}}>
                <Col xs={12} className="postsLoading">

                    <Spinner />
                </Col>
            </Row>
       </Fade> 
       }

    
    </Col>
    )
}
export default NewsFeed;