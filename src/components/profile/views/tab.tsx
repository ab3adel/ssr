import { Row,Col } from "react-bootstrap"


interface iProps {children:React.ReactElement [],num:number}
export const Tab =({children,num}:iProps)=>{

    return (
        <Col xs={12}>
            <Row>
                {
                    children.map((ele,index:number)=>{
                        if(index===num) return ele
                    })
                }
            </Row>
        </Col>
    )
}