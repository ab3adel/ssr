import './pagination.scss'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {ChevronDoubleRight ,ChevronDoubleLeft} from 'react-bootstrap-icons'
import { useState } from 'react'

interface iProps {currentPage:number,lastPage:number,setPage:Function}
export const Pagination =({currentPage,lastPage,setPage}:iProps)=>{
    const [part,setPart]=useState({number:0,max:Math.ceil(lastPage/5)})
    let arr= new Array(lastPage).fill(null).map((ele,index)=>index+1)
    
    const handlePart=(dir:string)=>{
        let current=part.number
        if (dir === 'next') {
          
            if (current < part.max -1){

                setPart(pre=>({...pre,number:current+1}))
            }
        }
        else {
          
            if (current > 0){

                setPart(pre=>({...pre,number:current-1}))
            }
        }

    }

    return (
        <Col xs={12} className="d-flex justify-content-center">
        <Col xs={12}
        className="paginationContainer">
            <Col xs={2}
            className="d-flex justify-content-center align-items-center">
                <ChevronDoubleRight
                 onClick={()=>handlePart('prev')} 
                />
            </Col>
            <Col xs={8} className="py-2">

                <Row className="justify-content-center align-items-center gx-1">
                    {
                        arr.slice(5*part.number,5+(part.number*5)).map((ele,index:number)=>
                        <Col xs={2} key={index}
                         className= {ele <= lastPage? ele === currentPage? "square active":"square normal":'square inactive'}
                            onClick={
                                ele >lastPage?
                                ()=>{}:
                                ()=>setPage(ele)
                            }
                                >
                                 {ele}
                        </Col>
                        )
                    }
                
                </Row>
            </Col>
            <Col xs={2}
            className="d-flex justify-content-center align-items-center">
                <ChevronDoubleLeft 
                onClick={()=>handlePart('next')}/>
            </Col>
        </Col>
        </Col>  
    )
}