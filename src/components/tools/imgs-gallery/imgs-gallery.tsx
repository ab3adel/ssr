import './imgs-gallery.scss'
import {useState} from 'react'
import {useHide} from '../use-hide'
import Fade from 'react-bootstrap/Fade'
import leftArrow from '../../../images/home/left-arrow-icon.svg'
import rightArrow from '../../../images/home/right-arrow-icon.svg'
import {useTranslation} from 'react-i18next'
interface iProps {images: string [],price?:number }
export const ImagesGallery =({images,price}:iProps)=>{
    const {ref,hide,handleShow} =useHide()
    const [currentImage,setCurrentImage]=useState(0)
    const {i18n} =useTranslation()
    const nextImage=(str:string)=>{
       
        if (hide){
 
            if (str==='left') {
                if (currentImage === 0) return
                let index =currentImage -1
                setCurrentImage(index)
            }
            else {
                
                if (currentImage === images.length-1) return
                let index =currentImage + 1
                setCurrentImage(index)
            }
        }
     }
    return (
        <div className="imgsGalery"
                            style={{background:`url(${images[currentImage]})`}}
                            onClick={handleShow}

                            ref={ref}
                           >
                               { price && 
                                (<div className="price">
                                    <span>{price}</span>
                                    <span>Kwd / month</span>
                                </div>)
                                }
                                <Fade in={hide}>

                                    <img src={leftArrow} className="icon left" 
                                    onClick={()=>nextImage(i18n.language === 'en'?'left':'right')}/>
                                </Fade>
                                <Fade in={hide}>
                                    <img src={rightArrow} className="icon right" 
                                    onClick={()=>nextImage(i18n.language === 'en'?'right':'left')}/>
                                 </Fade>
                                <div className="dots">
                               
                                    {
                                        images.map((ele,index:number)=>
                                        <span key={index}
                                        className={index === currentImage ? 'selected':''}
                                        >.
                                        </span>
                                        )
                                    }
                                </div>    
                            </div>
    )
}