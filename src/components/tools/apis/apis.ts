import {iGetPosts, iGetProfile} from '../interface'
import {getI18n} from 'react-i18next'
export const apis = {
   predefiendPictures:'viewPredefinedCompanyImages',
    roles:'roles',
    countries:'countries',
    country_id:(num:number)=>`countries?country_id=${num}`,
    register:'register',
    resend_email:(isPhone:boolean,value:string)=>`resendEmail?type=forgotPassword&${isPhone?`phone=${value}`:`email=${value}`}&locale=${getI18n().language}`,
    forgot_password:'forgotPassword',
    login:'login',
    categories:(is_category:number,category_id?:number)=>
              is_category?`categories?is_category=${is_category}&category_id=1`:
              `categories?is_category=${is_category}${category_id?`&category_id=${category_id}`:''}`,
    addGuest:'addNewGuest',
    rememberMe:'rememberMe',
    propertyType:'propertyTypes',
    offersType:(is_price_type=0,type_id=3)=> `offerAndPriceTypes?is_price_type=${is_price_type}&type_id=${type_id}`,
    propertySites:'propertySites',
    posts:'posts',
    likePost:(id:number)=>`like?post_id=${id}`,
    unLikePost:(id:number)=>`unlike?post_id=${id}`,
    deletePost:(id:number)=>`deletePost/${id}`,
    getPosts:(
      params:iGetPosts
        )=>{
            let {
                page,post_id,user_id,company_id,text,area_id,category_id,
                tag_id,price_from,price_to,price_type_id,offer_type_id,property_site_id,
                area_from,area_to,number_of_room,number_of_bathroom,property_type_id
            }=params
          return( 
            `posts?${page?`page=${page}`:'page=1'}${post_id?`&post_id=${post_id}`:''}`+
           `${user_id?`&user_id=${user_id}`:''}${company_id?`&company_id=${company_id}`:''}`+
            `${text?`&text=${text}`:''}`+
            `${area_id?`&area_id=${area_id}`:''}${category_id?`&category_id=${category_id}`:''}`+
            `${tag_id?`&tag_id=${tag_id}`:''}`+
            `${price_from?`&price_from=${price_from}`:''}`+
            `${price_to?`&price_to=${price_to}`:''}`+
            `${property_type_id?`&property_type_id=${property_type_id}`:''}`+
            `${offer_type_id?`&offer_type_id=${offer_type_id}`:''}`+
            `${price_type_id?`&price_type_id=${price_type_id}`:''}`+
            `${property_site_id?`&property_site_id=${property_site_id}`:''}`+
            `${area_from?`&area_from=${area_from}`:''}`+
            `${area_to?`&area_to=${area_to}`:''}`+
            `${number_of_room?`&number_of_room=${number_of_room}`:''}`+
            `${number_of_bathroom?`&number-of_bathroom=${number_of_bathroom}`:''}`
            )
        },
    updatePost:(id:number)=>`posts/${id}?_method=put` ,
    profile:({user_id,page}:Partial<iGetProfile>)=>   (
      `/users?&${user_id?`user_id=${user_id}`:''}&page=1`
    ),
    updateProfile:`updateProfile?_method=put`,
    follow:(company_id:number)=>`follow?${company_id?`company_id=${company_id}`:''}`,
    unFollow:(company_id:number)=>`unfollow?${company_id?`company_id=${company_id}`:''}`,
    followings:`followings`,
    followers:'followers',
    changePassword:'passwordReset?_method=put',
    verifyPhoneNumber:(userId:number,code:number)=> `phone/verify/${userId}/${code}?locale=${getI18n().language}`,
    resend:(isPhone:boolean,value:string)=> `resendEmail?${isPhone?`phone=${value}`:`email=${value}`}&type=Verification&locale=${getI18n().language}`


        

    
}