import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './filtered_posts.scss'
import {PostCard} from '../post-card/'
import {useSearchParams} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {useGetPosts} from '../tools/apis/useGetPosts'
import { getLocalStorage } from '../tools/getLocalstorage'
import {Pagination} from '../tools/pagination/pagination'
import { isObject } from 'formik'
import {useTranslation} from 'react-i18next'

interface iObjParams{[key:string]:{id?:number,title:{en:string,ar:string},value?:number}}
const FilteredPosts=()=>{

const [params,setParams] =useSearchParams()
const [posts,setPosts]=useState<any[]>([])
const [authenticated,setAuthenticated]=useState(false)
const [disabledTags,setDisabledTags]=useState<string[]>([])
const [userId,setUserId]=useState(-1)
const lastPage=useRef(1)
const {i18n}=useTranslation()
const [readableObj,setReadableObj]=useState<iObjParams>({})
const [currentPage,setCurrentPage]=useState(1)
const [isQuickSearch,setIsQuickSearch]=useState(false)
const {

    getPosts,
    getPostsData,
    getPostsError,
    isGetPostsLoading
} =useGetPosts()
let obj:any={}
useEffect(()=>{

    // for (let entry of params.entries()) {
    // obj[entry[0]]=entry[1]
    // }
    let is_quicksearch=false
    let tags_ids_arr:any=[]
  
    params.forEach((value:string,key:string)=>{
       
        if (key==='quicksearch' ){
            is_quicksearch=true
        }
        if (key.includes('tags_ids')) {
            
            if (value !== 'undefined'){
                tags_ids_arr.push(value)
                obj[key]=value
            }
        }
        else {

            obj[key]=value
        }
    })
   
    Object.keys(readableObj).map((ele:string)=>{
        if (!disabledTags.includes(ele)) {
           
             obj[ele]=readableObj[ele].value?readableObj[ele].value:readableObj[ele].id
        }
        else {
            delete obj[ele]
        }
    })
    if (is_quicksearch && (!isQuickSearch && disabledTags.length===0))  delete obj['text']
   

    if (tags_ids_arr.length>0) obj['tags_ids']=tags_ids_arr.filter((ele:string|undefined)=>ele)
    getPosts(obj)
    if (sessionStorage.getItem('search_params')) {
        setReadableObj(JSON.parse(sessionStorage.getItem('search_params') as string))
    }
    setIsQuickSearch(true)
    return ()=>{
        sessionStorage.removeItem('search_params')
    }
   
},[params])
useEffect(()=>{
if (isQuickSearch) {
    let new_disabledTags=[...disabledTags]
    if (new_disabledTags.length===0) {
        new_disabledTags.push('text')
       
    }
    setDisabledTags(new_disabledTags)
}
},[isQuickSearch])
useEffect(()=>{
    let obj:any={}
    params.forEach((value:string,key:string)=>{
     
     
            obj[key]=value
        
        
    })
  
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
    let obj:any={}
    params.forEach((value:string,key:string)=>{
        obj[key]=value
    })

    Object.keys(readableObj).map((ele:string)=>{
        if (!disabledTags.includes(ele)) {
             obj[ele]=readableObj[ele].value?readableObj[ele].value:readableObj[ele].id
        }
        else {
            delete obj[ele]
        }
    })
   
setParams({...obj,page:currentPage})
},[disabledTags])
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
        else {
            if (getPostsData && getPostsData[0]) {
                let data= getPostsData.map((ele:any,index:number)=>{
                
             
                   
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
         
           
            }
            else {
                setPosts([])
            }
        }
    }
},[isGetPostsLoading])
const handleCurrentPage=(num:number)=>{
setCurrentPage(num)

}
const changeSearch=(str:string)=>{
    
    if (disabledTags.includes(str)) {
        let newTags=disabledTags.filter(ele=>ele !== str)
        setDisabledTags(newTags)
        
    }
    else {
        let newTags=[...disabledTags,str]
        setDisabledTags(newTags)
    }
    
}

    return (
        <Col xs={12} className="filteredPostsContainer">
            <Row>
                <Col xs={12}>
                    <Row className="my-1 gy-2 px-1">
                        {
                            Object.entries(readableObj).map((ele:any,key:number)=>{
                             
                                return (
                                <Col xs={3}  sm={2} key={key} style={{cursor:'pointer'}}
                                onClick={()=>changeSearch(ele[0])}>
                            <div className={
                                disabledTags.includes(ele[0])? "searchTag inactive": "searchTag active"
                            }
                            
                            >
                            
                                <span className='mx-1'
                                >
                                    {isObject(ele[1])?i18n.language==='en'?ele[1].title?.en:ele[1].title?.ar:ele[1]}
                                
                                </span>
                                </div>
                            </Col>)
                           
                          
                        })
                        }
                        
                    </Row>
                </Col>
            {posts && posts.length>0?
            <Row>
               
               { posts.map((ele,index)=>{
                    return (
                        <Col lg={6} sm ={9} xs={12} key={index} className='mx-auto'>
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
                          
                                {i18n.language==='en'? 'Loading your results':"???????? ??????????????"}
                                
                           <span className="hide1">.</span>
                           <span className="hide2">.</span>
                           <span className="hide3">.</span>
                        </div>
                        :
                    <div>
                       {i18n.language==='en'?'No Results found !!':'???? ???????? ?????????? ???????????? !!'}
                    </div>
                    }
                </Col>          
            }
          </Row>
        </Col>
    )
}
export default FilteredPosts;