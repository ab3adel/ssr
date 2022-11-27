import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { SteadyIconInput } from "../../tools/steady-group/steady-icon-input/steady-icon-input";
import { TextArea } from "../../tools/steady-group/textarea/textarea";
import { FileDownloader } from "../views/file";
import { ImagesGallery } from "../../tools/imgs-gallery/imgs-gallery";
import { SteadySelect } from "../../tools/steady-group/steady-select/select";
import { XCircle } from "react-bootstrap-icons";
import { SteadyPhoneInput } from "../../tools/steady-group/steady-phone-input/steady-phone";
import i18n from "../../../i18n";
import React, { useEffect, useRef, useState } from "react";
interface iProps {
  company: boolean;
  edit: boolean;
  values?: any;
  handleChange: (e: React.ChangeEvent) => void;
  publicProfile?: boolean;
  t: Function;
  role?: string;
  setFieldValue: Function;
  handleBlur: (e: React.FocusEvent) => void;
  lang: string;
  countries?: any;
  categories?: any;
  roles?:any
  area?: any;
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  setCountry?:Function
}
let editCompany = [
  { label: "CompanyType", name: "role", type: "select" },
  { label: "Category", name: "category", type: "select" },
  { label: "PhoneNumber ", name: "phone_number", type: "phone" },
  { label: "Email", name: "email", type: "text" },
  { label: "PACIID", name: "PACIID", type: "text" },
  { label: "Website", name: "website", type: "text" },
];

let companyInfo = [
  { label: "CompanyType", name: "role", type: "select" },
   {label:'Category',name:'category',type:'select'},
  { label: "PhoneNumber ", name: "phone_number", type: "phone" },
  { label: "Email", name: "email", type: "text" },
  { label: "PACIID", name: "PACIID", type: "text" },
  { label: "Website", name: "website", type: "text" },
  { label: "Country", name: "country", type: "select" },
  { label: "Area", name: "area", type: "select" },
  { label: "Block", name: "block", type: "text" },
  { label: "Avenue", name: "avenue", type: "text" },
  { label: "Street", name: "street", type: "text" },
  { label: "Building", name: "building", type: "text" },
  { label: "Floor", name: "floor", type: "text" },
  { label: "Flat", name: "flat", type: "text" },
];

let userInfo = [
  { label: "PhoneNumber ", name: "phone_number", type: "phone" },
  { label: "Email", name: "email", type: "text" },
  { label: "Country", name: "country", type: "select" },
  { label: "Area", name: "area", type: "select" },
  { label: "Block", name: "block", type: "text" },
  { label: "Avenue", name: "avenue", type: "text" },
  { label: "Street", name: "street", type: "text" },
  { label: "Building", name: "building", type: "text" },
  { label: "Floor", name: "floor", type: "text" },
  { label: "Flat", name: "flat", type: "text" },
  { label: "PACIID", name: "PACIID", type: "text" },
];

