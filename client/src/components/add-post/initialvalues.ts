import { getLocalStorage } from "../tools/getLocalstorage";


export const postInitializer= (
     isUpdatePost:boolean,data:any)=>{

if (!isUpdatePost) {
    return (
        {
            input: { en: "", ar: "" },
            offer_type_id: 0,
            tags_ids: [],
            rent_freq: "",
            title: { en: "", ar: "" },
            description: { en: "", ar: "" },
            services_available: { en: "", ar: "" },
            area_id: "",
            property_type_id:"",
            price_type_id: "",
            property_site_id: '',
            category_id: 0,
            descriptive_address: { ar: "", en: "" },
            location_link: "",
            latitude: "",
            longitude: "",
            space: "",
            price: "",
            number_of_rooms: "",
            number_of_bathrooms: "",
            PACIID: "",
            profile_photo_as_an_image: 0,
            profile_photo_as_an_image_primary: 0,
            pre_defined_images: [{ id: "", primary: "" }],
            images: [{ name: { en: "", ar: "" }, file: "", primary: "" }],
            pre_defined_phone_numbers: [],
            phone_numbers: [{ phone: "", international_code: "" }],
            images_to_delete:[],
            phone_numbers_to_delete:[],
            post_new_primary:'',
            main_property_type:0
          
          }
    )
}
else {

   // if (phones.length>0)setPhoneNumbersArray((pre:any)=>phones);
    
   //if (images.length>0) setImages(images)
   let isNews= getLocalStorage()&& getLocalStorage().role ===7
   let oldPhoneNumbers: any[] = [];
        let phones:any[]=[]
        let idTags: any[] = [];
        let oldImages: any[]=[]
        let images: any[]=[]
        if (!isNews) {
     data?.phone_numbers.map((ele: any) => {
          phones.push(ele)
          oldPhoneNumbers.push({phone:ele.phone,international_code:ele.international_code});
        });
      }
        if (data?.tags_ids && data?.tags_ids.length > 0) {
          data?.tags_ids.map((ele: any) => {
            idTags.push(ele.id);
          });
         
        }
        if (data?.images && data?.images.length>0) {
          data?.images.map((ele:any)=>{
            images.push(ele)
            oldImages.push({name:{en:ele.file_name,ar:ele.file_name}
              ,file:ele
             ,primary:ele.primary_post_picture})
          })
        }
    return (
        {
            input: { en: "", ar: "" },
            offer_type_id:!isNews? data?.offer_type_id:0,
            tags_ids: idTags || [],
            title:data?.title || {en:'',ar:''},
            description:data?.description?.en?{en:data.description.en,ar:data?.description?.ar}: { en: "", ar: "" },
            services_available:data?.services_available || { en: "", ar: "" },
            area_id: data?.area_id,
            property_type_id:!isNews? data?.property_type_id:0,
            price_type_id:!isNews? data?.price_type_id:0,
            property_site_id:!isNews? data?.property_site_id:0,
            category_id: data?.category_id,
            descriptive_address: data?.descriptive_address || { ar: "", en: "" },
            location_link:!isNews? data?.location_link:'',
            latitude: data?.latitude,
            longitude: data?.longitude,
            space:!isNews? data?.space :0,
            price: !isNews? data?.price:0,
            number_of_rooms:!isNews? data?.number_of_rooms:0,
            number_of_bathrooms:!isNews? data?.number_of_bathrooms:0,
            PACIID: data?.PACIID,
            profile_photo_as_an_image: data?.profile_photo_as_an_image,
            profile_photo_as_an_image_primary: data?.profile_photo_as_an_image_primary,
            pre_defined_images:data?.pre_defined_images || [{ id: "", primary: "" }],
            images:oldImages || [{ name: { en: "", ar: "" }, file: "", primary: "" }],
            pre_defined_phone_numbers: [],
            phone_numbers:oldPhoneNumbers ||[{ phone: "", international_code: "" }],
            images_to_delete:[],
            phone_numbers_to_delete:[],
            post_new_primary:'',  
            main_property_type:data?.main_property_type?.id
        }
    )
}
}