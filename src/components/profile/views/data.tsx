import Delete from "../../../images/delete-icon.svg";
import { useEffect, useState } from "react";
import predefinedImage from "../../../images/home/image1.png";
import predefinedImage1 from "../../../images/home/image2.png";
import predefinedImage2 from "../../../images/home/image3.png";
import predefinedImage3 from "../../../images/home/image4.png";
import { ManyPhotosInput } from "../../tools/many-photo-input/many-photo-input";
import { Container, Row, Col } from "react-bootstrap";
import { FileDownloader } from "../views/file";
import { TextArea } from "../../tools/steady-group/textarea/textarea";
import { ImagesGallery } from "../../tools/imgs-gallery/imgs-gallery";

interface iProps{t:Function,values:any,setFieldValue:Function
  ,handleBlur:Function,edit:boolean,lang:string,imagesToShow?:string[]}
export const Data = ({t,values,setFieldValue,handleBlur,edit,lang,imagesToShow=[]}:iProps) => {
  const [images, setImages] = useState<string[]>(imagesToShow);

  const deleteImage = (num: number) => {
    let img_path=images[num]
    let arr = [...images].filter((ele, index) => index !== num);
    let pre_existed=  [...values['pre_defined_images']].filter((ele, index) => ele.path === img_path)[0]
    console.log(pre_existed)
    if (pre_existed && pre_existed.id) {
      let imgs_deleted=[...values['predefined_pictures_delete'],pre_existed.id]
      setFieldValue('predefined_pictures_delete',imgs_deleted)
    }
    setImages(arr);
    if (!pre_existed)setFieldValue('predefined_post_pictures',arr)
  };


  return (
    <Row className="gy-2 d-flex justify-content-center py-2">
      <Col sm={10} xs={11}>
        <TextArea
          name="description"
          label={t("Description")}
          value={lang==='en'? values.description.en:values.description.ar}
          setValue={setFieldValue}
          handleBlur={handleBlur}
          disabled={!edit}
        />
      </Col>
      
      <Col xs={11}>
        <FileDownloader edit={edit} 
        uploaded_files={values.files} 
        t={t} 
        setFieldValue={setFieldValue}
        name="files"
        value={values['files']}
        lang={lang}
         />
      </Col>
      <Col xs={11}>
        <Row className="gy-3">
          <Col xs={12}>
           { 
           edit ?
            <span className="fw-bold">{t("PredefinedPostPicture")}</span>:
            images && images.length>0? <span className="fw-bold">{t("PredefinedPostPicture")}</span>:''
            }
          </Col>
          <Col sm={12} xs={12} style={{ height: "174px" }}>
          {!edit? <ImagesGallery
                                                  images={values.pre_defined_images?values.pre_defined_images:[]}
                                                  height={'175px'}
                                                  /> :
          <ManyPhotosInput
            setValue={setFieldValue}
            images={images}
            name="predefined_post_pictures"
            value={values['predefined_post_pictures']}
            setImages={setImages}
           
          />
          }
          </Col>
          {edit &&
          (<Col xs={12}>
            <Col xs={12}>
              <Row className="gy-2 gy-sm-0 my-1 my-sm-0">
                {images && images.length>0?
               images.map((ele:string, index:number) => {
                  return (
                    <Col xs={4} key={index} className="uploadedImageContainer">
                      <div
                        className="deleteIcon"
                        onClick={() => deleteImage(index)}
                      >
                        <img src={Delete} />
                      </div>
                      <img src={ele} className="uploadedImage" />
                    </Col>
                  );
                }):''}
              </Row>
            </Col>
          </Col>)
          }
        </Row>
      </Col>
    </Row>
  );
};
