
import Container from 'react-bootstrap/Container'

import Col from 'react-bootstrap/Col'
import './loading.scss'
import Spinner from 'react-bootstrap/Spinner'
interface iProps {message:string,show:boolean}
export default function Loading({show,message}:iProps) {
  return (
    <>
{show && 
    <Container className="loadingContainer" >
        <Col xs={12} className="d-flex align-items-center justify-content-center h-100">
            <span className='mx-2 fw-bold' style={{color:'white'}}>{message}</span>
            <Spinner animation='grow' style={{background:'#035222'}} />
        </Col>
    </Container>
}
</>
  )
}
