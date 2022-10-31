import { Col, Container } from "react-bootstrap";
import {useFormik} from 'formik'
import {LargeView} from './lg-view'
import {SmallView} from './sm-view'
import './search.scss'
import { useEffect, useState } from "react";
export interface iProps {values:any,setFieldValue:Function}

const SearchPage =()=>{
let formik=useFormik({
    initialValues:{
       priceRange:{min:1000,max:1000000},
       tags_ids:['item 1','item 2'],
       areaRange:{min:200,max:1000}
    },
    onSubmit:()=>{}
})
const [mobileView,setMobileView]=useState(false)
useEffect(()=>{
    console.log(window)
if (window.innerWidth <567) setMobileView(true)
},[])

    return (
        <Container className='searchContainer' >
            {
                mobileView?
                <SmallView 
                values={formik.values}
                setFieldValue={formik.setFieldValue}
              />:
              <LargeView 
              values={formik.values}
              setFieldValue={formik.setFieldValue}
     
              />

            }
        
      
        </Container>
    )
}
export default SearchPage;