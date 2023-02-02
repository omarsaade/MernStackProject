import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState(); // object kelo
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    // console.log(fileReader);
    fileReader.onload = () => {
      //2
      setPreviewUrl(fileReader.result);
    };
    //1
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid; //false
    // console.log(event.target); //  <input../>
    // console.log(event.target.files); // FileList {0: File, length: 1}
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]; //{}
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // console.log(props.id); //image
    // validation  image     {}            true
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        // after choosing file
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
