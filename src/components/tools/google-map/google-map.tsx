import './google-map.scss'
import GoogleMapReact from 'google-map-react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

interface iProps {show:boolean,setShow:()=>void}
export const GoogleMap=({show,setShow}:iProps)=>{
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
    return (
        <Modal className="googleMapContainer"
        show={show}
        onHide={setShow}>
            <Modal.Header closeButton
            onClick={setShow}>
                <span>Set your Location :</span>
            </Modal.Header>
            <Modal.Body
             className="h-100">
                <Container className="p-2 h-100">
                        <Col xs={12}
                           style={{ height: '100%', width: '100%' }}>
                          <GoogleMapReact 
                           center={defaultProps.center}
                           zoom={defaultProps.zoom}
                          >
                        
                          </GoogleMapReact>
                        </Col>
                    
                </Container>
            </Modal.Body>
        </Modal>
    )
}