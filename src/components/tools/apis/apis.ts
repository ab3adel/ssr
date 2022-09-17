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
    rememberMe:'rememberMe'
    
}