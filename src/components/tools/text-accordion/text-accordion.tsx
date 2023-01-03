import './text-accordion.scss'

import Col from 'react-bootstrap/Col'
import {useState} from 'react'
import arrow from '../../../images/post-details/down-arrow.svg'

interface iProps {description:string}

export const TextAccordion =({description}:iProps)=>{
const [expand ,setExpand]=useState(false)

    return (
        <>
                    {
                        description?.length >200 ?
                        !expand?
                    <Col xs={12} className="textAccordion px-1">
                        <Col xs={12} className="textRistrected text px-1">

                           { description.slice(0,200) + ' . . .'}
                        </Col>
                        <Col xs={5} className="btn"
                        onClick={()=>setExpand(!expand)}>
                            <span>Read More</span>
                            <img src={arrow} className="down icon" />
                        </Col>
                    </Col>
                        
                        :
                        <Col xs={12} className="textAccordion px-1">

                            <Col xs={12}  className="textExpanded text px-1">

                                { description}
                            </Col>
                            <Col xs={5} className="btn"
                            onClick={()=>setExpand(!expand)}>
                                <span>Read Less</span>
                                <img src={arrow} className="up icon"/>
                            </Col>                                 
                        </Col>
                        :
                        
                        <Col xs={12} className="px-1">

                        { description}
                        </Col> 
                    }
        </>
    )
}