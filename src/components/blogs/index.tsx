import './blogs.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BlogCard from './blog-card'
import React from 'react'

export default function Blogs() {

  return (
   <Col xs={12} className="blogContainer">
     <Row>
        <Col xs={12} sm={8} className="mx-auto">
            <BlogCard />
        </Col>
        <Col xs={12}
        style={{height:'50px'}}>


        </Col>
     </Row>
   </Col>
  )
}
