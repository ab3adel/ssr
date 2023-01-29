import './text-accordion.scss'

import Col from 'react-bootstrap/Col'
import {useEffect, useState} from 'react'
import arrow from '../../../images/post-details/down-arrow.svg'
import { useTranslation } from 'react-i18next'

interface iProps {description:string}

export const TextAccordion =({description}:iProps)=>{
const [expand ,setExpand]=useState(false)
const {t} =useTranslation()
useEffect(()=>{
    let target = document.querySelector('#textarea_description') as HTMLTextAreaElement

    if (expand) {
        target.style.height=`${target.scrollHeight}px`
    }
},[expand])

    return (
        <div className="textAccordionContainer">
                    {
                        description?.length >200 ?
                        !expand?
                    <Col xs={12} className="textAccordion px-1">
                        <Col xs={12} className="textRistrected text px-1">

                           { description.slice(0,200) + ' . . .'}
                        </Col>
                        <Col xs={5} className="btn"
                        onClick={()=>setExpand(!expand)}>
                            <span>{t("ReadMore")}</span>
                            <img src={arrow} className="down icon" />
                        </Col>
                    </Col>
                        
                        :
                        <Col xs={12} className="textAccordion px-1">

                            <Col xs={12}  className="textExpanded text px-1 pb-1"
                            >
                                <textarea  value={description} 
                                 contentEditable={false}
                          
                                 id={'textarea_description'}
                                 disabled={true}
                                />
                                 
                                
                           
                            </Col>
                            <Col xs={5} className="btn mt-1"
                            onClick={()=>setExpand(!expand)}>
                                <span>{t("ReadLess")}</span>
                                <img src={arrow} className="up icon"/>
                            </Col>                                 
                        </Col>
                        :
                        
                        <Col xs={12} className="px-1 ">

                             <textarea  value={description} 
                                 contentEditable={false}
                                 id={'textarea_description'}
                                  rows={6}
                                 disabled={true}
                                />
                        </Col> 
                    }
        </div>
    )
}