export const Info = ({
  company,
  edit,
  values,
  handleChange,
  publicProfile = false,
  t,
  setFieldValue,
  handleBlur,
  lang,
  countries,
  categories,
  roles,
  area,
  errors,
  touched,
  setCountry=()=>{}
}: iProps) => {
  const [selectedCategroy, setSelectedCategroy] = useState<any[]>(company? values['category']:[]);
  const [phoneNumbers,setPhoneNumbers]=useState(values["pre_existed_phone_numbers"])
  if (edit) companyInfo = editCompany;
  let info = company ? companyInfo : userInfo;
  let updatedOnce=useRef<boolean>(false)

useEffect(()=>{
if (values) {
  if (values['pre_existed_phone_numbers'] && !updatedOnce.current){
    setPhoneNumbers(values["pre_existed_phone_numbers"])
    updatedOnce.current=true
  }

}
},[values])


  const deletePhoneNumber = (id: number) => {
    let newPhones = [...phoneNumbers].filter(
      (ele, index) => index !== id
    );
    setPhoneNumbers(newPhones)
   if (phoneNumbers[id] && phoneNumbers[id].id) {
    let deleted_numbres= [...values['phone_numbers_delete']]
    if (phoneNumbers[id].primary) {
      setFieldValue('phone_number_old_primary',phoneNumbers[id].id)
    }
    if (!deleted_numbres.includes(phoneNumbers[id].id))deleted_numbres.push(phoneNumbers[id].id)
    setFieldValue('phone_numbers_delete',deleted_numbres)
  }
  else {
    let newPhones= [...values['phone_numbers']].filter((ele,index)=> ele.phone !== phoneNumbers[id].phone)
    setFieldValue('phone_numbers',newPhones)
  }
   
  };
  const deleteCategory = (id: number) => {
    let newCategories = [...selectedCategroy].filter(
      (ele, index) => ele.id !== id
    );
    let use_category_ids= values['category'].filter((ele:any)=> (ele.id ===id) )

    if (
      use_category_ids.length >0 &&
      !values["category_ids_delete"].includes(id)
    ) {
      let deletedCategories = [...values["category_ids_delete"], id];
      setFieldValue("category_ids_delete", deletedCategories);
    }

    
    if (values["category_ids"].includes(id)) {
      let newCategories_ids = [...values["category_ids"]].filter(
        (ele) => ele !== id
      );
      setFieldValue("category_ids", newCategories_ids);
    }

    setSelectedCategroy(newCategories);
  };
  const addCategory = (id:number) => {
    if (values["category_ids"].includes(id) || selectedCategroy.length ===3) return;
    let category = categories.filter((ele: any) => ele.id === id)[0];
    let newCategroyIds = [...values["category_ids"], id];
    let newAddedCategory = [...selectedCategroy, category];
    let existed_before=values['category'].filter((ele:any)=>ele.id === id)
    
    if (values['category_ids_delete'].includes(id)) {
      let new_deleted_ids=values['category_ids_delete'].filter((ele:number)=>ele !== id)
      setFieldValue('category_ids_delete',new_deleted_ids)
    }
    if (existed_before.length ===0)setFieldValue("category_ids", newCategroyIds);
    setSelectedCategroy(newAddedCategory);
  };
  const addPhone =(value:any)=>{
    let is_already_existed= values['pre_existed_phone_numbers'].map((ele:any)=>{
      if (ele.phone === value.phone) return true
      return null
    }).filter((ele:any)=>ele)
    if (is_already_existed.length === 0) {

      setPhoneNumbers((pre:any)=>[...pre,value])
      setFieldValue('phone_numbers',[...values['phone_numbers'],value])
    }
  }
  const addArea = (id: number) => {
    setFieldValue("area_id", id);
  };
  const addCountry = (id: number) => {
    setCountry(id);
  }

  return (
    <Col xs={12} className="infoContainer">
      <Col xs={12} className="p-sm-1 p-0">
        <Row className="d-flex justify-content-center">
          <Col sm={10} xs={12}>
            <Row className="p-sm-1 pb-3 pb-sm-1 justify-content-start gy-sm-2">
              {info.map((ele, index: number) => {
                if (ele.type === "select" ) {
                  if (ele.name === 'category' && (values['role'].id <=3)) { 
                    return <React.Fragment key={index}></React.Fragment>
                  }
                  return (
                    <React.Fragment key={index}>
                      <Col sm={6} xs={12} >
                        <SteadySelect
                          label={t(ele.label)}
                          name={ele.name}
                          options={
                            edit
                              ? 
                                (ele.name ==='role' && roles)||
                                (ele.name === "category" && categories) ||
                                (ele.name === "country" && countries) ||
                                (ele.name === "area" && area)
                              : [values[ele.name]]
                          }
                          disabled={!edit || ele.name==='role'}
                          value={values[ele.name]}
                          exteriorFunction={

                           ( ele.name === "category" && addCategory ) ||
                           (!company && ele.name==='area' && addArea) ||
                           (!company && ele.name==='country' && addCountry) ||
                         (  ()=>{})
                          
                          }
                          handleBlur={handleBlur}
                          error={errors ? errors[ele.name] : ""}
                          touched={touched ? touched[ele.name] : false}
                        />
                      </Col>
                      {ele.name === "category" && (
                        <Col xs={12} key={index+10}>
                          <Row className="gy-1">
                            {selectedCategroy.length > 0
                              ? selectedCategroy.map(
                                  (ele: any, index: number) => (
                                    <Col xs={4} key={index+1}>
                                      <div className="phoneNumber">
                                        <span>
                                          {i18n.language === "en"
                                            ? ele.name.en
                                            : ele.name.ar}
                                        </span>
                                        {edit && (
                                          <XCircle
                                            className="icon"
                                            onClick={() =>
                                              deleteCategory(ele.id)
                                            }
                                          />
                                        )}
                                      </div>
                                    </Col>
                                  )
                                )
                              : ""}
                          </Row>
                        </Col>
                      )}
                    </React.Fragment>
                  );
                
                }
                if (ele.type === "phone") {
                  return (
                    <Col xs={12} key={index}>
                      <Row className="gy-1">
                        <Col sm={6} xs={12}>
                          <SteadyPhoneInput
                            label={t("phone")}
                            disabled={!edit}
                            value={values["phone_numbers"]}
                            exteriorFunction={addPhone}
                            name="phone_numbers"
                          />
                        </Col>
                        <Col xs={12}>
                          <Row className="gy-2">
                            {phoneNumbers&&
                          phoneNumbers.length > 0
                              ? phoneNumbers.map(
                                  (ele: any, index: number) => (
                                    <Col xs={4} key={index+1}>
                                      <div className="phoneNumber">
                                        <span>{ele.phone}</span>
                                        {edit && (
                                          <XCircle
                                            className="icon"
                                            onClick={() =>
                                              deletePhoneNumber(index)
                                            }
                                          />
                                        )}
                                      </div>
                                    </Col>
                                  )
                                )
                              : ""}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  );
                }

                return (
                  <Col sm={6} xs={12} key={index}>
                    <SteadyIconInput
                      label={t(ele.label)}
                      name={ele.name}
                      type="text"
                      disabled={edit ? false : true}
                      value={values ? values[ele.name] : ""}
                      onChange={handleChange}
                      error={errors ? errors[ele.name] : ""}
                      touched={touched ? touched[ele.name] : false}
                      handleBlur={handleBlur}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          {company && (
            <Row className="gy-2 d-none d-sm-flex justify-content-center p-0">
              <Col sm={10} xs={12}>
                <TextArea
                  name="description"
                  label="Description"
                  value={
                    lang === "en"
                      ? values.description.en
                      : values.description.ar
                  }
                  setValue={setFieldValue}
                  handleBlur={handleBlur}
                />
              </Col>

              {!publicProfile && (
                <>
                  <Col sm={10} xs={12}>
                    <FileDownloader
                      edit={edit}
                      uploaded_files={[]}
                      t={t}
                      setFieldValue={setFieldValue}
                      name="files"
                      value={values["files"]}
                      lang={lang}
                    />

                  </Col>
                  <Col sm={10} xs={12}>
                    <Row className="gy-2">
                      <Col xs={12}>
                        <span className="fw-bold">
                          Predefined Post Pictures
                        </span>
                      </Col>
                      <Col sm={9} xs={12} style={{ height: "174px" }}>
                        <ImagesGallery
                          images={values.pre_defined_images}
                          height={"175px"}
                        />
                      </Col>
                    </Row>
                  </Col>
                </>
              )}
            </Row>
          )}
        </Row>
      </Col>
    </Col>
  );
};
