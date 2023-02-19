import  { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import "./multi-range.css";
interface iValue {min:number,max:number}
interface iProps{min:number,max:number,onChange:(value:iValue)=>void
       ,minVal:number,maxVal:number,name:string,onBlur:any,setFieldTouched:Function}
const MultiRangeSlider = ({ min, max, onChange ,minVal,maxVal,name,onBlur,setFieldTouched}:iProps) => {
  const {i18n}=useTranslation()
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value:number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
   
    if (minVal >= minValRef.current && minVal <= maxValRef.current -1) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);
  
      if (range.current) {
        if (i18n.language==='en') {

          range.current.style.left = `${minPercent}%`;
        }
        else {

          range.current.style.right = `${minPercent}%`;
        }
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
     else {
        range.current!.style.right = `0%`;
          range.current!.style.width = `100%`;
      }
    //   }
    // }
    // else {
    //   range.current!.style.right = `0%`;
    //     range.current!.style.width = `100%`;
    // }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
     if (maxVal <= maxValRef.current && maxVal>= minValRef.current +1) {
      const minPercent = getPercent(minValRef.current);
      const maxPercent = getPercent(maxVal);
      
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
     }
     else {
       range.current!.style.width='100%'
     }
  }, [maxVal, getPercent]);
 
  // Get min and max values when their state changes


  // set input size to parent size
  useEffect(()=>{
    let parent = document.getElementById('multi-range-slider-container') as HTMLDivElement
    let target =document.querySelector(`#multi-range-slider-thumb--right${name}`) as HTMLInputElement
    let target2 =document.querySelector(`#multi-range-slider-thumb--left${name}`) as HTMLInputElement
    target.style.width=`${parent.clientWidth}px`
    target2.style.width=`${parent.clientWidth}px`
  
  },[])

  return (
    <div className="multi-range-slider-container"
    id="multi-range-slider-container"  
    onClick={()=>setFieldTouched(name,true)}
    onTouchEnd={()=>setFieldTouched(name,true)}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={minVal >=minValRef.current && minVal<= maxValRef.current -1 ?minVal:minValRef.current}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          onChange({max:maxVal,min:value})
          minValRef.current = value;
        }}
        className="multi-range-slider-thumb multi-range-slider-thumb--left"
        style={{ zIndex: ((minVal > max - 100) && "5" ) as string}}
        id={`multi-range-slider-thumb--left${name}`}
     
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxVal >= minValRef.current +1 && maxVal <= maxValRef.current ?maxVal:maxValRef.current}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
        onChange({min:minVal,max:value})
          maxValRef.current = value;
        }}
        className="multi-range-slider-thumb multi-range-slider-thumb--right"
        id={`multi-range-slider-thumb--right${name}`}
    
      />

      <div className="multi-range-slider">
        <div className="multi-range-slider__track" />
        <div ref={range} className="multi-range-slider__range" />
        <div className="multi-range-slider__left-value"  >{minVal}</div>
        <div className="multi-range-slider__right-value"  >{maxVal}</div>
      </div>
    </div>
  );
};


export default MultiRangeSlider;
