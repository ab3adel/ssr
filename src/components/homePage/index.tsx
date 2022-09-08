import './home.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {PostCard} from './post-card'


const HomePage =()=>{

return (
    <Col xs={12} className="homeContainer">

        <Row className="p-1">

            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <div className="spacer"></div>
        </Row>
      

    </Col>
)

}
export default HomePage;