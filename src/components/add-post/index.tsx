import Col from "react-bootstrap/Col";
import { Formik, FormikProvider, useFormik, validateYupSchema } from "formik";
import "./add-post.scss";
import axios from "../tools/apis/axios";
import { apis } from "../tools/apis/apis";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState, useContext, useRef } from "react";
import { LargeView } from "./lg-view";
import { SmallView } from "./sm-view";
import { useGetPropertyType } from "../tools/apis/useGetPropertyType";
import { useGetOffersType } from "../tools/apis/useGetOffersType";
import { useGetPropertySites } from "../tools/apis/useGetPropertySites";
import { useGetCategories } from "../tools/apis/useGetCategories";
import { useGetArea } from "../tools/apis/useGetArea";
import notificationContext from "../tools/context/notification/notification-context";
import { iOption, iToken, iValue } from "../tools/interface";
import { AddPostSchema } from "../tools/validation";
import authContext from "../tools/context/auth-context/auth-context";
import { useParams } from "react-router-dom";
import { useGetPosts } from "../tools/apis/useGetPosts";
import { useRecoilState } from "recoil";
import { Posts } from "../store";
import { PredefiendPicturesModal } from "../tools/predefined-pictures-modal/predefined-pictures";
import { useGetPredefinedPictures } from "../tools/apis/useGetPredefinedPictures";
import SettingContext from "../tools/context/setting-context/setting-context";
import { getLocalStorage } from "../tools/getLocalstorage";
import {useNavigate} from 'react-router-dom'
import { iFields } from "../auth/signup/signup";
import {postInitializer} from './initialvalues'
interface iPhoneNumber {
  international_code: string;
  phone: string;
}
export interface iProps {
  postTags: any[];
  propertyTypes: any[];
  t: Function;
  checked: { profile_photo_as_image: boolean; profile_photo_primary: boolean };
  setChecked: Function;
  images: string[];
  setImages: Function;
  phoneNumbersArray: string[] | any[];
  setPhoneNumbersArray: Function;
  phoneNumber: string;
  setPhoneNumber: Function;
  primary: number;
  setPrimary: Function;
  deleteTag: Function;
  handleTitle: Function;
  handlePhone: Function;
  addPhone: Function;
  resetPhone: Function;
  deleteNumber: Function;
  values: any;
  setFieldValue: Function;
  errors: any;
  setFieldTouched:Function;
  handleBlur: Function;
  offersType: iOption[];
  pricesType: iOption[];
  propertySites: iOption[];
  categories: iOption[];
  tags: iOption[];
  language: string;
  addPost: Function;
  handleChange: Function;
  area: iOption[];
  role: number;
  addTag: Function;
  selectePropertySubTypeId: Function;
  handleAvailableServices: Function;
  touched: any;
  addPostLoading: boolean;
  setPredefinedPicturesModal: Function;
  propertySubTypes: iOption[]
}

let postTags = [
  { name: "cleaning", value: 0 },
  { name: "Move", value: 1 },
  { name: "Maintaining", value: 2 },
];

