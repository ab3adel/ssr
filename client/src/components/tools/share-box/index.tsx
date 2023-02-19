import "./share.scss"
import Dialog from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {
    FacebookShareButton,FacebookIcon
    ,TelegramShareButton,TelegramIcon,
    TwitterIcon,TwitterShareButton,
    WhatsappIcon,WhatsappShareButton,
    EmailShareButton,EmailIcon,LinkedinIcon,
    LinkedinShareButton
} from 'react-share'
import { useTranslation } from "react-i18next"
import { useSharePost } from "../apis/useIncreaseShares"
import { useEffect } from "react"
interface iProps {open:boolean,setOpen:()=>void,url:string,postId:number
    ,setPostShares:Function,postShares:number}
const ShareBox =({open,setOpen,url,postId,postShares,setPostShares}:iProps)=>{
const {t} =useTranslation()
const {setShare,shareData,shareError,isShareLoading} =useSharePost()
const handleShare=()=>{
    let pre=postShares
    setShare(postId)
    setPostShares(pre +1)
    
}
useEffect(()=>{
    if(Boolean(shareError)) {
        let pre=postShares
       
        setPostShares(pre -1)
    
    }
},[isShareLoading])
    return (
        <Dialog show={open} onHide={setOpen} className="shareContainer">
            <Dialog.Header
            className='title'>
                {t('ShareMedia')}
            </Dialog.Header>
            <Dialog.Body>
                <Container>
                    <Col xs={12}>
                        <Row className="gy-3">
                            <Col xs={4}>
                                <FacebookShareButton url={url} 
                                onClick={()=>handleShare()}>
                                    <FacebookIcon  className="icon"/>
                                </FacebookShareButton>
                            </Col>
                            <Col xs={4}>
                                <TelegramShareButton url={url}
                                  onClick={()=>handleShare()} >
                                    <TelegramIcon   className="icon"/>
                                </TelegramShareButton>
                            </Col>
                            <Col xs={4}>
                                <TwitterShareButton url={url} 
                                  onClick={()=>handleShare()}>
                                    <TwitterIcon  className="icon"/>
                                </TwitterShareButton>
                            </Col>
                            <Col xs={4}>
                                <WhatsappShareButton url={url}
                                  onClick={()=>handleShare()} >
                                    <WhatsappIcon  className="icon" />
                                </WhatsappShareButton>
                            </Col>
                            <Col xs={4}>
                                <EmailShareButton url={url} 
                                  onClick={()=>handleShare()}>
                                    <EmailIcon  className="icon"/>
                                </EmailShareButton>
                            </Col>
                            <Col xs={4}>
                                <LinkedinShareButton url={url}  
                                    onClick={()=>handleShare()}>
                                    <LinkedinIcon className="icon" />
                                </LinkedinShareButton>
                            </Col>

                        </Row>
                    </Col>
                </Container>
            </Dialog.Body>
            <Dialog.Footer>
                <Button variant="primary" onClick={setOpen}>
                {t('Later')}
                </Button>
            </Dialog.Footer>
        </Dialog>
    )
}
export default ShareBox;