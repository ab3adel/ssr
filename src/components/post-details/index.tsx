import './post-details.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {ScrollableSection} from './scrollable-section'
import image1 from '../../images/home/image1.png'
import image2 from '../../images/home/image2.png'
import image3 from '../../images/home/image3.png'
import image4 from '../../images/home/image4.png'
import {FixedSection} from './fixed-section'
import {useState,useEffect,useContext} from 'react'
import {MobileView} from './mobile-view'
import {useRecoilState} from 'recoil'
import {Posts} from '../store'
import {useParams} from 'react-router-dom'
import { iPost } from '../tools/interface'
import {useLikePost} from '../tools/apis/uselikePost'
import {getLocalStorage} from '../tools/getLocalstorage'
import notificationContext from '../tools/context/notification/notification-context'
let images=[image1,image2,image3,image4]

let description =`
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

`

const PostDetails =()=>{
    const {id}=useParams()
    const {setNotify}=useContext(notificationContext)
    const [react,setReact]=useState(false)
    const [storedPosts]=useRecoilState(Posts)
    const {likeData,likeError,isLikeLoading,setLike,setUnLike} =useLikePost()
    const [authenticated,setAuthenticated]=useState(false)
    const [postLikes,setPostLikes]=useState(0)
    const [post,setPost]=useState<iPost>({
        images:[{path:'',file_name:{en:'',ar:''}}]
        ,area:{en:'',ar:''},
        currency:{en:'',ar:''},
        id:-1,
        likes:0,
        price:'',
        role:{en:'',ar:''},
        title:{en:'',ar:''},
        username:'',
        liked:false,
        number_of_bathrooms:0,
        number_of_rooms:0,
        profile_picture:'',
        updated_at:{en:'',ar:''},
        services_available:{en:'',ar:''},
        description:{en:'',ar:''}

    })
    const handelReact =(id:number)=>{
        if (authenticated) {

            
             if (!react) {
                 setLike(id)
                 setPostLikes(postLikes + 1)
                 setReact(true)
             }
             else {
                 setUnLike(id)
                 setPostLikes(postLikes - 1)
                 setReact(false)
             }
        }
        else {
            setNotify((pre:any)=>({...pre,show:true,type:'info',message:'You have to login first !'}))
        }
    }
    useEffect(()=>{
  
        if(id ){
          
            let specificPost=storedPosts.filter((ele:any)=>ele.id === parseInt(id))[0]
            if (!specificPost) return
            console.log(specificPost)
            setPostLikes(specificPost.likes)
            setPost(specificPost)
        }
        if (getLocalStorage()) {
            let user=getLocalStorage()
            if(user.role) setAuthenticated(true)
            
        }
    },[])
    
console.log(post)
    return (
        <Col xs={12} className="postDetailsContainer">
            
                <Col xs={0} sm={12} className="p-0">
                    <Row className="justify-content-evenly d-none d-sm-flex">
                        <Col xs={12} className="d-flex  scrollableContainer"
                        >

                            <ScrollableSection 
                            images={images}
                            description={description}
                            react={react}
                            handleReact={handelReact}
                            post={post}
                            authenticated={authenticated}
                            postLikes={postLikes}
                            
                            />
                        </Col>
                        <FixedSection post={post} />
                    </Row>
                </Col>
                <Col  xs={12} className="d-block d-sm-none">
                    <MobileView 
                        images={images}
                        description={description}
                        react={react}
                        handleReact={handelReact}
                        post={post}
                        authenticated={authenticated}
                        postLikes={postLikes}
                    />
                </Col>
          
        </Col>
    )
}
export default PostDetails;