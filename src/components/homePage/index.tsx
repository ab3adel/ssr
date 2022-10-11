import './home.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {PostCard} from './post-card'
import {useGetPosts} from '../tools/apis/useGetPosts'
import React, { useEffect ,useState,useRef} from 'react'
import { Spinner } from '../tools/spinner'
import Fade from 'react-bootstrap/Fade'

const HomePage =()=>{
    const [posts,setPosts]=useState<any>([])
    const [page,setPage]=useState(1)
    const postsId=useRef<number[]>([])
    const {getPosts,getPostsData,getPostsError,isGetPostsLoading}=useGetPosts()
    
    useEffect(()=>{
        getPosts({page})
    },[page])
   
    useEffect(()=>{
        if(!getPostsError) {
            if (getPostsData && getPostsData.length >0) {
                
                let data= getPostsData.map((ele:any,index)=>{
                    if (!postsId.current.includes(ele.id)) {
                        postsId.current.push(ele.id)
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
                           images:ele.images,
                           profile_picture:ele.profile_picture,
                           property_site:ele.property_site?ele.property_site.name:null,
                           property_type:ele.property_type?ele.property_type.name:null,
                           tags:ele.tags_ids && ele.tags_ids.length>0?ele.tags_ids:null,
                           currency:ele.area.country.currency,
                           likes:ele.likes
                         })
                    }

                }).filter(ele=>ele)
                setPosts((pre:any)=>([...pre,...data]))
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
                posts.map((ele:any,index:number)=> <PostCard {...ele} key={index}/>):
                <Col xs={12} className='d-flex justify-content-center align-items-center'>

                    <Spinner />
                </Col>
            }
           
            <div className="spacer"></div>
        </Row>
       {
       <Fade in={isGetPostsLoading}>

            <Row  className='postLoadingContainer'>
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