const AddPost = () => {
  const { post_id, page } = useParams();
  const navigate =useNavigate()
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState({
    profile_photo_as_image: false,
    profile_photo_primary: false,
  });
  const [images, setImages] = useState<any[]>([]);
  const [phoneNumbersArray, setPhoneNumbersArray] = useState<any[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [primary, setPrimary] = useState(0);
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
  } = useGetCategories();
  const { areaData, areaError, isAreaLoading, getArea } = useGetArea();
  const {
    getPredefinedPictures,
    predefinedPicturesData,
    predefinedPicturesError,
    isPredefinedPicturesLoading,
  } = useGetPredefinedPictures();
  const { setNotify } = useContext(notificationContext);
  const [propertyTypes, setPropertyTypse] = useState<any[]>([]);
  const [propertySubTypes,setPropertySubTypes]=useState<any[]>([])
  const [offersType, setOffersType] = useState<any[]>([]);
  const [pricesType, setPricesType] = useState<any[]>([]);
  const [propertySites, setPropertySites] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [ token, setToken ] = useState({role:-1,token:''});
  const [area, setArea] = useState<iOption[]>([]);

  const [addPostLoading, setAddPostLoading] = useState(false);
  const { getPosts, getPostsData, getPostsError, isGetPostsLoading } =
    useGetPosts();
  const [storedPosts,setStoredPosts] = useRecoilState(Posts);
  const [openPredefinedPicturesModal, setPredefinedPicuturesModal] =
    useState(false);
  const [predefinedImages, setPredefinedImages] = useState<any[]>([]);
const [enableFieldsUpdatedRegister,setEnableFieldsUpdatedRegister]=useState(false)
const fieldsUpdatedRegister=useRef<any>([])
const {mobileView} =useContext(SettingContext)

  const formik = useFormik({
    initialValues:
    postInitializer(
      enableFieldsUpdatedRegister&& Boolean(post_id)
    ,enableFieldsUpdatedRegister? 
    getPostsData && getPostsData.data? getPostsData.data[0]:{}:{}),
    onSubmit: () => {},
    validationSchema: AddPostSchema(token.role),
    enableReinitialize:true
    
  });
  const customSetFieldValue=(name:string,value:any)=>{
    
    if (enableFieldsUpdatedRegister){
     
    
     if (!fieldsUpdatedRegister.current.includes(name)) fieldsUpdatedRegister.current.push(name)
    }
    formik.setFieldValue(name,value)
  }
  const customHanldChange=(e:React.ChangeEvent)=>{
    
    if (enableFieldsUpdatedRegister){
    
      let target =e.target as HTMLInputElement
     if (fieldsUpdatedRegister.current.includes(target.name)) fieldsUpdatedRegister.current.push(target.name)
    }
    formik.handleChange(e)
  }
  const deleteTag = (id: string) => {
    let values = formik.values.tags_ids.filter((ele) => ele !== id);

    customSetFieldValue("tags_ids", values);
  };
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = { ...formik.values.title };
    newVal.ar = event.target.value;
    newVal.en = event.target.value;
    customSetFieldValue("title", newVal);
  };
  const handlePhone = (value: string) => {
    setPhoneNumber(value);
  };
  const addPhone = (value: iPhoneNumber) => {
   
    let phons = [...formik.values.phone_numbers].filter((ele) => ele.phone);
    let newNumbers = [...phoneNumbersArray];
    phons.push(value);
    newNumbers.push(value.phone);
    customSetFieldValue("phone_numbers", phons);

    setPhoneNumbersArray(newNumbers);
  };
  const addTag = (name: string, value: number[]) => {
    if (value.length > 3) return;
    customSetFieldValue(name, value);
  };
  const resetPhone = () => {
    setPhoneNumber("");
  };
  const deleteNumber = (num: number) => {
    let newNumbers = phoneNumbersArray.filter((ele, index) => index !== num);
    let phons = formik.values.phone_numbers.filter(
      (ele: any, index) => index !== num
    );
    if (typeof(phoneNumbersArray[num] !== 'string')) {
      let deleted_phones:any[]= [...formik.values.phone_numbers_to_delete]
      let id =phoneNumbersArray[num].id
      if (!deleted_phones.includes(id) && id) deleted_phones.push(id)
     customSetFieldValue('phone_numbers_to_delete',deleted_phones)
    }
    setPhoneNumbersArray(newNumbers);
   customSetFieldValue("phone_numbers", phons);
   formik.setFieldTouched('phone_numbers',true)
  };
  const selectePropertySubTypeId = (name: string, subType: number) => {
   customSetFieldValue(name, subType);
  };
  const handleAvailableServices = (name: string, value: iValue) => {
   customSetFieldValue(name, value);
  };
  const handleSelectPredefinedImages = (arr: number[]) => {
    let newArr = arr.map((ele, index) => {
      if (index === 0) {
        return { id: ele, primary: true };
      } else {
        return { id: ele, primary: false };
      }
    });
   customSetFieldValue("pre_defined_images", newArr);
  };
  const checkError = () => {
    Object.keys(formik.errors).forEach((element) => {
      formik.setFieldTouched(element, true);
    });
   
    return Object.keys(formik.errors).length > 0;
  };

  const addPost = () => {
    console.log(checkError())
    if (checkError()) return;
    setAddPostLoading(true);
    let formData = new FormData();
    if (formik.values.title.ar || formik.values.title.en) {
      formData.append("title[en]", formik.values.title.en);
      formData.append("title[ar]", formik.values.title.ar);
    }
    formData.append("area_id", formik.values.area_id);
    if (token.role === 3) {
      formData.append("property_type_id", formik.values.property_type_id);
      formData.append(
        "offer_type_id",
        JSON.stringify(formik.values.offer_type_id)
      );

      formData.append("price_type_id", formik.values.price_type_id);

      formData.append("property_site_id", formik.values.property_site_id=== 0?'':formik.values.property_site_id);
      formData.append("location_link", formik.values.location_link);
      formData.append("latitude", formik.values.latitude);
      formData.append("longitude", formik.values.longitude);
      formData.append("number_of_rooms", formik.values.number_of_rooms);
      formData.append("number_of_bathrooms", formik.values.number_of_bathrooms);
      formData.append("area", formik.values.space);
    }
    if (token.role !== 3) {
      formData.append("category_id", JSON.stringify(formik.values.category_id));
    }
    if (formik.values.tags_ids.length > 0) {
      formik.values.tags_ids.map((ele, index) => {
        formData.append(`tags_ids[${index}]`, ele);
      });
    }

    if (formik.values.description.ar || formik.values.description.en) {
      formData.append("description[en]", formik.values.description.en);
      formData.append("description[ar]", formik.values.description.ar);
    }

    if (
      formik.values.descriptive_address.ar ||
      formik.values.descriptive_address.en
    ) {
      formData.append(
        "descriptive_address[ar]",
        formik.values.descriptive_address.ar
      );
      formData.append(
        "descriptive_address[en]",
        formik.values.descriptive_address.en
      );
    }

    if (
      formik.values.services_available.ar ||
      formik.values.services_available.en
    ) {
      formData.append(
        `services_available[ar]`,
        formik.values.services_available.ar
      );
      formData.append(
        `services_available[en]`,
        formik.values.services_available.en
      );
    }

    formData.append("PACIID", formik.values.PACIID);

    formData.append("price", formik.values.price);

    formData.append(
      "profile_photo_as_an_image",
      JSON.stringify(formik.values.profile_photo_as_an_image)
    );
    formData.append(
      "profile_photo_as_an_image_primary",
      JSON.stringify(formik.values.profile_photo_as_an_image_primary)
    );
    if (
      formik.values.pre_defined_images.length > 0 &&
      formik.values.pre_defined_images[0].id
    ) {
      formik.values.pre_defined_images.map((ele:any, index:Number) => {
        formData.append(`pre_defined_images[${index}][id]`, ele["id"]);
        formData.append(
          `pre_defined_images[${index}][primary]`,
          JSON.stringify(ele["primary"] ? 1 : 0)
        );
      });
    }
    if (formik.values.images.length > 0 && formik.values.images[0].file) {
      formik.values.images.map((ele, index) => {
        formData.append(`images[${index}][name][en]`, ele["name"]["en"]);
        formData.append(`images[${index}][name][ar]`, ele["name"]["ar"]);
        formData.append(`images[${index}][file]`, ele["file"]);
        formData.append(`images[${index}][primary]`, ele["primary"]);
      });
    }
    if (formik.values.pre_defined_phone_numbers.length > 0) {
      formData.append(
        "pre_defined_phone_numbers[0]",
        formik.values.pre_defined_phone_numbers[0]
      );
    }
    if (formik.values.phone_numbers.length > 0) {
      formik.values.phone_numbers.map((ele, index) => {
        formData.append(`phone_numbers[${index}][phone]`, ele["phone"]);
        formData.append(
          `phone_numbers[${index}][international_code]`,
          ele["international_code"]
        );
      });
    }

    axios
      .post(apis.posts, formData, {
        headers: { Authorization: `Bearer ${token.token}` },
      })
      .then((res) => {
        setAddPostLoading(false);
        if (res.data) {
          setNotify((pre: any) => ({
            ...pre,
            type: true,
            show: true,
            message:i18n.language==='en'? "Your post has been added successfully":
            "تم اضافة البوست بنجاح",
          }));
          formik.resetForm()
          setPhoneNumbersArray([])
          setImages([])
        }
      })
      .catch((err) => {
        setAddPostLoading(false);
        if (err.response && err.response.data) {
          if (err.response.data.errors) {
           Object.keys(err.response.data.errors).forEach((ele:string)=>{
              setNotify((pre: any) => ({
                ...pre,
                type: false,
                show: true,
                message:err.response.data.errors[ele],
              }));
            })
          }
          else {

            setNotify((pre: any) => ({
              ...pre,
              type: false,
              show: true,
              message: err.response.data.error,
            }));
          }
        }
      });
  };


  useEffect(() => {
    let imgs_arr = [...formik.values.images]
      .filter((ele) => ele.file)
      .map((ele, index) => {
        if (primary === index) {
          return { ...ele, primary: 1 };
        } else {
          return { ...ele, primary: 0 };
        }
      });
    customSetFieldValue("images", imgs_arr);
  }, [primary]);

  useEffect(() => {
    checked.profile_photo_as_image
      ? customSetFieldValue("profile_photo_as_an_image", 1)
      : customSetFieldValue("profile_photo_as_an_image", 0);
    checked.profile_photo_primary
      ? customSetFieldValue("profile_photo_as_an_image_primary", 1)
      : customSetFieldValue("profile_photo_as_an_image_primary", 0);
  }, [checked]);

  useEffect(() => {
    getPropertyType();
    getOffers(0);
    getPropertySites();
  if (getLocalStorage() && getLocalStorage().role !==3){
    
    getCategories(1)
  };
  if (getLocalStorage() && getLocalStorage().role ===3){
    
    getCategories(0)
  };
    getArea();
  
    if (getLocalStorage()) {
      setToken(getLocalStorage())
   console.log(getLocalStorage())
      if (!post_id) {
        let phone_numbers=getLocalStorage().phone_numbers
        if (phone_numbers && phone_numbers.length>0) {
          let phone_number:iPhoneNumber = {phone:phone_numbers[0].phone
            ,international_code:phone_numbers[0].international_code}
          
            addPhone(phone_number)
        }
      }
    }
  }, []);

  useEffect(() => {
    if (formik.values.offer_type_id) {
      getOffers(1, formik.values.offer_type_id);
    }
  }, [formik.values.offer_type_id]);
  useEffect(() => {}, [isOffersTypeLoading]);

  useEffect(() => {
    getPredefinedPictures();
  }, [openPredefinedPicturesModal]);
  useEffect(() => {
    if (!predefinedPicturesError) {
      if (predefinedPicturesData) {
        setPredefinedImages(predefinedPicturesData);
      }
    }
  }, [isPredefinedPicturesLoading]);
 useEffect(()=>{
  if (getLocalStorage() && getLocalStorage().role ===3) {
    let lang=i18n.language
    if (formik.values.area_id >0 && formik.values.price_type_id>0 
      && formik.values.property_type_id>0  && !formik.touched.title && !post_id){
       let property_type=propertySubTypes.filter( ele=>
        ele.value=== formik.values.property_type_id
        )[0]
        let offer_type=offersType.filter(ele=>
          ele.id === formik.values.offer_type_id
          )[0]

        let theArea =area.filter(ele=>ele.value === formik.values.area_id)[0]
     
        if (offer_type.title && property_type.title && theArea.title) {

          let post_title=`${property_type.title[lang]}`+
                             ` ${lang==='en'?' for ':'لل' }`+
                            `${offer_type.title[lang]} ${lang==='en'?' in ':' في'} `+
                            ` ${theArea.title?(theArea.title as any)[lang]:''} `
        
          formik.setFieldValue('title',{en:post_title,ar:post_title})    
        }

      }
  }

 },[formik.values.area_id,formik.values.price_type_id])
  useEffect(() => {
    if (!propertyTypesError) {
      if (propertyTypesData.length > 0) {
     
        let sub_types:any[]=[]
        let data = propertyTypesData.map((ele) => {
          let type = {
            title: { ar: ele.name.ar, en: ele.name.en },
            value: ele.id,
            values: [],
          };
          if (ele.sub_types.length > 0) {
            ele.sub_types.map((elem: any) => {
              (type.values as any).push({
                title: { ar: elem.name.ar, en: elem.name.en },
                value: elem.id,
                ...elem
              });
            });
          }
          return type;
        });

        if (data.length > 0) {
          setPropertyTypse(data);
          // selectePropertySubTypeId(
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
        if (prices && prices.length>0 && prices.length <2) {
          formik.setFieldValue('price_type_id',prices[0].id)
        }
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
    if (!CategoriesError && !formik.values.category_id) {
      if (categoriesData && categoriesData.length > 0) {
        let data = categoriesData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
        });
        setCategories(data);
      }
    }
    if (!CategoriesError && formik.values.category_id) {
      if (categoriesData && categoriesData.length > 0) {
        let data = categoriesData.map((ele) => {
          return { title: { ar: ele.name.ar, en: ele.name.en }, value: ele.id };
        });
        setTags(data);
      } else {
        setTags([]);
      }
    }
    if (token.role === 3) {
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

  useEffect(() => {
    if (formik.values.category_id) {
      customSetFieldValue("tags_ids", []);
      getCategories(0, formik.values.category_id);
    }
  }, [formik.values.category_id]);
  useEffect(()=>{
    if (formik.values.main_property_type && formik.values.main_property_type >0) {
      let sub_properties= propertyTypes.map((ele)=>{
        if (ele.value === formik.values.main_property_type) {
          return ele.values
        }
        return null
      }).filter(ele=>ele)
      setPropertySubTypes(sub_properties[0])
    }
  },[formik.values.main_property_type])

  useEffect(() => {
    if (token.role === 3) {
      getCategories(0);
    }
  }, [token]);
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

  // UPDATE POST ///////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (page && post_id) {
      getPosts({ page: parseInt(page), post_id: parseInt(post_id) });
    }
  }, [post_id, page]);
  useEffect(() => {
    if (!getPostsError) {
      if (getPostsData && getPostsData.data.length >0) {
        
        let oldPhoneNumbers: any[] = [];
        let phones:any[]=[]
        let idTags: any[] = [];
        let oldImages: any[]=[]
        let images: any[]=[]
        getPostsData.data[0]?.phone_numbers.map((ele: any) => {
          phones.push(ele)
          oldPhoneNumbers.push({phone:ele.phone,international_code:ele.international_code});
        });
       
        if (getPostsData.data[0]?.tags_ids && getPostsData.data[0]?.tags_ids.length > 0) {
          getPostsData.data[0]?.tags_ids.map((ele: any) => {
            idTags.push(ele.id);
          });
         
        }
        if (getPostsData.data[0]?.images && getPostsData.data[0]?.images.length>0) {
          getPostsData.data[0]?.images.map((ele:any)=>{
            images.push(ele)
            oldImages.push({name:{en:ele.file_name,ar:ele.file_name}
              ,file:ele
             ,primary:ele.primary_post_picture})
          })
        }
        
        setPhoneNumbersArray(phones);
      
        setImages(images)
       
      //   const initialization= async()=> await intializeValues(getPostsData.data)
      // initialization()
     
      setEnableFieldsUpdatedRegister(true)
      }
    }
    

  }, [isGetPostsLoading]);
const updatePostImediately=(data:any)=>{
 let newPosts= storedPosts.map(ele=>{
    if (ele.id === parseInt(post_id as string)) {
      return ({
        ...ele,
        title:data.title,
        area:data.area.name,
        offer_type:data.offer_type?data.offer_type.name:null,
        main_property_type:data.main_property_type?data.main_property_type.name:null,
        price_type:data.price_type?data.price_type.name:null,
        number_of_rooms:data.number_of_rooms,
        number_of_bathrooms:data.number_of_bathrooms,
        images:data.images?data.images.map((ele:any)=>ele.path):[],
        profile_picture:data.profile_picture,
        property_site:data.property_site?data.property_site.name:null,
        property_type:data.property_type?data.property_type.name:null,
        tags:data.tags_ids && data.tags_ids.length>0?data.tags_ids:null,
        currency:data.area.country.currency,
        PACIID:data.PACIID,
        services_available:data.services_available,
        phone_numbers:data.phone_numbers,
        category:data.category?data.category.name:null,
        price:data.price,
        description:data.description,
        space:data.space
      })
    }
    return ele
  })
  setStoredPosts(newPosts)
}

  const updatePost = () => {
   
    
    if (phoneNumbersArray.length===0) {
    
     formik.setFieldError('phone_numbers[0][phone]',i18n.language==='en'?'This field can not be empty':'لا يمكن ان يكون هذا الحقل فارغا')
      //formik.setFieldTouched('phone_numbers',true)
      return
    }
    else {
      formik.setFieldError('phone_numbers[0][phone]','')
    }
 
    setAddPostLoading(true);
    let formData = new FormData();
    let n=0
      
       
      if (fieldsUpdatedRegister.current.includes('title') && (formik.values.title.ar || formik.values.title.en)) {
       
        formData.append("title[en]", formik.values.title.en);
        formData.append("title[ar]", formik.values.title.ar);
      }
      if (fieldsUpdatedRegister.current.includes( 'area_id')) formData.append("area_id", formik.values.area_id);
      if (token.role === 3 ) {
        if (fieldsUpdatedRegister.current.includes('property_type_id')){

          formData.append("property_type_id", formik.values.property_type_id);
          formData.append(
            "offer_type_id",
            JSON.stringify(formik.values.offer_type_id)
          );
        }
        if (fieldsUpdatedRegister.current.includes('price_type_id')){

          formData.append("price_type_id", formik.values.price_type_id);
        }
        if (fieldsUpdatedRegister.current.includes('offer_type_id')){

          formData.append("offer_type_id", formik.values.offer_type_id);
        }
        if (fieldsUpdatedRegister.current.includes('property_site_id')){

          formData.append("property_site_id", formik.values.property_site_id);
        }
        if (fieldsUpdatedRegister.current.includes('location_link')){

          formData.append("location_link", formik.values.location_link);
        }
        if (fieldsUpdatedRegister.current.includes('latitude')) {

          formData.append("latitude", formik.values.latitude);
        }
        if (fieldsUpdatedRegister.current.includes('longitude')) {

          formData.append("longitude", formik.values.longitude);
        }
        if (fieldsUpdatedRegister.current.includes('number_of_rooms')) {

          formData.append("number_of_rooms", formik.values.number_of_rooms);
        }
        if (fieldsUpdatedRegister.current.includes('number_of_bathrooms')) {

          formData.append("number_of_bathrooms", formik.values.number_of_bathrooms);
        }
        if (fieldsUpdatedRegister.current.includes('space')){

          formData.append("space", formik.values.space);
        }
      }
      if (token.role !== 3 && fieldsUpdatedRegister.current.includes('category_id')) {
        formData.append("category_id", JSON.stringify(formik.values.category_id));
      }
      if ( fieldsUpdatedRegister.current.includes('tags_ids') &&formik.values.tags_ids.length > 0) {
        formik.values.tags_ids.map((ele, index) => {
          formData.append(`tags_ids[${index}]`, ele);
        });
      }
  
      if (fieldsUpdatedRegister.current.includes('description') &&(formik.values.description.ar || formik.values.description.en)) {
        formData.append("description[en]", formik.values.description.en);
        formData.append("description[ar]", formik.values.description.ar);
      }
  
      if (
        fieldsUpdatedRegister.current.includes('descriptive_address')&&
      (  formik.values.descriptive_address.ar ||
        formik.values.descriptive_address.en)
      ) {
        formData.append(
          "descriptive_address[ar]",
          formik.values.descriptive_address.ar
        );
        formData.append(
          "descriptive_address[en]",
          formik.values.descriptive_address.en
        );
      }
  
      if (
        fieldsUpdatedRegister.current.includes('services_available')&&
       ( formik.values.services_available.ar ||
        formik.values.services_available.en)
      ) {
        formData.append(
          `services_available[ar]`,
          formik.values.services_available.ar
        );
        formData.append(
          `services_available[en]`,
          formik.values.services_available.en
        );
      }
    if (fieldsUpdatedRegister.current.includes('PACIID')){

      formData.append("PACIID", formik.values.PACIID);
    }
    if (fieldsUpdatedRegister.current.includes('price')) {

      formData.append("price", formik.values.price);
    }
   if ( fieldsUpdatedRegister.current.includes('profile_photo_as_an_image')){

      formData.append(
        "profile_photo_as_an_image",
       formik.values.profile_photo_as_an_image
      );
    }
  if (fieldsUpdatedRegister.current.includes('profile_photo_as_an_image_primary')){

    formData.append(
      "profile_photo_as_an_image_primary",
     formik.values.profile_photo_as_an_image_primary
    );
  }
      if (
        fieldsUpdatedRegister.current.includes('pre_defined_images') &&
       ( formik.values.pre_defined_images.length > 0 &&
        formik.values.pre_defined_images[0].id)
      ) {
        formik.values.pre_defined_images.map((ele:any, index:number) => {
          formData.append(`pre_defined_images[${index}][id]`, ele["id"]);
          formData.append(
            `pre_defined_images[${index}][primary]`,
            JSON.stringify(ele["primary"] ? 1 : 0)
          );
        });
      }
      if (fieldsUpdatedRegister.current.includes('phone_numbers_to_delete') ) {
        formik.values['phone_numbers_to_delete'].map((ele,index)=>{
          formData.append(`phone_numbers_to_delete[${index}]`,ele)
        })
      }
      if (fieldsUpdatedRegister.current.includes('images_to_delete')) {
        formik.values['images_to_delete'].map((ele,index)=>{
          formData.append(`images_to_delete[${index}]`,ele)
        })
      }
      
      if (fieldsUpdatedRegister.current.includes('images')) {
        let new_image :any[]=[]
        let response_images=getPostsData.data[0].images
        formik.values['images'].map((ele:any,index:number)=>{
        new_image=response_images.filter((elem:any)=>elem.file_name === ele.name.en)
       if (new_image.length ===0) {
        formData.append(`images[${index}][name][en]`, ele["name"]["en"]);
        formData.append(`images[${index}][name][ar]`, ele["name"]["ar"]);
        formData.append(`images[${index}][file]`, ele["file"]);
        formData.append(`images[${index}][primary]`, ele["primary"]);
       }
       
       })
       
      }
      if (fieldsUpdatedRegister.current.includes( 'phone_numbers')) {
        let new_numbers :any[]=[]
        let response_numbres=getPostsData.data[0].phone_numbers
        formik.values['phone_numbers'].map((ele:any,index:number)=>{
        new_numbers=response_numbres.filter((elem:any)=>elem.phone === ele.phone)
       if (new_numbers.length ===0) {
        formData.append(`phone_numbers[${index}][phone]`, ele["phone"]);
        formData.append(
          `phone_numbers[${index}][international_code]`,
          ele["international_code"]
        );
      
       }
       
       })
       
      }
   

      axios
        .post(apis.updatePost(post_id?parseInt(post_id):-1), formData, {
          headers: { Authorization: `Bearer ${token.token}` },
        })
        .then((res) => {
          setAddPostLoading(false);
          if (res.data) {
            updatePostImediately(res.data.payload)
            setNotify((pre: any) => ({
              ...pre,
              type: true,
              show: true,
              message: i18n.language==='en'?"Your post has been changed successfully":
              "تم تعديل البوست بنجاح",
            }));
            formik.resetForm()
            navigate('/addpost')
          }
        })
        .catch((err) => {
          setAddPostLoading(false);
         
          if (err.response && err.response.data.error) {
            if (Array.isArray(err.response.data.error)) {
              setNotify((pre: any) => ({
                ...pre,
                type: false,
                show: true,
                message: err.response.data.error[0],
              }));
            }
           else {

             setNotify((pre: any) => ({
               ...pre,
               type: false,
               show: true,
               message: err.response.data.error,
             }));
           }
           }
            })
        };
  ;

console.log(formik.errors)
console.log(formik.values)
  return (
    <Col xs={12} className="addPostContainer">
      {
        !mobileView ?
      
      <Col xs={12} className="d-sm-block d-none">
        <LargeView
          postTags={postTags}
          phoneNumber={phoneNumber}
          phoneNumbersArray={phoneNumbersArray}
          addPhone={addPhone}
          resetPhone={resetPhone}
          deleteNumber={deleteNumber}
          deleteTag={deleteTag}
          values={formik.values}
          setFieldValue={customSetFieldValue}
          handleChange={customHanldChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          handlePhone={handlePhone}
          handleTitle={handleTitle}
          setPredefinedPicturesModal={setPredefinedPicuturesModal}
          t={t}
          checked={checked}
          setChecked={setChecked}
          images={images}
          setImages={setImages}
          setPhoneNumbersArray={setPhoneNumbersArray}
          propertyTypes={propertyTypes}
          setPhoneNumber={setPhoneNumber}
          setPrimary={setPrimary}
          primary={primary}
          offersType={offersType}
          pricesType={pricesType}
          propertySites={propertySites}
          categories={categories}
          tags={tags}
          language={i18n.language}
          addPost={post_id?updatePost:addPost}
        
          area={area}
          role={token.role}
          addTag={addTag}
          selectePropertySubTypeId={selectePropertySubTypeId}
          handleAvailableServices={handleAvailableServices}
          touched={formik.touched}
          addPostLoading={addPostLoading}
          setFieldTouched={formik.setFieldTouched}
          propertySubTypes={propertySubTypes}
        />
      </Col>
      :
      <Col xs={12} className="d-block d-sm-none">
        <SmallView
          postTags={postTags}
          phoneNumber={phoneNumber}
          phoneNumbersArray={phoneNumbersArray}
          addPhone={addPhone}
          resetPhone={resetPhone}
          deleteNumber={deleteNumber}
          deleteTag={deleteTag}
          values={formik.values}

          setFieldValue={customSetFieldValue}
          handleChange={customHanldChange}
          propertySubTypes={propertySubTypes}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          handlePhone={handlePhone}
          handleTitle={handleTitle}
          setPredefinedPicturesModal={setPredefinedPicuturesModal}
          t={t}
          checked={checked}
          setChecked={setChecked}
          images={images}
          setImages={setImages}
          setPhoneNumbersArray={setPhoneNumbersArray}
          propertyTypes={propertyTypes}
          setPhoneNumber={setPhoneNumber}
          setPrimary={setPrimary}
          primary={primary}
          offersType={offersType}
          pricesType={pricesType}
          propertySites={propertySites}
          categories={categories}
          tags={tags}
          language={i18n.language}
          addPost={post_id?updatePost:addPost}
          area={area}
          role={token.role}
          addTag={addTag}
          selectePropertySubTypeId={selectePropertySubTypeId}
          handleAvailableServices={handleAvailableServices}
          touched={formik.touched}
          addPostLoading={addPostLoading}
          setFieldTouched={formik.setFieldTouched}
        />
      </Col>
}
      <PredefiendPicturesModal
        setValue={handleSelectPredefinedImages}
        name="pre_defined_images"
        open={openPredefinedPicturesModal}
        hide={() => setPredefinedPicuturesModal(false)}
        images={predefinedImages}
      />
    </Col>
  );
};
export default AddPost;
