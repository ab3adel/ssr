import React, { useCallback, useEffect, useState, useRef, RefObject } from "react";
import PropTypes from "prop-types";
import "./multi-range.css";
interface iValue {min:number,max:number}
interface iProps{min:number,max:number,onChange:(value:iValue)=>void
       ,minVal:number,maxVal:number,name:string}
const MultiRangeSlider = ({ min, max, onChange ,minVal,maxVal,name}:iProps) => {

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
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
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
    id="multi-range-slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
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
        value={maxVal}
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
        <div className="multi-range-slider__left-value">{minVal}</div>
        <div className="multi-range-slider__right-value">{maxVal}</div>
      </div>
    </div>
  );
};


export default MultiRangeSlider;
