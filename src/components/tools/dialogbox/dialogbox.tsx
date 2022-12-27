import './dialogbox.scss'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';

interface iProps {show:boolean
                   ,setShow:Function
                  ,message:string
                  ,title:string
                  ,doit?:Function
                }

export const DialogBox=({show,setShow,message,title,doit}:iProps)=>{
const handleClose=()=>setShow(false)
const {t}=useTranslation()
const continueAction=()=>{
if (typeof(doit)==='function') doit()
setShow(false)
}
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {t('Cancel')}
          </Button>
          <Button variant="danger" onClick={continueAction}>
            {t('OK')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}