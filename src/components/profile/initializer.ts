

export const initializer =(
    data:any
    ,company:boolean
    ,setImagesToShow:Function,
    setCountry:Function,
    getCategories:Function
    )=>{
        if (company ) {
    let images_arr:any[]=[]
    let files_arr:any[]=[]
    let images_to_show :string[]=[]
    if (data && data.company&& data.company.files){
        let{company:{files}}=data
        if (files.length >0) {
       
         files.map((ele:any)=>{
           if (ele.file_purpose==='predefined_post_picture') {
             images_arr.push(ele)
             images_to_show.push(ele.path)
           }
           else {
             files_arr.push(ele)
           }
         })
        
     
        
         setImagesToShow(images_to_show)
        }
       }
    
    if (data && data.area && data.area.country_id ) {
        setCountry(data.area.country_id)
      }
    if (data && data.company && data.company.categories) {
        let companyCategories=data.company.categories
        if (companyCategories.length >0) {
          getCategories(1,companyCategories[0].id)
        }
    return ({
        twitter: data?.company?.twitter ? data.company.twitter : "",
        facebook: data?.company?.facebook
          ? data.company.facebook
          : "",
        youtube: data?.company?.youtueb ? data.company.youtube : "",
        snapchat: data?.company?.snapchat
          ? data.company.snapchat
          : "",
        tiktok: data?.company?.tiktok ? data.company.tiktok : "",
        instagram: data?.comapny?.instagram
          ? data.company.instagram
          : "",
        description: data?.company?.description
          ? data?.company?.description
          : { en: "", ar: "" },
        country: data?.area?.country?data.area.country: {name:{en:'',ar:''},id:0},
        area: data?.area ? data.area : { name: { en: "", ar: "" }, id: 0 },
        flat: data?.flat ? data.flat : "",
        floor: data?.floor ? data?.floor : "",
        block: data?.block ? data.block : "",
        email: data.email ? data.email : "",
        pre_existed_phone_numbers: data.phone_numbers ? data.phone_numbers : [],
        phone_numbers:[],
        avenue: data?.avenue ? data.avenue : "",
        street: data?.street ? data.street : "",
        website: data?.company?.website ? data.company.website : "",
        PACIID: data.PACIID ? data.PACIID : "",
        building: data.building ? data.building : "",
        role: data?.roles ? data.roles[0] : { name:{en: "", ar: ""} ,id: 0 },
        pre_defined_images:images_arr,
        files: files_arr,
        full_name:data.full_name?data.full_name:'',
        profile_picture:data.profile_pictuer?data.profile_picture:null,
        category:data.company?.categories?data.company.categories:[{id:0,name:{ar:'',en:''}}],
        area_id:data.area_id,
        category_ids:[],
        category_ids_delete:[],
        predefined_post_pictures:[],
        predefined_pictures_delete:[],
        phone_numbers_delete:[],
        phone_number_old_primary:'',
        phone_number_new_primary:''
    })
}
    
}
    }