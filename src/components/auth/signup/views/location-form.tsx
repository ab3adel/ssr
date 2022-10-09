
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {useTranslation} from 'react-i18next'
import {InputWithIcon} from '../../../tools/input/inputIcon'
import {Select} from '../../../tools/select/select'
import location from '../../../../images/auth/location-icon.svg'
import {apis} from '../../../tools/apis/apis'
import axios from '../../../tools/apis/axios'
import {useEffect, useState,useMemo} from 'react'
import {GoogleMap} from '../../../tools/google-map/google-map'
import {InitialValues,iTouched,iErrors} from '../initial-values'
let countries=['Syria','Kwait']

interface iProps {type:'User' | 'Commercial'
                 ,touched:Partial<iTouched>
                 ,errors:Partial<iErrors>
                 ,values:Partial<InitialValues>
                 ,handleBlur:Function
                 ,setValue:Function
                }
export const LocationForm =({
                       type
                       ,touched
                       ,errors,values,setValue
                       ,handleBlur
                                }:iProps)=>{
    const [countries,setCountries]=useState({data:[],options:[]})
    const [selectedCountry,setSelectedCountry]=useState(0)
    const [area,setArea]=useState({data:[],options:[]})
    const [show,setShow]=useState(false)
    const {t,i18n}=useTranslation()

useEffect(()=>{
    axios.get(apis.countries)
          .then(res=>{
            let options= res.data.payload.map((ele:any)=>{
                    if (i18n.language=== 'en'){
                        return {name:ele.name.en,value:ele.id}
                    }
                    else {
                        return {name:ele.name.ar,value:ele.id}
                    }
        
            })
            setCountries(pre=>({...pre,data:res.data.payload,options}))
            
        })
          .catch(err=>console.log(err))

},[])
 useEffect(()=>{
     axios.get(apis.country_id(selectedCountry))
           .then(res=>{
            let options= res.data.payload.map((ele:any)=>{
                if (i18n.language=== 'en'){
                    return {name:ele.name.en,value:ele.id}
                }
                else {
                    return {name:ele.name.ar,value:ele.id}
                }
    
        })
            setArea(pre=>({data:res.data.payload,options:options}))
           })
           .catch(err=>console.log(err))
 },[selectedCountry])
const hanldeArea=(value:string)=>{
    if (value) {

        setValue('area_id',parseInt(value))
    }
}
const handleField=(field: keyof InitialValues,value:string)=>{
  
    if (typeof(setValue) === 'function'){
        if (Array.isArray(values[field]) ){
            let arr= [...(values[field] as Array<any>)]
            arr.push(value)
            setValue(field,arr)
        }
        else {

            setValue(field,value)
        }
    }
}

    if (type=== 'Commercial'){
    return (
        <Row className='gy-2 locationForm'>
            <Col xs={12}>
                <Row className="locationContainer gy-1">

                    <Col sm={4} xs={6}>
                        <Select 
                        options={countries.options}
                        tempSelect={setSelectedCountry}
                        label={t('Country')}
                        handleBlur={handleBlur}
                        name="country"
                        error={errors.area_id as string}
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                        <Select 
                        options={area.options}
                        name="area_id"
                        label={t('Area')}
                        setSelect={handleField}
                        touched={touched.area_id as boolean}
                        error={errors.area_id as string}
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Block")}
                        name="Block"
                        id="Block"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Avenue")}
                        name="Avenue"
                        id="Avenue"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Street")}
                        name="Street"
                        id="Street"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Building")}
                        name="Building"
                        id="Building"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label={t("Floor")}
                        name="Floor"
                        id="Floor"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label="Flat"
                        name="Flat"
                        id="Flat"
                        type="text"
                        required={false}
                    
                        />
                        
                    </Col>
                    <Col sm={4} xs={6}>
                    <InputWithIcon 
                        label="PACIID"
                        name="PACIID"
                        id="PACIID"
                        type="text"
                        required={false}
                        />
                        
                    </Col>
                </Row>

            </Col>
            {
                type==='Commercial' &&
            (
            <Col xs={12}>
                <div className="mapBtn"
                onClick={()=>setShow(true)}>
                   
                        <img src={location} />
                        <span>{t("SetLocation")}</span>
                   
                </div>
            </Col>
            )
            }
            <GoogleMap show={show} setShow={()=>setShow(false)} />
        </Row>
    )
        }
       
    return (
            <Row className='gy-2 locationForm justify-content-center'>
                <Col xs={12} sm={8}>
                    <Row className="locationContainer gy-1 ">

                        <Col  xs={12}>
                            <Select 
                          options={countries.options}
                          tempSelect={setSelectedCountry}
                          label={t('Country')}
                          handleBlur={handleBlur}
                          name="country"
                            />
                            
                        </Col>
                        <Col  xs={12}>
                            <Select 
                        options={area.options}
                        label={t('Area')}
                        name="area_id"
                        setSelect={handleField}
                        touched={touched.area_id as boolean}
                        error={errors.area_id as string}
                        handleBlur={handleBlur}

                            />
                            
                        </Col>
                    </Row>
                </Col>     
            </Row>       
            )
        
    }