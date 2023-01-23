import { Col, Row } from "react-bootstrap";
import { useState ,useContext} from "react";
import fileIcon from "../../../images/file.svg";
import { GreenButton } from "../../tools/buttons/green-button";
import { Download } from "react-bootstrap-icons";
import Delete from "../../../images/delete-icon.svg";
import axios from '../../tools/apis/axios'
import notificationContext from "../../tools/context/notification/notification-context";


interface iProps {
  edit: boolean;
  uploaded_files: any[];
  t: Function;
  name:string;
  setFieldValue:Function;
  value:any,
  lang:string
}
export const FileDownloader = ({ edit, uploaded_files, t ,setFieldValue,name,value,lang}: iProps) => {
  const [files, setFiles] = useState<File[]>([]);
const {setNotify}=useContext(notificationContext)
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let prefiles = e.target.files;
   
    if (prefiles && prefiles.length > 0 && prefiles[0]) {
      //let url= URL.createObjectURL(prefiles[0])
      let newFiles=[...value,(prefiles as FileList)[0]]

      setFiles((pre: any) => [...pre,(prefiles as FileList)[0] ]);
      setFieldValue(name,[...value,{file:(prefiles as FileList)[0]
        ,name:{en:(prefiles as FileList)[0].name,ar:(prefiles as FileList)[0].name}}])
    }
  };
  const downloadFile = (num: number,path:string,fileName:string) => {
    let anchor = document.querySelector(
      `#file_number_${num}`
    ) as HTMLAnchorElement;
    fetch(path)
    .then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
      
        anchor.href = url;
        anchor.download = fileName;
        anchor.click();
      });
    })
    .catch(err=>{
      anchor.click()
    })
    //anchor.click();
  };

  const uploadFile = (num: number) => {
    let input = document.querySelector(
      `#file_input_number_${num}`
    ) as HTMLInputElement;
    
  
    input.click();
  };
  const deleteFile = (has_id:boolean,num: number) => {
   
    let newFiles:any[]=[]
    if (has_id) {
      newFiles=uploaded_files.filter((ele)=>ele.id !== num)
    }
    else {

       newFiles =uploaded_files.filter((ele, index) => index !== num);
    }
    
    setFiles(newFiles);
    setFieldValue(name,newFiles)
  };


  return (
    <Col xs={12} className="files">
      <Row className="gy-1">
        <Col xs={12}>
        { edit ?
        <span className="fw-bold">{t("Files")}</span>:
        value && value.length>0?  <span className="fw-bold">{t("Files")}</span>:
        ''}
        </Col>

        <Col xs={12}>
          <Row className="gy-2 ">
            {edit && (
              <>
                <Col
                  sm={5}
                  xs={6}
                  className="d-flex justify-content-center flex-column align-items-center file mx-1 position-relative"
                >
                  <img
                    src={fileIcon}
                    style={{ width: "24px", height: "28px" }}
                  />
                  <span
                    className="fw-bold text-center my-2 "
                    style={{ fontSize: "12px" }}
                  >
                    {t("NewFile")}
                  </span>
                  <input
                    type="file"
                    id={`file_input_number_${99}`}
                    className="invisible"
                    style={{ height: "1px" }}
                    onChange={handleFile}
                  />
                  <GreenButton label={t("Upload")} fun={() => uploadFile(99)}>
                    <Download style={{ transform: "rotate(180deg)" }} />
                  </GreenButton>
                </Col>
                <Col xs={12}>
                 
                </Col>
              </>
            )}
            {uploaded_files
              ? uploaded_files.map((ele, index) => {
                  if (edit) {
                    return (
                        <Col
                        sm={3}
                        xs={5}
                        key={index}
                        className="d-flex justify-content-center flex-column align-items-center file mx-1 position-relative"
                      >
                        {/* <div
                          className="deleteIcon"
                          onClick={() => deleteFile(ele.id?true:false,ele.id?ele.id:index)}
                        >
                          <img src={Delete} />
                        </div> */}
                        <img
                          src={fileIcon}
                          style={{ width: "24px", height: "28px" }}
                        />
                        <span
                          className="fw-bold text-center my-2 "
                          style={{ fontSize: "0.8rem" }}
                        >
                          {ele.name ?lang==='en'? ele.name.en:ele.name.ar : "file_name"}
                        </span>
                        <input
                          type="file"
                          id={`file_input_number_${99}`}
                          className="invisible"
                          style={{ height: "1px" }}
                          onChange={handleFile}
                        />
                        {/* <GreenButton label='Upload' 
                            fun={()=>uploadFile(99)}>
                                <Download style={{transform:'rotate(180deg)'}}/>
                            </GreenButton> */}
                      </Col>
                    );
                  }
                  return (
                    <Col
                      sm={3}
                      xs={5}
                      key={index}
                      className="d-flex justify-content-center flex-column align-items-center file mx-1"
                    >
                      <img
                        src={fileIcon}
                        style={{ width: "24px", height: "28px" }}
                      />
                      <span
                        className="fw-bold text-center my-2 "
                        style={{ fontSize: "12px" }}
                      >
                        {ele.file_name?lang==='en'?ele.file_name.en:ele.file_name.ar:'file_name'}
                      </span>
                      <a
                       href={ele.path}
                        download={lang==='en'?ele.file_name.en:ele.file_name_ar}
                        target="_blank"
                        id={`file_number_${index}`}
                        
                      />
                      <GreenButton label={t("Download" )}fun={() => downloadFile(index,ele.path,lang==='en'?ele.file_name.en:ele.file_name_ar)}>
                        <Download />
                      </GreenButton>
                    </Col>
                  );
                })
              : ""}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
