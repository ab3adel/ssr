
import Delete from '../../images/delete-icon.svg'
import leftArrow from '../../images/home/left-arrow-icon.svg'
import rightArrow from '../../images/home/right-arrow-icon.svg'

import Col from 'react-bootstrap/Col'
import { validateYupSchema } from 'formik'

interface iProps{imgs:string[] | any[],setImgs:Function,primary:number,setPrimary:Function
    ,value:any
    ,setFieldValue:Function,
    images_to_delete?:number[]
    
}
export const ImagesGallery =({imgs,setImgs,primary,setPrimary,value,setFieldValue,images_to_delete}:iProps)=>{
    const handleScrolling =(str:string)=>{
        
        let target = document.querySelector('#scroll') as HTMLDivElement;
        let inner = document.querySelector('#innerContainer') as HTMLDivElement


        if (str==='left') {
            target.scrollLeft=target.scrollLeft - 100
           
        }
        else {
            target.scrollLeft=target.scrollLeft + 100
         
        }
    }
    const deleteImage=(num:number)=>{
     
        let newImages=imgs.filter((ele,index)=>index !== num)
        let imgs_arr=[...value].filter((ele,index)=>index !== num)
        let deleted_images :any[]=[]
        if (images_to_delete) {
             deleted_images=[...images_to_delete]
            let id =imgs[num].id
            deleted_images.push(id)
            
        }
        if (primary === num) {
            if(value.length>1) {
             
                if (primary>0) {
                    let newPrimary=primary-1
            
                    setPrimary((pre:number)=>newPrimary)
                    
                }
                else {
                  
                    let newPrimary=value.length -2
                 
                    setPrimary((pre:number)=>newPrimary)
                    
                }
            }
           
            
            
        }
       else if (primary > num) {
       
            let newPrimary=primary-1
            setPrimary((pre:number)=>newPrimary)
        }
        setFieldValue('images',imgs_arr)
        setImgs(newImages)
        setFieldValue('images_to_delete',deleted_images)
    }

    return (
        <div className={imgs.length >0 ? 'show':'hide'}>
        <Col xs={12} className={`imagesGallery `}>
            <Col xs={12} className="scroll" id="scroll">
                <div className=" innerContainer" id="innerContainer">
                { imgs.map((ele,index)=>{
                    return (
                        <div 
                           className="imageHolder ml-3 mr-3"

                            key={index}>
                           
                        
                            <div className="image">
                                    <div className="deleteIcon"
                                    onClick={()=>deleteImage(index)}
                                        >
                                        <img src={Delete} />
                                    </div>
                                <img src={
                                    typeof(ele) !== 'string'?
                                    ele.path?ele.path:ele:ele
                                } 
                                />
                            </div>

                            <div className={primary ===index ? "status primary" :"status secondery"}
                            onClick={()=>setPrimary(index)}>
                            primary
                            </div>
                
                        </div>
                    )
                })
                
                    }
                </div>
            </Col>
 
  
            <div className="arrow left"
            onClick={()=>handleScrolling('left')}>

                <img src={leftArrow}  />
            </div>
            <div className="arrow right"
               onClick={()=>handleScrolling('right')}>
               <img src={rightArrow} />
            </div>
         </Col>
        </div>    
    )

}