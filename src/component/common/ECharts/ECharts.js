import React from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';
import './theme/macarons';
import './theme/shine';

class ECharts extends React.Component {

  static propTypes = {
    onInit: PropTypes.func,
    option: PropTypes.object,
    notMerge: PropTypes.bool,
    notRefreshImmediately: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    notMerge: false,
    notRefreshImmediately: false,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    this.setOption();
  }

  componentWillUnmount() {
    this.dispose();
  }

  getInstance() {
    return this.chart;
  }

  setOption() {
    let {
      option,
      notMerge,
      notRefreshImmediately,
      } = this.props;
    if (option) {
      this.chart.showLoading();
      if(!option.series){
        option.series = [];
      }
      this.chart.setOption(option, notMerge, notRefreshImmediately);
      this.chart.hideLoading();
    }
  }

  init() {
    this.chart = echarts.init(this.refs.container);
    this.setOption();
  }

  dispose() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  render() {
    let {
      option,
      notMerge,
      notRefreshImmediately,
      style,
      ...other,
      } = this.props;

    let newStyle = Object.assign({
      width: '100%',
      height: '100%',
    }, style);

    return (
      <div ref="container" {...other} style={newStyle}></div>
    );
  }
}

export default ECharts;
