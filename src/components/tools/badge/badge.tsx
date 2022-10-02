import Col  from "react-bootstrap/Col"
import Row  from "react-bootstrap/Row"
import Container from 'react-bootstrap/Container'
import {useEffect, useState} from 'react'
import './badge.scss'
interface iProps{
    items:string []
    ,label:string
    ,selected:string
    ,setSelected:Function
    ,name:string
}


export const Badge= (
    {items,label,selected,setSelected,name}:iProps
)=>{
const handleSelect =(ele:string)=>{
    setSelected(name,ele)
}

useEffect(()=>{
    if (!selected) {
        handleSelect(items[0])
    }
},[selected])
    return (

        <Col xs={12}  className="badgeContainer">
            <Row className="">
                <Col xs={12} className="text-right font-weight-bold mb-2">
                            {label}
                </Col>
                <Col xs={12}>
                    <Row className="gx-1">
                        

                            {
                                items.map((ele,index)=> {
                                    return (
                                        <Col xs={3} key={index}>
                                            <Col xs={12} 

                                            className={ele === selected ?"selected myBadge":"item myBadge"}
                                            onClick={()=>handleSelect(ele)}
                                            >
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