import Col  from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"


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