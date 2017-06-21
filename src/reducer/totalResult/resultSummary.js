'use strict';

import * as totalResultAction from '../../action/totalResult';

const initState = {
    isFetching: false,
    resultSummaryChartOption: {},
    monthChartOption: {}
};

export default function resultSummary(state = initState, action) {
    switch(action.type) {
        case totalResultAction.FETCH_RESULT_SUMMARY_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case totalResultAction.FETCH_RESULT_SUMMARY_SUCCESS:
            let chartOption = {
                title : {
                    text : '左右拉伸滚动条可查看其它考分区间分布',
                    left : 'center',
                    bottom : '10px',
                    textStyle : {
                        color : 'rgba(161,162,162,0.5)',
                        fontSize : 10
                    }
                },
                tooltip: {},
                grid: {
                    top: 100
                },
                xAxis: {
                    data: [],
                    axisLabel: {
                        formatter: function(text) {
                            return text + '分';
                        }
                    }
                },
                yAxis: {
                    axisLabel: {
                        formatter: function(text) {
                            return text + '人';
                        }
                    }
                },
                dataZoom: {
                    type: 'slider',
                    show : true,
                    zoomLock : false,
                    start : 0,
                    end : 100,
                    labelFormatter: function (value, text) {
                        return text + '分';
                    }
                },
                series: [{
                    barMaxWidth: '30px',
                    name: '分数',
                    type: 'bar',
                    itemStyle: {
                      normal: {
                          color: 'rgb(0, 206, 206)'
                      }
                    },
                    markPoint : {
                        symbol: 'pin',
                        data : [
                            {coord: null},
                        ],
                        silent: true,
                        symbolSize : 90,
                        itemStyle: {
                            normal: {
                                color: 'rgba(255, 0, 0, 0.5)',
                                width: '100px'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                formatter: '我在这里'
                            }
                        }
                    },
                    data: []
                }]
            };
            action.data.summary.map( (record, i) => {
                chartOption.xAxis.data.push(record.score);
                let data = record.mine ? {value: record.count, itemStyle: {normal: {color: 'red'}}} : record.count;
                if(record.mine){
                    chartOption.series[0].markPoint.data = [{coord: [i, record.count]}]
                }
                chartOption.series[0].data.push(data);
            });
            let monthChartOption = {
                title : {
                    text : '左右拉伸滚动条可查看其它考分区间分布',
                    left : 'center',
                    bottom : '10px',
                    textStyle : {
                        color : 'rgba(161,162,162,0.5)',
                        fontSize : 10
                    }
                },
                tooltip: {},
                xAxis: {
                    data: []
                },
                yAxis: {},
                dataZoom: {
                    type: 'slider',
                    show : true,
                    zoomLock : false,
                    start : 0,
                    end : 100
                },
                series: [
                    // {
                    //     name: '分数',
                    //     type: 'bar',
                    //     stack: 'one',
                    //     data: []
                    // }
                ]
            };
            let obj = {};
            action.data.subject.monthResult.map(e => {
                monthChartOption.xAxis.data.push(e.month);
                e.result.map(el => {
                    obj[el.subjectId] ? obj[el.subjectId].push(el) : obj[el.subjectId] = [el];
                })
            });
            let keys = Object.keys(obj).reverse();
            const colors = ['rgb(255, 123, 100)', 'rgb(0, 175, 217)', 'rgb(0, 204, 202)', 'rgb(237, 162, 231)', 'rgb(0, 203, 161)', 'rgb(0, 99, 195)'].reverse();
            keys.map((k,i) => {
                let seriesObj = {
                    name: obj[k][0].subjectName,
                    type: 'bar',
                    stack: 'one',
                    barMaxWidth: '30px',
                    itemStyle: {
                        normal: {
                            color: colors[i%6]
                        }
                    },
                    data: []
                };
                obj[k].map(e=>{
                    seriesObj.data.push(e.score);
                });
                monthChartOption.series.push(seriesObj);
            });
            return Object.assign({}, state, {
                isFetching: false,
                resultSummaryChartOption: chartOption,
                monthChartOption: monthChartOption
            }, action.data.subject);
        case totalResultAction.FETCH_RESULT_SUMMARY_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}