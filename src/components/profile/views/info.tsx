
import { Col ,Row} from "react-bootstrap"
import {useFormik} from 'formik'
import { SteadyIconInput } from "../../tools/steady-group/steady-icon-input/steady-icon-input"
import {TextArea} from '../../tools/steady-group/textarea/textarea'
import {FileDownloader} from '../views/file'
import {ImagesGallery} from '../../tools/imgs-gallery/imgs-gallery'
import {SteadySelect} from '../../tools/steady-group/steady-select/select'
import predefinedImage from '../../../images/home/image1.png'
import predefinedImage1 from '../../../images/home/image2.png'
import predefinedImage2 from '../../../images/home/image3.png'
import predefinedImage3 from '../../../images/home/image4.png'
import {SteadyPhoneInput} from '../../tools/steady-group/steady-phone-input/steady-phone'
interface iProps {company:boolean,edit:boolean,values?:any,handleChange?:Function,publicProfile?:boolean,t:Function}
let editCompany=[
    {label:'CompnayType',name:'role',type:'select'},
    {label:'Category',name:'category',type:'select'},
    {label:'PhoneNumber ',name:'phone_number',type:'phone'},
    {label:'Email',name:'email',type:'text'},
    {label:'PACIID',name:'PACIID',type:'text'},
    {label:'Website',name:'website',type:'text'},
   
]

let companyInfo = [
    {label:'CompnayType',name:'role',type:'select'},
    {label:'Category',name:'category',type:'select'},
    {label:'PhoneNumber ',name:'phone_number',type:'phone'},
    {label:'Email',name:'email',type:'text'},
    {label:'PACIID',name:'PACIID',type:'text'},
    {label:'Website',name:'website',type:'text'},
    {label:'Country',name:'country',type:'select'},
    {label:'Area',name:'area_id',type:'select'},
    {label:'Block',name:'block',type:'text'},
    {label:'Avenue',name:'avenue',type:'text'},
    {label:'Street',name:'street',type:'text'},
    {label:'Building',name:'building',type:'text'},
    {label:'Floor',name:'floor',type:'text'},
    {label:'Flat',name:'flat',type:'text'},
]

let userInfo =[
    {label:'PhoneNumber ',name:'phone_number',type:'phone'},
    {label:'Email',name:'email',type:'text'},
    {label:'Country',name:'country',type:'select'},
    {label:'Area',name:'area_id',type:'select'},
    {label:'Block',name:'block',type:'text'},
    {label:'Avenue',name:'avenue',type:'text'},
    {label:'Street',name:'street',type:'text'},
    {label:'Building',name:'building',type:'text'},
    {label:'Floor',name:'floor',type:'text'},
    {label:'Flat',name:'flat',type:'text'},
    {label:'PACIID',name:'PACIID',type:'text'},
]

export const Info =({company,edit,values,handleChange,publicProfile=false,t}:iProps)=>{
   const formik=useFormik({
    initialValues:{
        description:''
    },
    onSubmit:()=>{}
   })
   if (edit) companyInfo=editCompany
let info=company?companyInfo:userInfo
    return (
        <Col xs={12}>
            <Col xs={12} className="p-sm-1 p-0" >
                <Row className="d-flex justify-content-center">

         
                <Col sm={10} xs={12}>

                    <Row className="p-sm-1 pb-3 pb-sm-1 justify-content-start gy-sm-2">
                        {
                          
                            info.map((ele,index:number)=> { 
                                    
                                        if (ele.type==='select') return (
                                            <Col sm={6} xs={12} key={index}>
                                               <SteadySelect 
                                               label={t(ele.label)}
                                               name={ele.name}
                                               options={[{name:'',value:''}]}
                                               disabled={!edit}
                                               />
                                            </Col>
                                        )
                                        if (ele.type==='phone') {
                                            
                                            
                                            return (<Col sm={6} xs={12} key={index}>
                                                        <SteadyPhoneInput 
                                                        label={t('phone')}
                                                        disabled={!edit}
                                                        />
                                                    </Col>)
                                        }
                                     
                                  return  (<Col sm={6} xs={12} key={index}>
                                        <SteadyIconInput
                                        label={t(ele.label)}
                                        name={ele.name}
                                        type="text"
                                        disabled={edit?false:true}
                                        value={values?values[ele.name]:''}
                                        onChange={handleChange}
                                        />
                                         </Col>)
                                    
                                    }
                        ) }
                    
                    </Row>
                </Col>
            {
                company && (
                    <Row className="gy-2 d-none d-sm-flex justify-content-center p-0">
                    <Col sm={10} xs={12}>
                        <TextArea name="description" 
                        label="Description"
                        value={formik.values.description}
                        setValue={formik.setFieldValue}
                        handleBlur={formik.handleBlur}
                        />
                    </Col>
                    
                 {( !publicProfile &&      
                    <>
                      <Col sm={10} xs={12}>
                            <FileDownloader 
                            edit={edit}/>
                        </Col>  
                        <Col sm={10} xs={12}>
                            <Row className="gy-2">
                                <Col xs={12}>
                                <span className="fw-bold">Predefined Post Pictures</span> 
                                </Col>
                                <Col sm={9} xs={12} style={{height:'174px'}}>
                                    <ImagesGallery
                                    images={[predefinedImage,predefinedImage3,predefinedImage1,predefinedImage2,]}
                                    height={'175px'}
                                    />
                                </Col>
                            </Row>
                        </Col>
                     </>   
                        )}
                     
                    </Row>
                )
            }
                   </Row>
            </Col>
        </Col>
    )
}