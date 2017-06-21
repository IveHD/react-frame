import React from 'react';
import { connect } from 'react-redux';
import {fetchResultSummary} from '@src/action/totalResult.js';
import ECharts from '@component/common/ECharts';
import Tab from '@component/common/tab/index';
import LineTitle from '@component/common/lineTitle';
import './style.less';
let TabPane = Tab.TabPane;
let TabContainer = Tab.TabContainer;

const colors = ['rgb(255, 123, 100)', 'rgb(0, 175, 217)', 'rgb(0, 204, 202)', 'rgb(237, 162, 231)', 'rgb(0, 203, 161)', 'rgb(0, 99, 195)'];
class ResultSummary extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchResultSummary());
    }
    render() {
        let {
            resultSummaryChartOption = {},
            scoreWithFull = [],
            monthChartOption = {}
        } = this.props;
        return (
            <div className="result-summary">
                <LineTitle style={{color: '#afcaca'}}>成绩总览</LineTitle>
                <div className="result-summary-vice-wrapper">
                    <TabContainer>
                        <TabPane tabText="总分" tabValue="1">
                            <ECharts width='100%' height='100%' option={resultSummaryChartOption}/>
                        </TabPane>
                        <TabPane tabText="分科" tabValue="2">
                            <div className="subject-result-wrapper">
                                <div className="last-result-ring" style={{width: '80px', float: 'left', marginTop: '60px', position: 'relative', left: '30px'}}>
                                    {
                                        scoreWithFull.map( (e, i) => (
                                            <RingChart key={i} score={e.score} fullScore={e.fullScore} name={e.subjectName} color={colors[i%6]}/>
                                        ))
                                    }
                                </div>
                                <div className="month-result">
                                    <ECharts width='100%' height='100%' style={{ width: '900px', height: '550px', display: 'inline-block' }} option={monthChartOption}/>
                                </div>
                            </div>

                        </TabPane>
                    </TabContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let props = Object.assign({}, ownProps, {
        resultSummaryChartOption: state.resultSummary.resultSummaryChartOption,
        scoreWithFull: state.resultSummary.scoreWithFull,
        monthResult: state.resultSummary.monthResult,
        monthChartOption: state.resultSummary.monthChartOption
    })
    return props;
}

class RingChart extends React.Component {
    componentWillMount () {
        let chartOption = {
            title: {
                text: this.props.name + '\n' + this.props.score,
                left: 'center',
                top: '20%',
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'lighter',
                    color: this.props.color
                }
            },

            series: [{
                name:'',
                type:'pie',
                radius: ['65%', '100%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                clockwise: false,
                tooltip: {
                    show: 'false',
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value: this.props.score, name:'得分',
                        itemStyle: {
                        normal: {
                            color: this.props.color
                        }
                    }},
                    {value: this.props.fullScore - this.props.score, name:'未得分',
                     itemStyle: {
                        normal: {
                            color: 'rgb(204, 204, 204)'
                        }
                     }}
                ],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                }
            }]
        };
        this.setState({chartOption: chartOption})
    }

    render () {
        return (
            <div style={{display: 'inline-block', margin: '5px'}}>
                <ECharts style={{width: '60px', height: '60px'}} option={this.state.chartOption} />
            </div>
        )
    }
}


export default connect(mapStateToProps)(ResultSummary)