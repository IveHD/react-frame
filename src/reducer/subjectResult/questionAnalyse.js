'use strict';

import {FETCH_QUESTION_ANALYSE_SUCCESS, FETCH_QUESTION_ANALYSE_REQUEST, FETCH_QUESTION_ANALYSE_ERROR} from '../../action/subjectResult.js';

const initState = {
    isFetching: false
};

export default function questionAnalyse(state = initState, action) {
    switch(action.type) {
        case FETCH_QUESTION_ANALYSE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_QUESTION_ANALYSE_SUCCESS:
            let chartOption = {
                title : {
                    text : '各题得分率',
                    left : 'center',
                    textStyle : {
                        color : 'rgb(90, 90, 90)',
                        fontSize : 20
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(array){
                        return '<p><span>' + array[0].seriesName + ': ' + array[0].value + '%</span></p>' +
                            '<p><span>' + array[1].seriesName + ': ' + array[1].value + '%</span></p>' +
                            '<p><span>' + array[3].seriesName + ': ' + array[2].value + '%</span></p>'
                    }
                },
                legend: {
                    data: [{
                        name: '我的得分率',
                        // icon: 'rect'
                    }, {
                        name: '平均得分率',
                        // icon: 'rect'
                    }, {
                        name: '预计得分率',
                        // icon: 'rect'
                    }],
                    bottom: 0
                },
                grid: {
                    top: 100,
                    bottom: 100
                },
                xAxis: [{
                    data: []
                }, {
                    data: []
                }],
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: function(text) {
                            return text + '%';
                        }
                    }
                },
                dataZoom: {
                    type: 'slider',
                    show : true,
                    zoomLock : false,
                    start : 0,
                    end : 100,
                    bottom: 40
                },
                series: [{
                    type:'bar',
                    name:'我的得分率',
                    barMaxWidth: '30px',
                    itemStyle: {
                        normal: {
                            color: 'rgb(40, 204, 204)'
                        }
                    },
                    barGap :0,
                    data: []
                }, {
                    type:'bar',
                    name:'平均得分率',
                    barMaxWidth: '30px',
                    itemStyle: {
                        normal: {
                            color: 'rgb(204, 204, 204)'
                        }
                    },
                    barGap :0,
                    data: []
                }, {
                    type:'bar',
                    name:'预计得分率辅助',
                    stack: 'pre',
                    barMaxWidth: '60px',
                    xAxisIndex:1,
                    z : 3,
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 0, 0, 0)'
                        }
                    },
                    data: []
                }, {
                    type:'bar',
                    name:'预计得分率',
                    stack: 'pre',
                    barMaxWidth: '60px',
                    xAxisIndex:1,
                    barGap: '-100%',
                    z : 3,
                    itemStyle: {
                        normal: {
                            color: 'rgba(255, 0, 0, 1)'
                        }
                    },
                    data: []
                }]
            };
            action.data.data.map( (record, i) => {
                chartOption.xAxis[0].data.push(record.questionIndex);
                chartOption.xAxis[1].data.push(record.questionIndex);
                chartOption.series[0].data.push(record.myScoreRate);
                chartOption.series[1].data.push(record.averageScoreRate);
                chartOption.series[2].data.push(record.predictScoreRate);
                chartOption.series[3].data.push(0.1);

            });
            return Object.assign({}, state, { chartOption }, {scope: action.scope});
        case FETCH_QUESTION_ANALYSE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}