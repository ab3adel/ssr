import './post-details.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {ScrollableSection} from './scrollable-section'
import image1 from '../../images/home/image1.png'
import image2 from '../../images/home/image2.png'
import image3 from '../../images/home/image3.png'
import image4 from '../../images/home/image4.png'
import {FixedSection} from './fixed-section'
import {useState,useEffect} from 'react'
import {MobileView} from './mobile-view'
import {useRecoilState} from 'recoil'
import {Posts} from '../store'
import {useParams} from 'react-router-dom'
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
    const [react,setReact]=useState(false)
    const [storedPosts]=useRecoilState(Posts)
    const [post,setPost]=useState({})
    const handelReact =()=>{
        setReact(!react)
    }
    useEffect(()=>{
        if(id && !isNaN(parseInt(id))){

            let specificPost=storedPosts.filter((ele:any)=>ele.id === parseInt(id))[0]
          
            setPost(specificPost)
        }
    },[id])
console.log(post)
    return (
        <Col xs={12} className="postDetailsContainer">
            
                <Col xs={0} sm={12} className="p-0">
                    <Row className="justify-content-evenly d-none d-sm-flex">
                        <ScrollableSection 
                        images={images}
                        description={description}
                        react={react}
                        handleReact={handelReact}
                        post={post}
                        />
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
                    />
                </Col>
          
        </Col>
    )
}
export default PostDetails;