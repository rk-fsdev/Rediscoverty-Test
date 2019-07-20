import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash, FaAngleDown, FaAngleUp } from 'react-icons/fa';

import { setCrops } from '../../redux/cropbox/actions';
import './objectsPanel.css';

class ObjectsPanel extends Component {
  static propTypes = {
    crops: PropTypes.array
  };
  state = {
    isExpanded: true
  };

  toggleExpand = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  disableCrop(index) {
    const { setCrops } = this.props;
    const { crops } = this.props.cropbox;
    crops[index].disable = true;
    setCrops(crops);
  }
  enableCrop(index) {
    const { setCrops } = this.props;
    const { crops } = this.props.cropbox;
    crops[index].disable = false;
    setCrops(crops);
  }
  render() {
    const { crops } = this.props.cropbox;
    const { isExpanded } = this.state;
    return (
      <div className="objects-panel">
        <div className="objects-list">
          <div className="objects-list-header">
            <FaEye className="icon-eye" />
            &nbsp;&nbsp;OBJECTS [{crops.length}]
            {isExpanded && <FaAngleDown className="icon-angle-down" onClick={this.toggleExpand} />}
            {!isExpanded && <FaAngleUp className="icon-angle-up" onClick={this.toggleExpand} />}
          </div>
          {isExpanded && (
            <div className="objects-list-body">
              <ul>
                {crops.map((data, index) => {
                  return (
                    <li key={index}>
                      {!data.disable && <FaEye className="icon-eye" onClick={() => this.disableCrop(index)} />}
                      {data.disable && <FaEyeSlash className="icon-eye" onClick={() => this.enableCrop(index)} />}
                      &nbsp;&nbsp;OBJ {index}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
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
)(ObjectsPanel);
