import "./multi-select.scss";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";

interface iProps {
  label: string;
  options: any[];
  setSelect: Function;
  error?: string;
  touched?: boolean;
  name: string;
  handleBlur: Function;
  needCategory?: boolean;
  selectedValues: number[];
  clearAll:boolean
}
interface iValue{value:number,label:string}
export const MyMultiSelect = ({
  label,
  options,
  setSelect,
  error,
  touched,
  name,
  handleBlur,
  needCategory,
  selectedValues,
  clearAll
}: iProps) => {
  const [selected, setSelected] = useState<iValue[]>([]);
  const menuToggleHandler = () => {
    handleBlur(name, true);
  };
  const handleChange = (e: any) => {
    let ids = e.map((ele: any) => ele.value);
    setSelect("category_ids", ids);

    setSelected(e);
  };
  useEffect(() => {
    let target = document.querySelector(
      ".myMultiSelect > .dropdown-container > .dropdown-heading > .dropdown-heading-value"
    ) as HTMLDivElement;
  
    if (target && label && selected.length===0) {
      target.children[0].innerHTML = label;
    }
   
  },[]);
  useEffect(()=>{
   
      if (selectedValues && selectedValues.length>0) {
       
        let newSelected=options.map((ele)=>{
            if (selectedValues.includes(ele.value)) {
                return ele
            }
          
            return null
        }).filter(ele=>ele)
        if (newSelected.length>0) {
           
          
            setSelected(newSelected)
        }
    }
  },[])
  useEffect(()=>{
    if (clearAll) {
      setSelected([])
    }
  },[clearAll])

  return (
    <div
      className={
        Boolean(error) && touched 
          ? "myMultiSelectContainer invalid"
          : "myMultiSelectContainer"
      }
    >
      <MultiSelect
        className={
          selected.length > 0
            ? "myMultiSelect selected has-value"
            : "myMultiSelect"
        }
        labelledBy={label}
        value={selected}
        onChange={handleChange}
        options={options}
        onMenuToggle={menuToggleHandler}
        disabled={needCategory ? (options.length > 0 ? false : true) : true}
        
      />

      {Boolean(error) && touched ? (
        <span className="invalid"> {error}</span>
      ) : (
        ""
      )}
    </div>
  );
};
