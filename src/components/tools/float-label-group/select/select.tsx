import "./select.scss";
import { iSelect } from "../../interface";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export const Select = ({
  error,
  touched,
  options,
  label,
  handleBlur,
  setSelect,
  tempSelect,
  multiSelect,
  name,
  selectedValue
  
}: iSelect) => {
  const { i18n } = useTranslation();
  const [flaot, setFloat] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
 const [selected,setSelected]=useState('')
  const [selection, setSelection] = useState(options);
  const handleChange = (e: React.ChangeEvent) => {
    setHasSelection(true);
    let select = e.target as HTMLSelectElement;

    if (select.value) {
      setHasSelection(true);
      if (multiSelect) {
        if (Array.isArray(selectedValue)) {
          let newValue=selectedValue
          if (newValue.includes(select.value)) return
          newValue.push(select.value)
          if (typeof setSelect === "function") {
              setSelect(name,newValue)
              setSelected(label)
          }
        }
      }
      else {

        if (typeof setSelect === "function") {
          let value: any = select.value;
          if (!isNaN(select.value as any)) value = parseInt(select.value);
          setSelect(name, value);
          setSelected(name?name:'')
        }

        if (typeof tempSelect === "function") {
          tempSelect(select.value);
        }
      }
    }
  };
  useEffect(() => {
    if (options && options.length > 0) {
      setSelection((pre: any) => options);
    }
  }, [options]);
  const checkTyping = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === "") {
      setFloat(false);
    }
  };
  const focused = () => {
    setHasSelection(true)
  };
  const onBlur=(e:React.FocusEvent)=>{

    if (typeof(handleBlur) === 'function'){
        handleBlur(name,true)
    }
}
  return (
    <Form.Group
      className="floatedSelect"
      onClick={focused}
      onBlur={checkTyping}
    >
      <div className={ "label float" }>{label}</div>
      <Form.Select
        className={hasSelection ? "mySelect hasSelection " : "mySelect lightLable "}
        onChange={handleChange}
        as={"select"}
        name={name}
        style={
          i18n.language === "ar"
            ? { backgroundPosition: "left 0.75rem center" }
            : { backgroundPosition: "right 0.75rem center" }
        }
        onBlur={onBlur}
        isInvalid={touched && Boolean(error)}
        
       
       
      >
        <option className="lightLable"  selected disabled={true}>
          {selection && selection.length > 0 ? <>{label}</> : <>...loading</>}
        </option>

        {selection && selection.length > 0
          ? selection.map((ele, index) => {
              return (
                <option value={ele.value} key={index}>
                  {ele.name}
                </option>
              );
            })
          : ""}
      </Form.Select>
      {touched && error && (
        <Form.Control.Feedback
          style={i18n.language === "en" ? { left: "40%" } : { right: "40%" }}
        >
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
