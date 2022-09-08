
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Container  from 'react-bootstrap/Container'
import Header from '../header'
import LeftSideBar from '../leftside-bar'
import HomePage from '../homePage'
import {Outlet} from 'react-router-dom'
const Layout = ()=>{


    return(
        <>
      
        <Container fluid>
            <Row>
                <Col sm={2} >
                    <LeftSideBar/>
                </Col>
                <Col sm={10} xs={12}>

                    <Col xs={12}>
                    <Header />
                    </Col>
                    <Col xs={12}>
                        <Outlet />
                    </Col>
                </Col>
            </Row>
        </Container>
        </>
      
    )
}

export default Layout;