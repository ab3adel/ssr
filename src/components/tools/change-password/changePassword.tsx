import './changePassword.scss'
import Modal from 'react-bootstrap/Modal'
import { GreenButton } from '../buttons/green-button';
import { WhiteButton } from '../buttons/white-button';
import {useTranslation} from 'react-i18next'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {InputWithIcon} from '../input/inputIcon'
import { useFormik } from 'formik'
import axios from '../apis/axios'
import { apis } from '../apis/apis';
import { getLocalStorage } from '../getLocalstorage';
import {useContext} from 'react'
import notificationContext from '../context/notification/notification-context';
import {changePasswordSchema} from './validation'
import {useNavigate} from 'react-router-dom'
interface iProps {open:boolean,onClose:()=>void}
export const  ChangePassword=({open,onClose}:iProps)=> {
    const {t} =useTranslation()
    const navigate=useNavigate()
    const formik =useFormik({
        initialValues:{
            old_password:'',
            new_password:'',
            new_password_confirmation:''
        },
        onSubmit:()=>{},
        validationSchema:changePasswordSchema
    })
    const {setNotify} =useContext(notificationContext)

    const submit=()=>{
        let formData= new FormData()
        if (Object.keys(formik.errors).length>0) return
        formData.append('old_password',formik.values.old_password)
        formData.append('new_password',formik.values.new_password)
        formData.append('new_password_confirmation',formik.values.new_password_confirmation)
        axios.post(apis.changePassword,formData,{headers:{ Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` }}
        ).then(res=> {
            console.log (res)
            if (res.data) {
                setNotify((pre:any)=>({...pre,type:true,show:true,message:'Your password changed successfully'}))
            }
            formik.resetForm()
            navigate('/auth')

        })
        .catch(err=>{
            console.log(err)
            let message ='Somethong wrong happend !'
            if (err.response && err.response.data && err.response.data.error) {
                message =err.response.data.error
            }
            setNotify((pre:any)=>({...pre,type:false,show:true,message}))
        })
    }

    return (

        <Modal
        show={open} onHide={onClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>{t('ChangePassword')}</Modal.Title>

          </Modal.Header>
  
          <Modal.Body>
        
            <Row className='gy-3 px-1'>
                <Col xs={11}>
                    <InputWithIcon 
                     label={t('OldPassword')}
                     value={formik.values.old_password}
                     onChange={formik.setFieldValue}
                     name="old_password"
                     error={formik.errors.old_password}
                     touched={formik.touched.old_password}
                     handleBlur={formik.handleBlur}
                     type="password"
                     required={true}
                    />
                </Col>
                <Col xs={11}>
                    <InputWithIcon 
                    label={t('NewPassword')}
                    value={formik.values.new_password}
                    onChange={formik.setFieldValue}
                    name="new_password"
                    error={formik.errors.new_password}
                    touched={formik.touched.new_password}
                    handleBlur={formik.handleBlur}
                    type="password"
                    required={true}
                    />
                </Col>
                <Col xs={11}>
                    <InputWithIcon 
                    label={t('ConfirmPassword')}
                    value={formik.values.new_password_confirmation}
                    onChange={formik.setFieldValue}
                    name="new_password_confirmation"
                    error={formik.errors.new_password_confirmation}
                    touched={formik.touched.new_password_confirmation}
                    handleBlur={formik.handleBlur}
                    type="password"
                    required={true}
                    />
                </Col>
            </Row>
          
          </Modal.Body>
  
          <Modal.Footer>
            <Col xs={12}>

                <Row className="">
                    <Col xs={6} lg={5}> 
                    <GreenButton  label={t('SaveChanges')}
                    fun={()=>submit()}
                    ></GreenButton>
                    </Col>
                    <Col xs={6} lg={5}>

                        <WhiteButton label={t('Cancel')}
                        fun={()=>onClose()} />
                    </Col>
                </Row>
            </Col>
          </Modal.Footer>
          </Container>
        </Modal>
    
    );
  }
  


