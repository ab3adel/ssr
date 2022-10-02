import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import upload from "../../../images/upload-icon.svg";

import "./many-input.scss";

interface iProps {
  value: any;
  error?: any;
  touched?: boolean;
  setValue: Function;
  name: string;
  handleBlur?: any;
  images: string[];
  setImages: Function;
  externalButton?: boolean;
}
export const ManyPhotosInput = ({
  images,
  setImages,
  value,
  setValue,
  name,
  handleBlur,
  error,
  touched,
  externalButton = false,
}: iProps) => {
  const handleChange = (e: React.ChangeEvent) => {
    let input = e.target as HTMLInputElement;
    let file = null;
    if (input.files && input.files?.length > 0) {
      file = input.files[0];
    }
    if (file) {
      let arr = [...images];
      let files_arr = [...value];
      files_arr.push(file);
      let objUrl = URL.createObjectURL(file);
      arr.push(objUrl);
      setValue(name, files_arr);
      setImages(arr);
    }
  };
  const hanldeInput = () => {
    let input = document.querySelector("#manyInput") as HTMLInputElement;
    if (input) {
      input.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      let file = e.dataTransfer.files[0];
      if (file) {
        let arr = [...images];
        let files_arr = [...value];
        let objUrl = URL.createObjectURL(file);
        arr.push(objUrl);
        setValue(name, files_arr);
        setImages(arr);
      }
    }
  };

  return (
    <Row
      className="manyPhotosContainer gy-2 m-sm-0 "
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Col xs={12} className="inputContainer">
        <div className="icon" onClick={hanldeInput}>
          <img src={upload} />
          <span className="text">Click to upload</span>
          <span className="faintText">or drag and drop here</span>
          {externalButton && (
            <button className="externalBtn">
              Choose from predefined pictures
            </button>
          )}
        </div>
        <Form.Control
          type={"file"}
          className="input"
          id="manyInput"
          onChange={handleChange}
        />
      </Col>
    </Row>
  );
};
