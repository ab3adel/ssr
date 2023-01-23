import { Col, Row } from 'react-bootstrap'
import  Slider from '../multi-range-slider/multi-range'
import {Input} from '../float-label-group/input/input'
import {useTranslation} from 'react-i18next'
import './range-slider.scss'

interface iProps {min:number,max:number,setValue:Function,name:string
    ,minVal:number,maxVal:number,label:string,unit:string |JSX.Element,
    error:any,setFieldTouched:Function,handleBlur:Function
}
export const RangeSlider=({min,max,setValue,name,minVal,maxVal,label,unit,error,setFieldTouched,handleBlur}:iProps)=>{
    const {t} =useTranslation()
    const onChange=(value:{min:number,max:number})=>{
     
    setValue(name,value)

    }

    return (
        <Col xs={12} className={`rangeSliderContainer `}
      >
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
                onBlur={handleBlur}
                setFieldTouched={setFieldTouched}
                />
            </Col>
            <Col xs={5}>
                <Input
                 type='number'
                 unit={unit} 
                 value={minVal.toString()}
                 onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                    setFieldTouched(name,true)
                    onChange({min:Number(event.target.value),max:maxVal})
                    
                 }}
            

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
                 onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
                   setFieldTouched(name,true)
                   onChange({max:Number(event.target.value),min:minVal})
                        
                     }}
                  
                />
            </Col>

          </Row>
         { error && (error['min'] || error['max'])&&
         <div className='invalid'>
            {error['min'] || error['max']}
          </div>
          }
        </Col>
    )
}