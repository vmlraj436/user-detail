import './style.css';
import React, { useState } from 'react';
const BoxGrid = ({ count }) => {
  const boxes = [];

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      const boxKey = `box-${row}-${col}`;
      boxes.push(<div key={boxKey} className="box"></div>);
    }
  }

  const gridStyle = {
    gridTemplateColumns: `repeat(${count}, 1fr)`,
    gridTemplateRows: `repeat(${count}, 1fr)`,
  };

  return (
    <div className="box-grid" style={gridStyle}>
      {boxes}
    </div>
  );
};

const BoxGenerator = () => {
  const [boxCount, setBoxCount] = useState(0);

  const handleInputChange = (event) => {
    const input = parseInt(event.target.value, 10);
    setBoxCount(input);
  };

  return (
    
    <div>
      <div className="title-block">
        <h1>Grid Box Create</h1>
      </div>
      <div className="input-block">
        <input type="number" onChange={handleInputChange} placeholder='Enter the number'/>
      </div>
      <div className="ans-block">
        {boxCount > 0 && <BoxGrid count={boxCount} />}
      </div>      
    </div>
  );
};

export default BoxGenerator;
