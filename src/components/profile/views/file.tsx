import {Col ,Row} from 'react-bootstrap'
import {useState} from 'react'
import fileIcon from '../../../images/file.svg'
import { GreenButton } from '../../tools/buttons/green-button'
import {Download} from 'react-bootstrap-icons'
import Delete from '../../../images/delete-icon.svg'
interface iProps {edit:boolean}
export const FileDownloader =({edit}:iProps)=>{
    const [files,setFiles]=useState<string[]>([])

    const handleFile =(e:React.ChangeEvent<HTMLInputElement>)=>{
        let prefiles =e.target.files
        if (prefiles && prefiles.length>0) {
            let url= URL.createObjectURL(prefiles[0])
            setFiles((pre:any)=>([...pre,url]))
        }
        
    }
    const downloadFile =(num:number)=>{
        let anchor =document.querySelector(`#file_number_${num}`) as HTMLAnchorElement
        console.log(anchor)
        anchor.click()

    }
    const uploadFile =(num:number)=>{
        let input =document.querySelector(`#file_input_number_${num}`) as HTMLInputElement
 
        input.click()
    }
    return (
        <Col xs={12} className="files">
            <Row className="gy-1">
                <Col xs={12}>
                  <span className="fw-bold">Files</span>
                </Col>
                
                <Col xs={12}>
                    <Row className="gy-1">
                    {/* {
                    
                        files.map((ele,index)=>{
                            return (
                                <Col xs={3} key={index}
                                className='d-flex justify-content-center flex-column align-items-center file mx-1'>
                                    
                                    <img src={fileIcon} style={{width:'24px',height:'28px'}} />
                                    <span className="fw-bold text-center my-2" style={{fontSize:'12px'}}>
                                        file name
                                    </span>
                                    <a href={ele} download={'downlad'} id={`file_number_${index}`}/>
                                    <GreenButton label='Download' 
                                    fun={()=>downloadFile(index)}>
                                        <Download />
                                    </GreenButton>
                                </Col>
                            )
                        }) */
                    }
                   {  
                   edit?
                   <Col sm={3}  xs={5}
                                className='d-flex justify-content-center flex-column align-items-center file mx-1 position-relative'>
                                      <div className="deleteIcon"
                                       >
                                            <img src={Delete} 
                                        />
                                        </div>
                                    <img src={fileIcon} style={{width:'24px',height:'28px'}} />
                                    <span className="fw-bold text-center my-2 " style={{fontSize:'12px'}}>
                                        file name
                                    </span>
                                    <input type="file" id={`file_input_number_${0}`} className="hide" style={{height:'1px'}} />
                                    <GreenButton label='Upload' 
                                    fun={()=>uploadFile(0)}>
                                        <Download style={{transform:'rotate(180deg)'}}/>
                                    </GreenButton>
                    </Col>

                   :
                    <Col sm={3}  xs={5}
                                className='d-flex justify-content-center flex-column align-items-center file mx-1'>
                                       
                                    <img src={fileIcon} style={{width:'24px',height:'28px'}} />
                                    <span className="fw-bold text-center my-2 " style={{fontSize:'12px'}}>
                                        file name
                                    </span>
                                    <a href={'#'} download={'downlad'} id={`file_number_${0}`}/>
                                    <GreenButton label='Download' 
                                    fun={()=>downloadFile(0)}>
                                        <Download />
                                    </GreenButton>
                             
                    </Col>
                    }
                     
                    </Row>
                </Col>
            </Row>
            
        </Col>
    )
}