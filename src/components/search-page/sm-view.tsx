


import {Col,Row} from 'react-bootstrap'
import {RangeSlider} from '../tools/range-with-input/range-with-input'
import {Select} from '../tools/float-label-group/select/select'
import {Input} from '../tools/float-label-group/input/input'
import {iProps} from './index'
import {useTranslation} from 'react-i18next'
import {X,CodeSquare} from 'react-bootstrap-icons'
import { Tabs } from '../tools/tabs/tabs'
import { Badge } from '../tools/badge/badge'
import {GreenButton} from '../tools/buttons/green-button'
let offer_type=[
               {title:{en:'item 1',ar:'item 1'},id:1}
               ,{title:{en:'item 2',ar:'item 2'},id:2}
               ,{title:{en:'item 3',ar:'item 3'},id:3}
               ,{title:{en:'item 4',ar:'item 4'},id:4}
            ]
let property_sites= [
    {title:{en:'item 1',ar:'item 1'},id:1}
    ,{title:{en:'item 2',ar:'item 2'},id:2}
    ,{title:{en:'item 3',ar:'item 3'},id:3}
    ,{title:{en:'item 4',ar:'item 4'},id:4}
]      
let property_types= [
    {title:{en:'type1',ar:'typ1'}
    ,type_id:1,value:[
     {title:{en:'sub_type2',ar:'type2'},id:3}
    ,{title:{en:'sub_type3',ar:'type3'},id:4}
    ,{title:{en:'sub_type4',ar:'type3'},id:5}
    ,{title:{en:'sub_type5',ar:'type3'},id:6}
]
}
    ,{title:{en:'type2',ar:'typ12'}
    ,type_id:2,value:[{title:{en:'sub_type5',ar:'type2'},id:5}
    ,{title:{en:'sub_type4',ar:'type3'},id:6}
          
        ]} ]

export const SmallView= ({setFieldValue,values}:iProps)=>{
    const {t,i18n}=useTranslation()
    return (
        <Col xs={12} style={{background:'white'}} className="d-block d-sm-none px-3 py-3 rounded">
            <Row className="gy-4">
                <Col xs={12}>
                    <Select 
                        label={t("Category")}
                        options={[{title:{en:'type1',ar:'type1'},value:1}]}
                        />
                </Col>
                <Col xs={12} className="p-2 box">
                    <Col xs={12}>
                        <Select 
                        label={t("Post Tags")}
                        options={[{title:{en:'tag1',ar:'tag1'},id:1}]} 
                        
                        name="tags_ids"
                        
                        />
                    </Col>
                    
                        <Col xs={12}>
                            <Row className="gx-2">
                            {
                                values.tags_ids.length >0 ?
                                values.tags_ids.map((ele:any,index:number)=>{
                                    // let item= tags.filter(elem=>elem.value === parseInt(ele))[0]
                                    if (true)
                                    {  return (
                                        <Col xs={4} key={index} >
                                            <div className='mybadge'>
                                                <span >
                                                {i18n.language ==='en' ? 'Tag' : 'ar'}
                                                </span>
                                                <div className="icon"
                                                >
                                                    <X
                                                    fontWeight={'bold'}
                                                    color={'black'}
                                                    fontSize='large'
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                                }) 
                            :''
                                }
                            </Row>
                    </Col>
                </Col>
                <Col xs={12}>
                            <Col xs={12}>
                                <span className="font-weight-bolder"> {t("PropertyType")}</span>
                            </Col>
                            <Tabs 
                            data={property_types}
                            setFieldValue={()=>{}}
                            name="property_type_id"
                            />
                </Col>
                <Col xs={12}>
                    <Select 
                    label={t("Area")}
                    options={[{title:{en:'area',ar:'area'},value:1}]}
                    />
                </Col>
                <Col xs={12}>
                    <RangeSlider 
                    label={t("PriceRange")}
                    setValue={setFieldValue}
                    min={1000}
                    max={1000000}
                    minVal={values.priceRange.min}
                    maxVal={values.priceRange.max}
                    name="priceRange"
                    unit={"KWD"}
                    />
                </Col>
                <Col xs={12} >
                    <Badge 
                    items={property_sites}
                    label={t("PropertySites")}
                    name="property_site_id"
                    selected={values.property_site_id}
                    setSelected={setFieldValue}
                    />
                </Col>
                <Col xs={12} >
                    <Badge 
                    items={offer_type}
                    label={t('OfferType')}
                    name="offer_type_id"
                    selected={values.offer_type_id}
                    setSelected={setFieldValue}
                    />
                </Col>
                <Col xs={12}>
                    <RangeSlider 
                    label={t("AreaRange")}
                    setValue={setFieldValue}
                    min={200}
                    max={1000}
                    minVal={values.areaRange.min}
                    maxVal={values.areaRange.max}
                    name="areaRange"
                    unit={ (<>m<sup>2</sup></>)}
                    />
                </Col>
                <Col xs={12}>
                        <Select 
                        label={t('Direction')}
                        options={[{title:{en:'West',ar:'west'},value:1},{title:{en:'East',ar:'East'},value:2}]}
                        />
                </Col>
                <Col xs={12}>
                        <Row className='justify-content-center gy-3'>

                            <Col xs={10}>
                            <Input 
                                label={t("Bathrooms")}
                                numberControl={true}

                            />
                            </Col>
                            <Col xs={10}>
                                <Input 
                                label={t("Rooms")}
                                numberControl={true}
                                />
                            </Col>
                        </Row>
                </Col>
                <Col xs={12} className='d-flex justify-content-center'>
                    <GreenButton label={t("Search")} />
                </Col>
            </Row>

        </Col>
    )
}