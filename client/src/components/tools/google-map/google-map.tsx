import './google-map.scss'
import GoogleMapReact,{MapOptions,Maps} from 'google-map-react'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useTranslation } from 'react-i18next'

interface iProps {show:boolean,setShow:()=>void}
let  getMapOptions = (maps: Maps) => {

  return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: true,
      styles: [{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [{
              visibility: "off"
          }]
      }],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      minZoom: 11,
      maxZoom: 18,

      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.SATELLITE,
      mapTypeControlOptions: {
          style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: maps.ControlPosition.BOTTOM_CENTER,
          mapTypeIds: [
              maps.MapTypeId.ROADMAP,
              maps.MapTypeId.SATELLITE,
              maps.MapTypeId.HYBRID
          ]
      },

      zoomControl: true,
      clickableIcons: false
  };
}
export const GoogleMap=({show,setShow}:iProps)=>{
  const {i18n}=useTranslation()
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
                <span>{i18n.language?'Set your Location :':'حدد موقعك على الخريطة:'}</span>
            </Modal.Header>
            <Modal.Body
             className="h-100">
                <Container className="p-2 h-100">
                        <Col xs={12}
                           style={{ height: '100%', width: '100%' }}>
                          <GoogleMapReact 
                           center={defaultProps.center}
                           zoom={defaultProps.zoom}
                           
                            options={getMapOptions}
                          
                           bootstrapURLKeys={{
                            key:'AIzaSyAi51d5XZLV8oquto7pmBaEJqt2GYzJJvY',
                            region:'KW',
                            language:'ar',
                            libraries:['places', 'geometry', 'drawing', 'visualization']
                          }}
                          >
                        
                          </GoogleMapReact>
                        </Col>
                    
                </Container>
            </Modal.Body>
        </Modal>
    )
}