import { useEffect, useState } from 'react'
import { Col,Row ,Button} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './trible-tabs.scss'

interface iProps {options:any[],label:string
    ,setFieldValue:Function,name:string,value:any}

export const TribleTabs=({options,label,name,setFieldValue,value}:iProps)=>{
    const [active,setActive]=useState(-1)
    const {i18n,t}=useTranslation()
    const handleClick =(value:number,index:number)=>{
        setActive(value)
        setFieldValue(name,value)
    }
    useEffect(()=>{
        if (value){
            setActive(pre=>value)
        }
    })
    return (
        <Col xs={12} className="tribleContainer ">
            
            <Row className='mw-100 m-0'>
                <Col xs={12}>
                    <span className='font-weight-bolder'>{label}</span>
                </Col>
                <Col xs={12} className="border p-1">
                    <Row>

                        
                            {
                                options.map((ele:any,index:number)=>
                                <Col xs={4} key={index}>
                                <Button className={active=== ele.id? "btn active":"btn inActive"} 
                                key={index}
                                onClick={()=>handleClick(ele.id,index)}>
                                    {i18n.language==='en'?ele.title.en:ele.title.ar}
                                </Button>
                                </Col>
                                )
                        
                            }
                      
                    </Row>
                </Col>
            </Row>
            
        </Col>
    )
}