import './post-details.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import {ScrollableSection} from './scrollable-section'
import image1 from '../../images/home/image1.png'
import image2 from '../../images/home/image2.png'
import image3 from '../../images/home/image3.png'
import image4 from '../../images/home/image4.png'
import {FixedSection} from './fixed-section'
import {useState} from 'react'
import {MobileView} from './mobile-view'
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
    const [react,setReact]=useState(false)
    const handelReact =()=>{
        setReact(!react)
    }


    return (
        <Col xs={12} className="postDetailsContainer">
            
                <Col xs={0} sm={12} className="p-0">
                    <Row className="justify-content-evenly d-none d-sm-flex">
                        <ScrollableSection 
                        images={images}
                        description={description}
                        react={react}
                        handleReact={handelReact}/>
                        <FixedSection />
                    </Row>
                </Col>
                <Col  xs={12} className="d-block d-sm-none">
                    <MobileView 
                        images={images}
                        description={description}
                        react={react}
                        handleReact={handelReact}
                    />
                </Col>
          
        </Col>
    )
}
export default PostDetails;