import React from 'react';

const Cross = () => {
  return (
    <svg className='cross'>
      <g>
        <circle className="st1" cx="6" cy="6" r="6"/>
        <path className="st2" d="M6,0C2.7,0,0,2.7,0,6s2.7,6,6,6s6-2.7,6-6S9.3,0,6,0L6,0z"/>
      </g>
      <g>
        <line className="st3" x1="6" y1="54" x2="54" y2="6"/>
      </g>
      <line className="st3" x1="6" y1="6" x2="54" y2="54"/>
      <g>
        <circle className="st1" cx="54" cy="54" r="6"/>
        <path className="st2" d="M54,48c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S57.3,48,54,48L54,48z"/>
      </g>
      <g>
        <circle className="st1" cx="54" cy="6" r="6"/>
        <path className="st2" d="M54,0c-3.3,0-6,2.7-6,6s2.7,6,6,6c3.3,0,6-2.7,6-6S57.3,0,54,0L54,0z"/>
      </g>
      <g>
        <circle className="st1" cx="6" cy="54" r="6"/>
        <path className="st2" d="M6,48c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6s6-2.7,6-6C12,50.7,9.3,48,6,48L6,48z"/>
      </g>
    </svg>
  );
};

export {Cross};