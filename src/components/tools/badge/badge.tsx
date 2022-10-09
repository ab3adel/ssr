import Col  from "react-bootstrap/Col"
import Row  from "react-bootstrap/Row"
import {Spinner} from '../spinner'
import {useTranslation} from 'react-i18next'
import {useEffect, useState} from 'react'
import './badge.scss'
import {iOption} from '../interface'
interface iProps{
    items?:iOption []
    ,label:string
    ,selected:number
    ,setSelected:Function
    ,name:string
}


export const Badge= (
    {items,label,selected,setSelected,name}:iProps
)=>{
    const {i18n}=useTranslation()
const handleSelect =(id:number)=>{
    
    setSelected(name,id)
}

useEffect(()=>{
    if (!selected) {
        handleSelect(0)
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
                                items && items.length >0 ?
                                items.map((ele,index)=> {
                                    return (
                                        <Col xs={3} key={index}>
                                            <Col xs={12} 

                                            className={ele.id === selected ?"selected myBadge":"item myBadge"}
                                            onClick={()=>handleSelect(ele.id as number)}
                                            >
                                                {i18n.language==='en'? ele.title?.en:ele.title?.ar}
                                            </Col>
                                        </Col>
                                        )
                                })
                                :
                                null
                            }
                      
                    </Row>
                </Col>
            </Row>

        </Col>
    )
}