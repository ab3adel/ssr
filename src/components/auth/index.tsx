import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {LogIn} from './login'
import {Guest} from './guest'
import {useState} from 'react'
const LoginCard = () =>{
    const [guest,setGuest]=useState(false)


    return (
        <Container
        fluid
        className="loginContainer">
           <Row className='d-flex justify-content-center'>
               <Col xs={12} sm={5}
               >
                   <Card className="loginCard">
                     {guest?
                        
                        <Guest 
                        setGuest={setGuest}/>:
                        <LogIn 
                         setGuest={setGuest}/>
                     }
                    </Card>
               </Col>
           </Row>
        </Container>            
    )
}

export default LoginCard;