import "./select.scss";
import { iSelect, iOption } from "../../interface";
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
  selectedValue,
}: iSelect) => {
  const { i18n } = useTranslation();
  const [flaot, setFloat] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [selected, setSelected] = useState("");
  const [selection, setSelection] = useState<iOption[]>(options as iOption[]);
  const handleChange = (e: React.ChangeEvent) => {
    console.log(e)
    setHasSelection(true);
    let select = e.target as HTMLSelectElement;

    if (select.value) {
      setHasSelection(true);
      if (multiSelect) {
        if (Array.isArray(selectedValue)) {
          let newValue = [...selectedValue];

          if (newValue.includes(select.value)) return;
          newValue.push(select.value);

          if (typeof setSelect === "function") {
            setSelect(name, newValue);
            setSelected(label);
          }
        }
      } else {
        if (typeof setSelect === "function") {
          let value: any = select.value;
          if (!isNaN(select.value as any)) value = parseInt(select.value);
          setSelect(name, value);
          setSelected(name ? name : "");
        }

        if (typeof tempSelect === "function") {
          tempSelect(select.value);
        }
      }
    }
  };
  useEffect(() => {
    setSelection((pre: any) => options as iOption[]);
  }, [options]);
  const checkTyping = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value === "") {
      setFloat(false);
    }
    if (typeof handleBlur === "function") {
      handleBlur(e);
    }
  };
  const focused = () => {
    setHasSelection(true);
  };
  const onBlur = (e: React.FocusEvent) => {
    if (typeof handleBlur === "function") {
      handleBlur(e);
    }
  };

  return (
    <Form.Group
      className="floatedSelect"
      onClick={focused}
      onBlur={checkTyping}
    >
      <div
        className={"label float fw-bold"}
        style={
          i18n.language === "en"
            ? { right: "auto", left: "1rem" ,background:selection && (selection as []).length > 0 ?'':'transparent'}
            : { left: "auto", right: "1rem",background:selection && (selection as []).length > 0 ?'':'transparent' }
             
        }
      >
        {label}
      </div>
      <Form.Select
        className={
          hasSelection ? "mySelect hasSelection " : "mySelect lightLable "
        }
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
        disabled={selection && (selection as []).length > 0 ? false : true}
        value={selectedValue || ""}
        
      >
        <option className="lightLable"  disabled={true}>
          {selection && selection.length > 0 ? <>{""}</> : <>...</>}
        </option>

        {selection && selection.length > 0
          ? selection.map((ele, index) => {
              return (
                <option value={ele.value} key={index}>
                  {i18n.language === "en" ? ele.title?.en : ele.title?.ar}
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
