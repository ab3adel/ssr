import './tabs.scss'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {Spinner} from '../spinner'
interface iSubType {title:{ar:string,en:string},id:number}
interface iData {title:{ar:string,en:string},type_id:number ,value:iSubType []}
interface iProps {data:iData[],setFieldValue:Function,name:string}

export const Tabs =({data,setFieldValue,name}:iProps)=>{
    const {i18n}= useTranslation()
    const [selected,setSelected]=useState(0)
    const [selectedSubTypes,setSelectedSubTypes]=useState(0)
    const handleChoosedTab= (index:number)=>{
        setSelectedSubTypes(0)
        setSelected(index)
        setFieldValue(name,data[index].value[0].id)
    }
    const handleSelectedSubType=(id:number,index:number)=>{
        setSelectedSubTypes(index)
        setFieldValue(name,id)
    }

    return (
      <Col xs={12} className="tabsContainer">
        <Row className="gy-3">
            <Col xs={12}>
                <Row >
                    {
                        data.length >0 ?
                        data.map((ele,index)=>{
                            return (
                                <Col xs={6} key={index} 
                            
                            >
                                    <Col xs={12}
                                    className={selected === index ? "tab selected":"tab"}
                                    onClick={()=>handleChoosedTab(index)}>

                                    <span>{i18n.language === 'en' ? ele.title.en: ele.title.ar}</span>
                                    </Col>
                                </Col>
                                )
                        })
                        :
                      <Spinner  />
                    }
                                       
                    
                </Row>
            </Col>
            <Col xs={12} className="p-1">
                <Row className='gy-2 px-2'>

                    {
                        data.length>0?
                        data[selected].value.map((ele,index)=>{
                            return (
                                
                                <Col xs={6} key={index}
                                onClick={()=>handleSelectedSubType(ele.id,index)} >
                                    <Col xs={10} className={selectedSubTypes === index?'mybadge selected-sub-type':'mybadge '}>

                                    {i18n.language === 'en' ? ele.title.en: ele.title.ar}
                                    </Col>
                                </Col>
                            )
                        })
                        :
                        <Spinner />
                    }
                </Row>
            </Col>
        </Row>
      </Col>
    )
}