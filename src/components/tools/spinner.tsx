import  MySpinner  from "react-bootstrap/Spinner"
import Col from 'react-bootstrap/Col'



export const Spinner=()=>{


    return (
        <Col xs={12} className="d-flex justify-content-center">

            <MySpinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </MySpinner>
        </Col>
    )
}