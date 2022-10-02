
import Delete from '../../images/delete-icon.svg'
import leftArrow from '../../images/home/left-arrow-icon.svg'
import rightArrow from '../../images/home/right-arrow-icon.svg'

import Col from 'react-bootstrap/Col'

interface iProps{imgs:string[],setImgs:Function,primary:number,setPrimary:Function}
export const ImagesGallery =({imgs,setImgs,primary,setPrimary}:iProps)=>{
    const handleScrolling =(str:string)=>{
        
        let target = document.querySelector('#scroll') as HTMLDivElement;
        let inner = document.querySelector('#innerContainer') as HTMLDivElement
       console.log(target.clientWidth)

        if (str==='left') {
            target.scrollLeft=target.scrollLeft - 100
           
        }
        else {
            target.scrollLeft=target.scrollLeft + 100
         
        }
    }
    const deleteImage=(num:number)=>{
        let newImages=imgs.filter((ele,index)=>index !== num)
        setImgs(newImages)
    }
    return (
        <Col xs={12} className="imagesGallery">
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
                                <img src={ele} />
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
    )

}