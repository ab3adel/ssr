import React from "react";
import Form from "react-bootstrap/Form";
import Camera from "../../../images/auth/Icon-camera.svg";
import person from "../../../images/auth/profile.svg";
import "./photoInput.scss";
import { useState, useEffect } from "react";
interface iProps {
  value: any;
  error?: string;
  touched?: boolean;
  setValue: Function;
  name: string;
  width?: number;
  height?: number;
  default_image?: string;
}
export const InputFile = ({
  value,
  error,
  touched,
  setValue,
  name,
  width,
  height,
  default_image,
}: iProps) => {
  const [uploadedImage, setUploadedImage] = useState(value);
  const handleFile = () => {
    let input = document.querySelector("#input") as HTMLInputElement;
    input.click();
  };
  const handleChange = (e: React.ChangeEvent) => {
    let input = e.target as HTMLInputElement;
    let file = null;

    if (input.files && input.files?.length > 0) {
      file = input.files[0];

      if (file) {
        let objUrl = URL.createObjectURL(file);
        setUploadedImage(objUrl);
        setValue(name, file);
      }
    }
  };
  const handleImage = () => {
    if (value) {
      let objUrl = URL.createObjectURL(value as File);
      setUploadedImage(objUrl);
    }
  };
  useEffect(() => {
    if (default_image) setUploadedImage(default_image);
  }, []);
  useEffect(() => {
    if (value ) {
      if (typeof(value)=== 'string') setUploadedImage(value)
      else {

        let objUrl = URL.createObjectURL(value);
        setUploadedImage(objUrl);
      }
    }
  }, [value]);

  return (
    <Form.Group className="photoInput">
      <div
        className={
          Boolean(error)
            ? "iconContainer is_invalid  mx-auto"
            : "iconContainer  mx-auto"
        }
        onClick={handleFile}
        style={{
          height: height ? `${height}px` : "",
          width: width ? `${width}px` : "",
        }}
      >
        {uploadedImage ? (
          <img
            src={uploadedImage}
            className="profile"
            style={{
              height: height ? `${height}px` : "",
              width: width ? `${width}px` : "",
            }}
          />
        ) : (
          <img
            src={person}
            className=" person"
            style={{
              height: height ? `${height / 2}px` : "",
              width: width ? `${width / 2}px` : "",
            }}
          />
        )}

        <div
          className="cameraContainer icon"
          style={{
            height: height ? `${height / 3}px` : "",
            width: width ? `${width / 3}px` : "",
          }}
        >
          <img
            src={Camera}
            className=" camera"
            style={{
              height: height ? `${height / 5}px` : "",
              width: width ? `${width / 5}px` : "",
            }}
          />
        </div>
      </div>
      <Form.Control
        type={"file"}
        className="input"
        id="input"
        onChange={handleChange}
      />
    </Form.Group>
  );
};
