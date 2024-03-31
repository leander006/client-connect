import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

function Spinner({size}:any) {
  return (
    <div style={{ width: '100px', margin: 'auto', display: 'block' }}>
      <ClipLoader color="#52bfd9" speedMultiplier={2} size={size}/>
    </div>
  );
};

export default Spinner;