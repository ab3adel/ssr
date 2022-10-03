export const apis = {
    roles:'roles',
    countries:'countries',
    country_id:(num:number)=>`countries?country_id=${num}`,
    register:'register',
    resend_email:(email:string)=>`resendEmail?type=forgotPassword&email=${email}`,
    forgot_password:'forgotPassword',
    login:'login',
    categories:'categories?is_category=1',
    addGuest:'addNewGuest',
    rememberMe:'rememberMe',
    propertyType:'propertyTypes',
    offersType:(is_price_type=0,type_id=0)=> `offerAndPriceTypes?is_price_type=${is_price_type}&type_id=${type_id}`,
    propertySites:'propertySites',
    posts:'posts'
    
}