import { Col, Container } from "react-bootstrap";
import {useFormik} from 'formik'
import {LargeView} from './lg-view'
import {SmallView} from './sm-view'
import './search.scss'
import { useContext, useEffect, useState } from "react";

import { useGetPropertyType } from "../tools/apis/useGetPropertyType";
import { useGetOffersType } from "../tools/apis/useGetOffersType";
import { useGetPropertySites } from "../tools/apis/useGetPropertySites";
import { useGetCategories } from "../tools/apis/useGetCategories";
import { useGetArea } from "../tools/apis/useGetArea";
import { getLocalStorage } from "../tools/getLocalstorage";
import SettingContext from '../tools/context/setting-context/setting-context'
import { iOption } from "../tools/interface";
import {useNavigate} from 'react-router-dom'
import {FilteredPostsParams} from '../store'
import {useRecoilState} from 'recoil'
export interface iProps {
  values:any
  ,setFieldValue:Function
  ,offersType: iOption[];
  pricesType: iOption[];
  propertySites: iOption[];
  categories: iOption[];
  tags: iOption[];
  area:iOption[],
  propertyTypes:any[],
  handleChange:(e:React.ChangeEvent<any>)=>void,
  startSearching:Function
}

const SearchPage =()=>{
    const {mobileView}=useContext(SettingContext)
    const [propertyTypes, setPropertyTypse] = useState<any[]>([]);
    const [offersType, setOffersType] = useState<any[]>([]);
    const [pricesType, setPricesType] = useState<any[]>([]);
    const [propertySites, setPropertySites] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
 
  const [tags, setTags] = useState<any[]>([]);
  const [area, setArea] = useState<iOption[]>([]);
  const navigate= useNavigate()
 

    const {
        propertyTypeLoading,
        propertyTypesData,
        getPropertyType,
        propertyTypesError,
      } = useGetPropertyType();
      const { getOffers, offersTypeData, offersTypeError, isOffersTypeLoading } =
        useGetOffersType();
      const {
        getPropertySites,
        propertySitesData,
        propertySitesError,
        isPropertySitesLoading,
      } = useGetPropertySites();
      const {
        getCategories,
        isCategoriesLoading,
        CategoriesError,
        categoriesData,
        genericTagsData,
        isGenericTagsLoading,
        genericTagsError,
        getGenericTags
      } = useGetCategories();
      const { areaData, areaError, isAreaLoading, getArea } = useGetArea();
let formik=useFormik({
    initialValues:{
       priceRange:{min:10,max:100000},
       tag_id:'',
       areaRange:{min:100,max:1000},
       offer_type_id: 0,
       area_id: "",
       property_type_id: "",
       price_type_id: "",
       property_site_id: "",
       category_id: 0,
       location_link: "",
       latitude: "",
       longitude: "",
       space: "",
       price: "",
       number_of_rooms: 0,
       number_of_bathrooms: 0,
      

    },
    onSubmit:()=>{}
})

useEffect(() => {
    getPropertyType();
    getOffers(0);
    getPropertySites();
    getCategories(1,99)
    getArea();
    getGenericTags()
   
  }, []);
  useEffect(() => {
    if (!propertyTypesError) {
      if (propertyTypesData.length > 0) {
        let data = propertyTypesData.map((ele) => {
          let type = {
            title: { ar: ele.name.ar, en: ele.name.en },
            type_id: ele.id,
            value: [],
          };
          if (ele.sub_types.length > 0) {
            ele.sub_types.map((elem: any) => {
              (type["value"] as any).push({
                title: { ar: elem.name.ar, en: elem.name.en },
                id: elem.id,
              });
            });
          }
          return type;
        });

        if (data.length > 0) {
          setPropertyTypse(data);
          // formik.setFieldValue(
          //   "property_type_id",
          //   (data[0].value[0] as any).id
          // );
        }
      }
    }
  }, [propertyTypeLoading]);
  useEffect(() => {
    if (!offersTypeError) {
      if (!formik.values.offer_type_id) {
        if (offersTypeData && (offersTypeData as any[]).length > 0) {
          let offers = (offersTypeData as any[]).map((ele: any) => {
            return { title: { en: ele.name.en, ar: ele.name.ar }, id: ele.id };
          });
          if (offers.length > 0) {
            setOffersType(offers);
          }
        }
      } else {
        let prices = (offersTypeData as any[]).map((ele: any) => {
          return { title: { en: ele.name.en, ar: ele.name.ar }, id: ele.id };
        });

        setPricesType(prices);
      }
    }
  }, [isOffersTypeLoading]);
  useEffect(() => {
    if (!propertySitesError) {
      if (propertySitesData.length > 0) {
        let data = propertySitesData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, id: ele.id };
        });
        setPropertySites(data);
      }
    }
  }, [isPropertySitesLoading]);
  useEffect(() => {
    if (!CategoriesError && !formik.values.category_id ) {
      if (categoriesData && categoriesData.length > 0) {
        let data = categoriesData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
        });
        setCategories(data);
       
      }
    }
    if (!CategoriesError && formik.values.category_id ) {
      if (categoriesData && categoriesData.length > 0) {
        let data = categoriesData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
        });
        setTags(data);
       
      } else {
        setTags([]);
       
      }
    }
  }, [isCategoriesLoading]);
  useEffect(()=>{
   if (!genericTagsError && genericTagsData && genericTagsData.length>0) {


       let data = genericTagsData.map((ele) => {
         return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
       });
       setTags(data);
      
     
   }
    
  },[isGenericTagsLoading])
  useEffect(() => {
    if (!areaError) {
      if (areaData && areaData.length > 0) {
        let data = areaData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
        });
        setArea(data);
      }
    }
  }, [isAreaLoading]);
  useEffect(()=>{
    if (formik.values.category_id) {
      getCategories(0,formik.values.category_id)
    }
   
  },[formik.values.category_id])
  const filteredPosts=()=>{
    let readableObj:any={}
    
    let values = formik.values as any
    let url=`/filteredposts/page=1?`
    Object.keys(formik.values).map((ele)=>{
      if (values[ele] && ele !== 'priceRange' && ele !=='areaRange') {
        
        url += `&${ele}=${values[ele]}`
        if (ele === 'property_site_id') {
          readableObj['property_site_id']=propertySites.filter(elem=>elem.id === values[ele])[0]
        }
        if (ele==='offer_type_id') {
          readableObj['offer_type_id']=offersType.filter(elem=>elem.id === values[ele])[0]
        }
        if (ele==='property_type_id'){
          readableObj['property_type_id']=propertyTypes.map(elem=>{
           return elem.value.filter((subElem:any)=>subElem.id ===values[ele])[0]
          }).filter(ele=>ele)[0]
        }
        if (ele=== 'area_id') {
          readableObj['area_id']=area.filter(elem=>elem.value === values[ele])[0]
        }
        if (ele==='tag_id') {
          readableObj['tag_id']=tags.filter(elem=>elem.value === values[ele])[0]
        }
        if (ele==='category_id'){
          readableObj['category_id']=categories.filter(elem=>elem.value===values[ele])[0]
        }
        if (ele==='number_of_rooms') {
          readableObj['number_of_rooms']={title:{en:`rooms ${values[ele]}`,ar:`${values[ele]} غرف`},value:values[ele]}
        }
        if (ele==='number_of_bathrooms') {
          readableObj['number_of_bathrooms']={title:{en:`${values[ele]} bathrooms`,ar:`${values[ele]} حمام`},value:values[ele]}
        }
      }
      
    })
    url+=
     `${ values['priceRange']['max'] !== 100000 || values['priceRange']['min'] !== 10 ?`&price_to=${values['priceRange']['max']}&price_from=${values['priceRange']['min']}`:''} `
     +`${values['areaRange']['min'] !== 100 || values['areaRange']['max'] !== 1000?`&area_from=${values['areaRange']['min']}&area_to=${values['areaRange']['max']}`:''}`
    
     sessionStorage.setItem('search_params',JSON.stringify(readableObj) )
      navigate(url) 
  }
 
    return (
        <Container className='searchContainer' >
            {
                mobileView?
                <SmallView 
                values={formik.values}
                setFieldValue={formik.setFieldValue}
                 categories={categories}
                 offersType={offersType}
                 pricesType={pricesType}
                 propertySites={propertySites}
                 tags={tags}
                 area={area}
                 handleChange={formik.handleChange}
                 propertyTypes={propertyTypes}
                 startSearching={filteredPosts}

              />:
              <LargeView 
              values={formik.values}
              setFieldValue={formik.setFieldValue}
              categories={categories}
              offersType={offersType}
              pricesType={pricesType}
              propertySites={propertySites}
              tags={tags}
              area={area}
              handleChange={formik.handleChange}
              propertyTypes={propertyTypes}
              startSearching={filteredPosts}
     
              />

            }
        
      
        </Container>
    )
}
export default SearchPage;