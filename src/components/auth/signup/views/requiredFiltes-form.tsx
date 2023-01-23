import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./forms.scss";
import { Textarea } from "../../../tools/textarea/textarea";
import { FileInput } from "../../../tools/fileInput/fileInput";
import { ManyPhotosInput } from "../../../tools/many-photo-input/many-photo-input";
import { useEffect, useState } from "react";
import Delete from "../../../../images/delete-icon.svg";
import { useTranslation } from "react-i18next";

import { InitialValues, iTouched, iErrors } from "../initial-values";
import { Formik } from "formik";
interface iFile {
  en: string;
  ar: string;
}
interface iProps {
  touched: Partial<iTouched>;
  errors: Partial<iErrors>;
  values: Partial<InitialValues>;
  handleBlur: Function;
  setValue: Function;
  requiredFiles: iFile[];
  setField: Function;
  type: string;
}
export const RequiredFilesForm = ({
  touched,
  errors,
  values,
  handleBlur,
  setValue,
  requiredFiles,
  setField,
  type,
}: iProps) => {
  const { t, i18n } = useTranslation();
  const [images, setImages] = useState<string[]>([]);
  const deleteImage = (num: number, img: string) => {
    let arr = [...images].filter((ele, index) => index !== num);
    let predefined_post_pictures_arr = values.predefined_post_pictures?.filter(
      (ele, index) => index !== num
    );
    setValue("predefined_post_pictures", predefined_post_pictures_arr);
    setImages(arr);
  };
  useEffect(() => {
    if (
      values.predefined_post_pictures &&
      values.predefined_post_pictures?.length > 0
    ) {
      let arr: string[] = values.predefined_post_pictures
        .map((ele) => {
          let objUrl = URL.createObjectURL(ele.file);
          return objUrl;
        })
        .filter((ele) => ele);

      if (arr && arr.length > 0) setImages(arr);
    }
  }, []);
  if (type === "News") {
    return (
      <Row className="requiredFilesContainer gy-3 my-1">
        <Col sm={8} xs={12} className="my-3">
          <Textarea
            touched={touched.description as boolean}
            error={errors.description as string}
            value={values.description}
            setValue={setValue}
            handleBlur={handleBlur}
            name="description"
          />
        </Col>
      </Row>
    );
  }

  return (
    <Row className="requiredFilesContainer gy-3">
      <Col sm={8} xs={12}>
        <Textarea
          touched={touched.description as boolean}
          error={errors.description as string}
          value={values.description}
          setValue={setValue}
          handleBlur={handleBlur}
          name="description"
        />
      </Col>

      {requiredFiles.length > 0 && (
        <>
          <Col sm={8} xs={12}>
            <div className="text">{t("RequiredFiles")}</div>
          </Col>
          {requiredFiles.map((ele, index) => (
            <Col sm={8} xs={12} key={index}>
              <FileInput
                label={i18n.language === "en" ? ele.en : ele.ar}
                name="files"
                value={values.files}
                setValue={setField}
                error={errors.files as string}
                touched={touched.files as boolean}
                handleBlur={handleBlur}
                fileName={{ en: ele.en, ar: ele.ar }}
                fileIndex={index}
              />
            </Col>
          ))}
        </>
      )}
      <Col sm={8} xs={12}>
        <div className="text">{t("PredifinedPostPictures")}</div>
      </Col>
      <Col sm={8} xs={12}>
        <ManyPhotosInput
          images={images}
          setImages={setImages}
          value={values.predefined_post_pictures}
          error={values.predefined_post_pictures}
          setValue={setValue}
          name="predefined_post_pictures"
        />
      </Col>
      <Col sm={8} xs={12}>
        <Col xs={12}>
          <Row>
            {images.map((ele, index) => {
              return (
                <Col xs={4} key={index} className="uploadedImageContainer">
                  <div
                    className="deleteIcon"
                    onClick={() => deleteImage(index, ele)}
                  >
                    <img src={Delete} />
                  </div>
                  <img src={ele} className="uploadedImage" />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Col>
    </Row>
  );
};
