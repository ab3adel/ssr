import { Col, Row } from 'react-bootstrap'
import  Slider from '../multi-range-slider/multi-range'
import {Input} from '../float-label-group/input/input'
import {useTranslation} from 'react-i18next'


interface iProps {min:number,max:number,setValue:Function,name:string
    ,minVal:number,maxVal:number,label:string,unit:string |JSX.Element}
export const RangeSlider=({min,max,setValue,name,minVal,maxVal,label,unit}:iProps)=>{
    const {t} =useTranslation()
    const onChange=(value:{min:number,max:number})=>{
     
    setValue(name,value)

    }

    return (
        <Col xs={12} className="">
          <Row className='gy-1'>
            <Col xs={12} className="h6 fw-bold d-flex">
                {label}
            </Col>
            <Col xs={12}>
                <Slider 
                min={min}
                max={max}
                onChange={onChange}
                minVal={minVal}
                maxVal={maxVal}
                name={name}
                />
            </Col>
            <Col xs={5}>
                <Input
                 type='number'
                 unit={unit} 
                 value={minVal.toString()}

                />

            </Col>
            <Col xs={2} className='d-flex align-items-center justify-content-center fw-bold'>
                {t('To')}
            </Col>
            <Col xs={5}>
            <Input
                 type='number'
                 unit={unit}
                 value={maxVal.toString()}
                 
                />
            </Col>
          </Row>
        </Col>
    )
}