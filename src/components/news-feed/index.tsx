

import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import back from '../../images/home/home-back.svg' 

 const  NewsFeed = ()=>{
let [data,setData]=useState(false)
if (data) {
    return (<></>)
}
    return (
        <Col xs={12} className="homeContainer">
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
    )
}
export default NewsFeed;