import React from 'react';
import './style.css';

export const FlyButton = (props) => {
  return (
    <div className='flyButton'>
      <button style={{animation: `btn  4s infinite cubic-bezier(${props.timing})`}} onClick={props.cb}>{props.name}</button>
      <div id='shadow' style={{animation: `shadow  4s infinite cubic-bezier(${props.timing})`}}></div>
    </div>
  );
};
