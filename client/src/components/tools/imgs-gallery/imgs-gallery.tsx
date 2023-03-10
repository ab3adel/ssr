import './imgs-gallery.scss'
import {useEffect, useState} from 'react'
import {useHide} from '../use-hide'
import Fade from 'react-bootstrap/Fade'
import leftArrow from '../../../images/home/left-arrow-icon.svg'
import rightArrow from '../../../images/home/right-arrow-icon.svg'
import {useTranslation} from 'react-i18next'
interface iProps {images: any []
    ,price?:string,currency?:{en:string,ar:string}
,price_type?:{en:string,ar:string} ,height?:string,post_detail?:boolean,
post_card_square?:boolean}
export const ImagesGallery =({images,price,height,price_type,currency
    ,post_detail=false,post_card_square=false}:iProps)=>{
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
     useEffect(()=>{
        if(post_detail){

       
        }
     },[post_detail])

    return (
        <div className={`imgsGalery ${post_card_square?'square_image_postCard':''} ${post_detail?'square-image':''} `}
                            style={{
                               backgroundImage:`url(${images[currentImage]}) `
                             ,backgroundSize:'cover',backgroundRepeat:'no-repeat'
                           , height:height?height:'',
                     }}
                            ref={ref}
                            id ={`${post_detail?'square-image':''} `}
                            onClick={handleShow}
                           >
                               { price && 
                                (<div className="price">
                                    <span>{price}</span>
                                    <span style={{direction:i18n.language==='en'?'rtl':'ltr'}}>
                                        {currency?i18n.language==='en'?currency.en:currency.ar:''} 
                                        {' '}
                                        {price_type?i18n.language==='en'?'/'+price_type.en:'/'+price_type.ar:''}
                                        </span>
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