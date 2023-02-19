import './dialogbox.scss'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next';
import { Spinner } from '../spinner';

interface iProps {show:boolean
                   ,setShow:Function
                  ,message:string
                  ,title:string
                  ,doit?:Function
                  ,loading:boolean
                }

export const DialogBox=({show,setShow,message,title,doit,loading}:iProps)=>{
const handleClose=()=>setShow(false)
const {t}=useTranslation()
const continueAction=()=>{
if (typeof(doit)==='function') doit()

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
          <Button variant="danger" onClick={continueAction}
          disabled={loading}
          >
            {loading?
            <Spinner />:
            t('OK')
            }
          </Button>
        </Modal.Footer>
      </Modal>
    )
}