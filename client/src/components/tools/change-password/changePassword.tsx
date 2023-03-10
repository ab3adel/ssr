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
import {useContext, useState} from 'react'
import notificationContext from '../context/notification/notification-context';
import {changePasswordSchema} from './validation'
import {useNavigate} from 'react-router-dom'
import i18n from '../../../i18n';
interface iProps {open:boolean,onClose:()=>void,change_after_forgot:boolean}
export const  ChangePassword=({open,onClose,change_after_forgot=false}:iProps)=> {
    const {t} =useTranslation()
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
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
        setLoading(true)
        formData.append('old_password',formik.values.old_password)
        formData.append('new_password',formik.values.new_password)
        formData.append('new_password_confirmation',formik.values.new_password_confirmation)
        axios.post(apis.changePassword,formData,{headers:{ Authorization: `Bearer ${getLocalStorage()?getLocalStorage().token:''}` }}
        ).then(res=> {
            setLoading(false)
            if (res.data) {
                setNotify((pre:any)=>({...pre,type:true,show:true
                    ,message:i18n.language==='en'?'Your password changed successfully':"???? ?????????? ???????? ???????? ??????????"}))
            }
            formik.resetForm()
            navigate('/auth')

        })
        .catch(err=>{
            setLoading(false)
            let message ='Somethong wrong happend !'
            if (err.response && err.response.data && err.response.data.error) {
                message =err.response.data.error
            }
            setNotify((pre:any)=>({...pre,type:false,show:true,message}))
        })
    }
const handleClose=()=>{
    formik.resetForm()
    onClose()
}
    return (

        <Modal
        show={open} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>{t('ChangePassword')}</Modal.Title>

          </Modal.Header>
  
          <Modal.Body>

            <Row className='gy-3 px-1'>
                {change_after_forgot 
                &&<Col xs={12}>
                    {
                    i18n.language==='en'?'It is better to change your password to one easy for you to remember':
                    '???? ???????????? ?????????? ???????? ???????? ?????? ???????? ???????????? ???? ?? ???? ?????????? ????????????'
                    }
                </Col>}
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
                    <GreenButton  
                    loading={loading}
                    label={
                        t('SaveChanges')}
                    fun={()=>submit()}
                    ></GreenButton>
                    </Col>
                    <Col xs={6} lg={5}>

                        <WhiteButton label={t('Cancel')}
                        fun={()=>handleClose()} />
                    </Col>
                </Row>
            </Col>
          </Modal.Footer>
          </Container>
        </Modal>
    
    );
  }
  


