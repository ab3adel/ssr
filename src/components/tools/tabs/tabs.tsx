import './tabs.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useState} from 'react'
import { Value } from 'sass'
interface iData {title:string ,value:string []}
interface iProps {data:iData[]}

export const Tabs =({data}:iProps)=>{
    const [selected,setSelected]=useState(0)
    return (
      <Col xs={12} className="tabsContainer">
        <Row className="gy-3">
            <Col xs={12}>
                <Row>
                    {
                        data.map((ele,index)=>{
                            return (
                                <Col xs={6} key={index} 
                            
                            >
                                    <Col xs={12}
                                    className={selected === index ? "tab selected":"tab"}
                                    onClick={()=>setSelected(index)}>

                                    <span>{ele.title}</span>
                                    </Col>
                                </Col>
                                )
                        })
                    }
                    
                    
                </Row>
            </Col>
            <Col xs={12} className="p-1">
                <Row className='gy-2'>

                    {
                        data[selected].value.map((ele,index)=>{
                            return (
                                
                                <Col xs={6} key={index} >
                                    <Col xs={10} className={'mybadge'}>

                                        {ele}
                                    </Col>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Col>
        </Row>
      </Col>
    )
}