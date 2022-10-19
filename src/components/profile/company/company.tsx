import { Container, Row ,Col } from 'react-bootstrap'
import {FixedPart} from '../views/fixed-part'
import {ScrollablePart} from '../views/scrollable-part'


export const CompanyProfile= ()=>{
    return (
       <Container className="p-1 ">
        <Row className="justify-content-evenly">

            <Col xs={3} className='py-2'>
                <FixedPart 
                company={true}/>
            </Col>
            <Col xs={8} className="py-2">
                <ScrollablePart />
            </Col>
        </Row>
       </Container>
    )
}