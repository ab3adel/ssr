import './home.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {PostCard} from '../post-card'
import {useGetPosts} from '../tools/apis/useGetPosts'
import React, { useEffect ,useState,useRef} from 'react'
import { Spinner } from '../tools/spinner'
import Fade from 'react-bootstrap/Fade'
import back from '../../images/home/home-back.svg' 
import {useRecoilState} from 'recoil'
import {Posts} from '../store'
import {getLocalStorage} from '../tools/getLocalstorage'
const HomePage =()=>{
    const [posts,setPosts]=useState<any>([])
    const [page,setPage]=useState(1)
    const [authenticated,setAuthenticated]=useState(false)
    const postsId=useRef<number[]>([])
    let waitMin=useRef<any>(false)
    const {getPosts,getPostsData,getPostsError,isGetPostsLoading}=useGetPosts()
    const [storedPosts,storePosts] =useRecoilState(Posts)
    useEffect(()=>{
        let obj= getLocalStorage()
        
        if (obj && obj.role) setAuthenticated(true)
    },[])
    useEffect(()=>{

        if (!isGetPostsLoading && !waitMin.current) {
            waitMin.current=true
            getPosts({page})
            setTimeout(()=>waitMin.current=false,5000)
        }
    },[page])
   
    useEffect(()=>{
        if(!getPostsError) {
            if (getPostsData && getPostsData.length >0) {
          
                let data= getPostsData.map((ele:any,index)=>{
                    if (!postsId.current.includes(ele.id)) {
                        postsId.current.push(ele.id)
                        let data= ele.images
                        if (ele.images && ele.images.length>0) {
                             data=ele.images.map((elem:any)=>{
                                
                                //  let arr= elem.path.split('/').slice(3)
                              
                                // let img ='https://backend.instaaqar.com/'+arr.join('/')
                                // return img
                                return elem.path
                            
                
                
                            })
                        }
                        return ({
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
                           images:data,
                           profile_picture:ele.profile_picture,
                           property_site:ele.property_site?ele.property_site.name:null,
                           property_type:ele.property_type?ele.property_type.name:null,
                           tags:ele.tags_ids && ele.tags_ids.length>0?ele.tags_ids:null,
                           currency:ele.area.country.currency,
                           likes:ele.likes,
                           liked:ele.liked
                         })
                    }

                }).filter(ele=>ele)
                setPosts((pre:any)=>([...pre,...data]))
                storePosts([...data])
            }
        }
    },[isGetPostsLoading])

   const fetchPost =(e:React.UIEvent<HTMLDivElement>)=>{
    let target =e.currentTarget
        if(target.scrollHeight- target.scrollTop === target.clientHeight) {
            let newPage=   page +1
            setPage(newPage)
        }
   }
 
return (
    <Col xs={12} className="homeContainer" onScroll={fetchPost} >

        <Row className="p-1">
            {
                posts.length>0 ?
                posts.map((ele:any,index:number)=> 
                <Col xs={12} sm={6} key={index}>
                  <PostCard {...ele} authenticated={authenticated} key={index}/>
                </Col>
                ):
                <Col xs={12} className='d-flex justify-content-center align-items-center'>

                    <Col xs={12} className="noDataContainer">
                        <Col xs={5} >
                            <img src={back} />
                        </Col> 
                        <div className="text">
                            <span>Your following list is empty</span>
                            <span>follow some users to see their recent posts</span>
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
export default HomePage;