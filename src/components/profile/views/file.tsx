import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import fileIcon from "../../../images/file.svg";
import { GreenButton } from "../../tools/buttons/green-button";
import { Download } from "react-bootstrap-icons";
import Delete from "../../../images/delete-icon.svg";
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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let prefiles = e.target.files;
   
    if (prefiles && prefiles.length > 0 && prefiles[0]) {
      //let url= URL.createObjectURL(prefiles[0])
      let newFiles=[...value,(prefiles as FileList)[0]]

      setFiles((pre: any) => [...pre,(prefiles as FileList)[0] ]);
      setFieldValue(name,[...value,{file:(prefiles as FileList)[0],name:{en:(prefiles as FileList)[0].name,ar:(prefiles as FileList)[0].name}}])
    }
  };
  const downloadFile = (num: number) => {
    let anchor = document.querySelector(
      `#file_number_${num}`
    ) as HTMLAnchorElement;

    anchor.click();
  };
  const uploadFile = (num: number) => {
    let input = document.querySelector(
      `#file_input_number_${num}`
    ) as HTMLInputElement;

    input.click();
  };
  const deleteFile = (num: number) => {
    let newFiles = [...files].filter((ele, index) => index !== num);
    setFiles(newFiles);
    setFieldValue(name,newFiles)
  };

  return (
    <Col xs={12} className="files">
      <Row className="gy-1">
        <Col xs={12}>
          <span className="fw-bold">Files</span>
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
                    className="hide"
                    style={{ height: "1px" }}
                    onChange={handleFile}
                  />
                  <GreenButton label="Upload" fun={() => uploadFile(99)}>
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
                        <div
                          className="deleteIcon"
                          onClick={() => deleteFile(index)}
                        >
                          <img src={Delete} />
                        </div>
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
                          className="hide"
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
                        href={'#'}
                        download={ele.path?ele.path:'#'}
                        id={`file_number_${index}`}
                        
                      />
                      <GreenButton label="Download" fun={() => downloadFile(index)}>
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
