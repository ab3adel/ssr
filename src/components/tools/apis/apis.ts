export const apis = {
    roles:'roles',
    countries:'countries',
    country_id:(num:number)=>`countries?country_id=${num}`,
    register:'register',
    resend_email:(email:string)=>`resendEmail?type=forgotPassword&email=${email}`,
    forgot_password:'forgotPassword',
    login:'login',
    categories:(is_category:number,category_id:number)=>`categories?is_category=${is_category}&category_id=${category_id}`,
    addGuest:'addNewGuest',
    rememberMe:'rememberMe',
    propertyType:'propertyTypes',
    offersType:(is_price_type=0,type_id=3)=> `offerAndPriceTypes?is_price_type=${is_price_type}&type_id=${type_id}`,
    propertySites:'propertySites',
    posts:'posts',
    likePost:(id:number)=>`like?$post_id=${id}`,
    unLikePost:(id:number)=>`unlike?$post_id=${id}`,
    deletePost:(id:number)=>`deletePost/${id}`

    
}