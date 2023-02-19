import './predefined-pictures.scss'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import {GreenButton} from '../buttons/green-button'
import {WhiteButton} from '../buttons/white-button'
interface iProps {images?:any [],setValue:Function
    ,name:string,hide:Function,open:boolean}
export const PredefiendPicturesModal=({images,name,setValue,hide,open}:iProps)=> {
    const [selected,setSelected]=useState<number[]>([])
    const handleChange=()=>{
        setValue(selected)
        hide()
    }
    const setImageAsSelected=(id:number)=>{
      if (!(selected.includes(id))){

        let arr= [...selected]
        arr.push(id)
        setSelected(arr)
      }
      else {
        let arr= selected.filter(ele=>ele !== id)
        setSelected(arr)
      }
    }
    return (
      <Modal
        show={open}
        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='predefinedPicturesContainer'
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Images :
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container >
            <Row className="imagesContainer gy-1 gx-2">
                {
                    images && images.length>0?
                    images.map((ele,index)=>{
                        return (
                            <Col xs={6} sm={4} key={index}
                            onClick={()=>setImageAsSelected(ele.id)}>
                                <div className={selected.includes(ele.id)? "selected image":"image"}>
                                    <img src={ele.path} />
                                </div>
                            </Col>
                        )
                    })
                    :
                    <Col xs={12}>
                        <span className='fw-bold h5'>
                            You don't have images to show !!
                        </span>
                    </Col>
                }
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container className="">
            <Col xs={12} sm={10} className="mx-auto">

              <Row className="justify-content-between">
                <Col xs={6} sm={5}>
                  <WhiteButton fun={()=>hide()} label="Close" />
                </Col>
                <Col xs={6} sm={5}>
                <GreenButton label='Done' fun={()=>handleChange()} />
                </Col>
              </Row>
            </Col>
          </Container>
          
        </Modal.Footer>
      </Modal>
    );
  }