import './contact-element.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import user from "../../../images/auth/profile.svg";
interface iProps {ele:any,onClick:Function}
const ContactElement=({ele,onClick}:iProps) =>{

    return (
        <Col xs={12} className={`contactElement-notification ${ele.unreadMsgs?'withForeground':''}`}
        onClick={()=>onClick()}>
            <Row className='mh-100 overflow-hidden'>
                <Col xs={3} className="d-flex align-items-center mh-100">
                    <img src={ele.img || user} className="contact-img" />
                </Col>
                <Col xs={9} className="p-2 d-flex justify-content-between align-items-center  overflow-hidden"
                 style={{maxHeight:'50px'}}
                 >
                    <div className="contact-detail">

                        <div className='contact-name'>
                            {ele.name}
                        </div>
                        <div className='contact-lastmsg '>
                            {ele.lastMsg || ""}
                        </div>
                    </div>
                    <div className='contact-time'>
                        <div className="msgsNumber" style={{ opacity: ele.unreadMsgs ? "1" : "0" }}>{ele.unreadMsgs || ""}</div>
                        <div className="timeCont">{ele.time || ""}</div>
                    </div>


                </Col>
            </Row>
        </Col>
    )
}
export default ContactElement;