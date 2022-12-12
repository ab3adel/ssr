import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './filtered_posts.scss'
import {PostCard} from '../post-card/'
import {Posts} from '../store'
import {useRecoilState} from 'recoil'
import {useSearchParams} from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import {useGetPosts} from '../tools/apis/useGetPosts'
import { getLocalStorage } from '../tools/getLocalstorage'
import {Pagination} from '../tools/pagination/pagination'
const FilteredPosts=()=>{
const [storedPosts] =useRecoilState(Posts)
const [params,setParams] =useSearchParams()
const [posts,setPosts]=useState<any[]>([])
const [authenticated,setAuthenticated]=useState(false)
const [userId,setUserId]=useState(-1)
const lastPage=useRef(1)
const [currentPage,setCurrentPage]=useState(1)
const {

    getPosts,
    getPostsData,
    getPostsError,
    isGetPostsLoading
} =useGetPosts()
let obj:any={}
useEffect(()=>{
console.log('fetching')
    // for (let entry of params.entries()) {
    // obj[entry[0]]=entry[1]
    // }
    params.forEach((value:string,key:string)=>{
        obj[key]=value
    })
   
    getPosts(obj)
},[params])
useEffect(()=>{
    let obj:any={}
    params.forEach((value:string,key:string)=>{
        obj[key]=value
    })
   console.log(obj)
setParams({...obj,page:currentPage})
},[currentPage])

useEffect(()=>{
    let obj= getLocalStorage()
    if (obj && obj.id !== 'Guest' ) {

        if ( obj.role) setAuthenticated(true)
        if (obj.id) setUserId(obj.id)
    }


},[])
useEffect(()=>{
    if(!getPostsError) {
        if (getPostsData && getPostsData.data&& getPostsData.data.length >0) {
         let {current_page,last_page}=getPostsData
        
            let data= getPostsData.data.map((ele:any,index:number)=>{
                
             
                   
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
                       page_number:getPostsData.current_page,
                       space:ele.space
                   

                     })
                

            }).filter((ele:any)=>ele)
          
            setPosts((pre:any)=>(data))
            lastPage.current=last_page
           
           
        }
    }
},[isGetPostsLoading])
const handleCurrentPage=(num:number)=>{
setCurrentPage(num)

}

    return (
        <Col xs={12} className="filteredPostsContainer">
            
            {posts && posts.length>0?
            <Row>
               { posts.map((ele,index)=>{
                    return (
                        <Col sm ={6} xs={12} key={index}>
                            <PostCard {...ele} authenticated={false}  />
                        </Col>
                    )
                }) 
                }
          <Pagination
          currentPage={currentPage}
          lastPage={lastPage.current}
          setPage={handleCurrentPage}
           />
            </Row>    
                :
                <Col xs={12}
                className="noResult">
                    {
                        isGetPostsLoading?
                        <div>
                          
                                Loading your results
                                
                           <span className="hide1">.</span>
                           <span className="hide2">.</span>
                           <span className="hide3">.</span>
                        </div>
                        :
                    <div>
                        No Results found !!
                    </div>
                    }
                </Col>          
            }
          
        </Col>
    )
}
export default FilteredPosts;