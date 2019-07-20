import React from 'react';

import './dot.css';

const Dot = props => {
  const { dot } = props;
  return <div className="dot" style={{ left: `${dot.x - 3}px`, top: `${dot.y - 3}px` }} />;
};

export default Dot;
