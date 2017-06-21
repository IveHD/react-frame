'use strict';

import {FETCH_SUBJECT_RESULT_ANALYSE_SUCCESS, FETCH_SUBJECT_RESULT_ANALYSE_REQUEST, FETCH_SUBJECT_RESULT_ANALYSE_ERROR} from '../../action/subjectResult.js';

const initState = {
    isFetching: false,
    scope: 'PROVINCE'
};

export default function subjectResultAnalyse(state = initState, action) {
    switch(action.type) {
        case FETCH_SUBJECT_RESULT_ANALYSE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_SUBJECT_RESULT_ANALYSE_SUCCESS:
            let chartOption = {
            title : {
                text : '本次得分与分布',
                left : 'center',
                textStyle : {
                    color : 'rgb(90, 90, 90)',
                    fontSize : 20
                }
            },
            tooltip: {
                formatter: function(obj){
                    return '分数：' + obj.name + '<br/>' + '人数：' + obj.value;
                }
            },
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
                type: 'value',
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
                name: '分数',
                type: 'bar',
                data: []
            }]
        };
            action.data.data.map( (record, i) => {
                chartOption.xAxis.data.push(record.score);
                let data = record.mine ? {value: record.count, itemStyle: {normal: {color: 'red'}}} : record.count;
                if(record.mine){
                    chartOption.series[0].markPoint.data = [{coord: [i, record.count]}]
                }
                chartOption.series[0].data.push(data);
            });
            return Object.assign({}, state, {chartOption}, {scope: action.scope});
        case FETCH_SUBJECT_RESULT_ANALYSE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}