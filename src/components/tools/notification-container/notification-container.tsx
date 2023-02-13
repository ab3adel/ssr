import './notification-container.scss'
import {useEffect, useRef} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import React from 'react'
import { useTranslation } from 'react-i18next'

interface iProps {
    show:boolean
    ,left:number
      ,top:number
    ,RenderElement:any
    ,data:any[]
    ,elementClicked:Function
    
}
 const NotificationContainer =({show,left,top,data,RenderElement,elementClicked}:iProps)=>{
const elem=useRef().current
const {i18n}=useTranslation()
useEffect(()=>{
   let elem= document.querySelector('#notification-container') as HTMLDivElement
   if (elem) {

       elem.style.left=`${left}px`
       elem.style.top=`${top}px`
   }

},[left,top,show])
    return (
<>
        {show &&
        <div className='notification-container' id={'notification-container'}>
            <Container>
                <Row className='gy-2'>
                    {
                        data && data.length>0?
                        data.map((ele:any,index:number)=>
                         <React.Fragment key={index}>
                         <RenderElement ele={ele} key={index} onClick={()=>elementClicked(ele)}/>
                         <div className='spacer' />
                         </React.Fragment>
                         )
                        : <span>{
                            i18n.language==='en'?
                            ' There is nothing to show':
                            'لا يوجد محادثات'
                            }
                            </span>
                    }
                </Row>
            </Container>
        </div>
    }
</>
    )
}
export default NotificationContainer;