import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaExpand, FaEllipsisH, FaSearch, FaRegHandPointer } from 'react-icons/fa';

import { setCurrTool } from '../../redux/cropbox/actions';
import './toolBar.css';

class ToolBar extends Component {
  static propTypes = {
    currTool: PropTypes.string
  };

  state = {
    currTool: ''
  };

  onClickIcon = tool => {
    const { setCurrTool } = this.props;
    this.setState({ currTool: tool });
    setCurrTool(tool);
  };

  render() {
    const { currTool } = this.state;
    return (
      <div className="toolbar">
        <button className={`icon-button ${currTool === 'crop' && 'active'}`} onClick={() => this.onClickIcon('crop')}>
          <FaExpand />
        </button>
        <button
          className={`icon-button ${currTool === 'ellipsis' && 'active'}`}
          onClick={() => this.onClickIcon('ellipsis')}
        >
          <FaEllipsisH />
        </button>
        <button
          className={`icon-button ${currTool === 'search' && 'active'}`}
          onClick={() => this.onClickIcon('search')}
        >
          <FaSearch />
        </button>
        <button className={`icon-button ${currTool === 'hand' && 'active'}`} onClick={() => this.onClickIcon('hand')}>
          <FaRegHandPointer />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currTool: state.currTool
});

const mapDispatchToProps = dispatch => ({
  setCurrTool: payload => dispatch(setCurrTool(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar);
