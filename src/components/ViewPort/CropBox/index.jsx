import React from 'react';
import { FaTimes } from 'react-icons/fa';

import './cropBox.css';

const CropBox = props => {
  const { crop, index, active, removeCrop, img } = props;
  return (
    <div
      className={`crop-box ${!crop.disable && active ? 'active' : ''} ${crop.disable ? 'disable' : ''} `}
      style={{
        top: crop.top + 'px',
        left: crop.left + 'px',
        width: crop.width + 'px',
        height: crop.height + 'px',
        backgroundPosition: `-${crop.left + 1 + 'px'} -${crop.top + 1 + 'px'}`,
        backgroundImage: `url(${img})`
      }}
    >
      <div className="crop-header">
        <div className="crop-title">
          OBJ&nbsp;{index + 1}
          <FaTimes
            onClick={e => {
              removeCrop(index);
              e.stopPropagation();
            }}
            onMouseDown={e => {
              e.stopPropagation();
            }}
          />
        </div>

        <span className="crop-label">0 Classes</span>
      </div>
      <div className="crop-handle dir-nw" style={{ top: '-3px', left: '-3px' }} />
      <div className="crop-handle dir-n" style={{ top: '-3px', left: `${crop.width / 2 - 3}px` }} />
      <div className="crop-handle dir-ne" style={{ top: '-3px', left: `${crop.width - 3}px` }} />
      <div className="crop-handle dir-w" style={{ top: `${crop.height / 2 - 3}px`, left: '-3px' }} />
      <div className="crop-handle dir-e" style={{ top: `${crop.height / 2 - 3}px`, left: `${crop.width - 3}px` }} />
      <div className="crop-handle dir-sw" style={{ top: `${crop.height - 3}px`, left: '-3px' }} />
      <div className="crop-handle dir-s" style={{ top: `${crop.height - 3}px`, left: `${crop.width / 2 - 3}px` }} />
      <div className="crop-handle dir-se" style={{ top: `${crop.height - 3}px`, left: `${crop.width - 3}px` }} />
    </div>
  );
};

export default CropBox;
