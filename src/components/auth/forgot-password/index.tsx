import './forgot.scss'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import {EmailForm} from './email-form'
import {EmailInfo} from './info'
interface iProps {show:boolean,setShow:()=>void}


const ForgotPassword =({show,setShow}:iProps)=>{
const [done ,setDone]=useState(false)

    return (
        <Modal show={show} onHide={setShow}
        className="forgotModal">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container className="p-1 d-flex justify-content-center">
                    <Col xs={10} className="p-2">
                       {done?
                       <EmailInfo 
                       setDone={setDone}/>
                       :
                        <EmailForm 
                        setDone={setDone}/>
                        }
                    </Col>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default ForgotPassword;