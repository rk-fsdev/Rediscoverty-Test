import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setCrops } from '../../redux/cropbox/actions';

import CropBox from './CropBox';
import Dot from './Dot';
import img from '../../imgs/background2.jpg';
import './viewPort.css';

class ViewPort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffPosX: 0,
      buffPosY: 0,
      isMoving: false,
      isHandling: false,
      active: -1,
      handle: -1,
      basePos: {},
      buffPtArr: []
    };
  }
  static propTypes = {
    crops: PropTypes.array
  };

  componentDidMount() {
    setTimeout(this.setBasePos, 300);
  }

  setBasePos = () => {
    const imgContainer = document.getElementsByClassName('image-container')[0];
    const left = imgContainer.offsetLeft;
    const top = imgContainer.offsetTop;
    const right = left + imgContainer.offsetWidth;
    const bottom = top + imgContainer.offsetHeight - 3;

    this.setState({ basePos: { left, top, right, bottom } });
  };

  getCropIndex = (x, y) => {
    const { crops } = this.props.cropbox;
    let index = -1;
    crops.forEach((data, id) => {
      const dx = x - data.left;
      const dy = y - data.top;
      if (0 < dx && dx < data.width && 0 < dy && dy < data.height) index = id;
    });
    return index;
  };

  getHandle = (x, y) => {
    const { crops } = this.props.cropbox;
    const { active } = this.state;
    let handle = -1;
    if (active === -1) return handle;
    crops[active].handles.forEach((data, index) => {
      if (x < data.left || x > data.right || y < data.top || y > data.bottom) return;
      handle = index;
    });
    return handle;
  };

  onMouseDown = e => {
    if ('buttons' in e) {
      if (e.buttons !== 1) return;
    } else {
      if ((e.which || e.button) !== 1) return;
    }
    this.setBasePos();
    const { basePos, buffPtArr } = this.state;
    const x = e.clientX - basePos.left;
    const y = e.clientY - basePos.top;
    const active = this.getCropIndex(x, y);
    const handle = this.getHandle(x, y);
    console.log(handle, active);

    this.setState({
      buffPosX: e.clientX,
      buffPosY: e.clientY,
      isMoving: handle === -1 && true,
      isHandling: handle !== -1,
      active,
      handle
    });

    if (active !== -1) {
      this.setState({ buffPtArr: [] });
      return;
    }

    if (handle !== -1) return;
    this.setState({ handle });
    const point = { x, y };
    if (point.x < 0 || point.y < 0) return;

    buffPtArr.push(point);
    this.setState({ buffPtArr });
    if (buffPtArr.length === 4) this.createNewCrop(buffPtArr);
  };
  onMouseMove = e => {
    const { crops } = this.props.cropbox;
    if ('buttons' in e) {
      if (e.buttons !== 1) return;
    } else {
      if ((e.which || e.button) !== 1) return;
    }

    const { buffPosX, buffPosY, isMoving, isHandling, active, basePos } = this.state;
    if (active < 0 || crops[active].disable) return;
    let crop = crops[active];
    let dx = e.clientX - buffPosX;
    let dy = e.clientY - buffPosY;
    if (isMoving) {
      this.setState({ buffPosX: e.clientX, buffPosY: e.clientY });
      if (
        e.clientX - basePos.left - crop.left < crop.width * 0.1 ||
        e.clientX - basePos.left - crop.left > crop.width * 0.9 ||
        e.clientY - basePos.top - crop.top < crop.height * 0.1 ||
        e.clientY - basePos.top - crop.top > crop.height * 0.9
      )
        return;
      crop.left += dx;
      crop.top += dy;
      if (crop.top < 0) {
        crop.top = 0;
      }
      if (crop.left < 0) {
        crop.left = 0;
      }
      if (crop.top + crop.height > basePos.bottom - basePos.top) crop.top = basePos.bottom - basePos.top - crop.height;
      if (crop.left + crop.width > basePos.right - basePos.left) crop.left = basePos.right - basePos.left - crop.width;
    }

    if (isHandling) {
      this.setState({ buffPosX: e.clientX, buffPosY: e.clientY });
      const { handle } = this.state;
      let cx = e.clientX - basePos.left;
      let cy = e.clientY - basePos.top;
      let tmp;
      if (handle === 0) {
        crop.left += dx;
        crop.top += dy;
        crop.width = Math.abs(crop.right - crop.left);
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cx > crop.right) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 2 });
        }
        if (cy > crop.bottom) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 5 });
        }
      }
      if (handle === 1) {
        crop.top += dy;
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cy > crop.bottom) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 6 });
        }
      }
      if (handle === 2) {
        crop.right += dx;
        crop.top += dy;
        crop.width = Math.abs(crop.right - crop.left);
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cx < crop.left) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 0 });
        }
        if (cy > crop.bottom) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 7 });
        }
      }
      if (handle === 3) {
        crop.left += dx;
        crop.width = Math.abs(crop.right - crop.left);
        if (cx > crop.right) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 4 });
        }
      }
      if (handle === 4) {
        crop.right += dx;
        crop.width = Math.abs(crop.right - crop.left);
        if (cx < crop.left) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 3 });
        }
      }
      if (handle === 5) {
        crop.left += dx;
        crop.bottom += dy;
        crop.width = Math.abs(crop.right - crop.left);
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cx > crop.right) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 7 });
        }
        if (cy < crop.top) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 0 });
        }
      }
      if (handle === 6) {
        crop.bottom += dy;
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cy < crop.top) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 1 });
        }
      }
      if (handle === 7) {
        crop.right += dx;
        crop.bottom += dy;
        crop.width = Math.abs(crop.right - crop.left);
        crop.height = Math.abs(crop.bottom - crop.top);
        if (cx < crop.left) {
          tmp = crop.left;
          crop.left = crop.right;
          crop.right = tmp;
          this.setState({ handle: 5 });
        }
        if (cy < crop.top) {
          tmp = crop.top;
          crop.top = crop.bottom;
          crop.bottom = tmp;
          this.setState({ handle: 2 });
        }
      }
    }
    this.generateHandles(crop);
  };
  generateHandles = crop => {
    let handles = [];
    let handle = {};
    let i, j, basePoint;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (i === 1 && j === 1) continue;
        basePoint = { left: crop.left + (crop.width / 2) * j, top: crop.top + (crop.height / 2) * i };
        handle = {
          left: basePoint.left - 5,
          top: basePoint.top - 5,
          right: basePoint.left + 5,
          bottom: basePoint.top + 5,
          width: 11,
          height: 11
        };
        handles.push(handle);
      }
    }
    crop.handles = handles;
  };
  onMouseUp = e => {
    if ('buttons' in e) {
      if (e.buttons !== 1) return;
    } else {
      if ((e.which || e.button) !== 1) return;
    }
    this.setState({ isMoving: false, isHandling: false });
  };

  createNewCrop = ptArr => {
    let top = 10000,
      left = 10000,
      right = 0,
      bottom = 0,
      width = 0,
      height = 0;

    ptArr.forEach((item, index) => {
      if (left > item.x) left = item.x;
      if (top > item.y) top = item.y;
      if (right < item.x) right = item.x;
      if (bottom < item.y) bottom = item.y;
      width = right - left;
      height = bottom - top;
    });

    let crop = { top, left, right, bottom, width, height, handles: [], disable: false };
    this.generateHandles(crop);
    const { crops } = this.props.cropbox;
    const { setCrops } = this.props;
    crops.push(crop);

    this.setState({ buffPtArr: [], active: crops.length - 1 });
    setCrops(crops);
  };

  removeCrop = index => {
    const { crops } = this.props.cropbox;
    const { setCrops } = this.props;
    crops.splice(index, 1);
    this.setState({ active: -1 });
    setCrops(crops);
  };

  render() {
    const { crops } = this.props.cropbox;
    const { active } = this.state;
    const { buffPtArr } = this.state;
    const isCropped = crops.length !== 0;
    return (
      <div className="viewport">
        <div
          className={`image-container ${isCropped && 'cropped'}`}
          onMouseDown={(e, index) => this.onMouseDown(e)}
          onMouseMove={e => this.onMouseMove(e)}
          onMouseUp={e => this.onMouseUp(e)}
        >
          <img
            className="background-image"
            src={img}
            alt="alt"
            onMouseMove={e => {
              e.preventDefault();
            }}
          />
          {crops.map((data, index) => {
            return (
              !data.disable && (
                <CropBox
                  key={index}
                  crop={data}
                  index={index}
                  active={active === index}
                  img={img}
                  removeCrop={this.removeCrop}
                />
              )
            );
          })}
          {buffPtArr.map((item, index) => {
            return <Dot key={index} dot={item} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cropbox: state.cropbox
});

const mapDispatchToProps = dispatch => ({
  setCrops: payload => dispatch(setCrops(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPort);
