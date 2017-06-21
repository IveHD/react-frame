'use strict';

import {FETCH_KNOWLEDGE_POINT_REQUEST, FETCH_KNOWLEDGE_POINT_SUCCESS, FETCH_KNOWLEDGE_POINT_ERROR} from '../../action/totalResult';
const initState = {
    isFetching: false,
    chartOption: {}
};

export default function knowledgePoint(state = initState, action) {
    switch(action.type) {
        case FETCH_KNOWLEDGE_POINT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_KNOWLEDGE_POINT_SUCCESS:
            let chartOption = {};
            if (action.data.data && action.data.data.length > 0) {
                chartOption = {
                    title: {
                        text: ''
                    },
                    legend: {
                        data: [{
                            name: '班级得分率',
                            // icon: 'rect'
                        }, {
                            name: '平均得分率',
                            // icon: 'rect'
                        }, {
                            name: '考频',
                            // icon: 'rect'
                        }],
                        bottom: 0
                    },
                    polar: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        textStyle: {
                            color: '#fff',
                            align: 'left'
                        },
                        formatter: function(e) {
                            return action.data.data[e[0].dataIndex].knowledgePointName + '<br/>' +
                                '班级得分率: ' + Math.round(action.data.data[e[0].dataIndex].classAverageScoreRate * 100) + '%' + '<br/>' +
                                '平均得分率: ' + Math.round(action.data.data[e[0].dataIndex].gradeAverageScoreRate * 100) + '%' + '<br/>' +
                                '考频: ' + Math.round(action.data.data[e[0].dataIndex].testFrequencyRate * 100) + '%';
                        }
                    },
                    radiusAxis: {
                        splitNumber: 8,
                        min: 0,
                        max: 100,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    angleAxis: {
                        type: 'value',
                        startAngle: 0,
                        min: 0,
                        max: action.data.data.length,
                        interval: 1,
                        axisLabel: {
                            show: true,
                            formatter: function(e) {
                                if (e == action.data.data.length)
                                    return;
                                let name = action.data.data[e].knowledgePointName;
                                return name.length > 4 ? name.slice(0, 4) + '...' : name;
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: 'rgb(204, 204, 204)'
                            }
                        },
                        axisPointer: {
                            label: {
                                show: false
                            }
                        }
                    },
                    series: [{
                        coordinateSystem: 'polar',
                        name: '班级得分率',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            normal: {
                                color: 'rgb(246, 95, 69)',
                                width: 4
                            }
                        }
                    }, {
                        coordinateSystem: 'polar',
                        name: '平均得分率',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            normal: {
                                color: 'rgba(175, 175, 175, 0.5)',
                                width: 3
                            }
                        }
                    }, {
                        coordinateSystem: 'polar',
                        name: '考频',
                        type: 'line',
                        data: [],
                        lineStyle: {
                            normal: {
                                color: 'rgb(185, 233, 233)',
                                width: 2
                            }
                        }
                    }]
                };
                action.data.data.map((record, i) => {
                    chartOption.series[0].data.push([Math.round(record.classAverageScoreRate * 100), i]);
                    chartOption.series[1].data.push([Math.round(record.gradeAverageScoreRate * 100), i]);
                    chartOption.series[2].data.push([Math.round(record.testFrequencyRate * 100), i]);
                });
                chartOption.series[0].data.push([Math.round(action.data.data[0].classAverageScoreRate * 100), 0]);
                chartOption.series[1].data.push([Math.round(action.data.data[0].gradeAverageScoreRate * 100), 0]);
                chartOption.series[2].data.push([Math.round(action.data.data[0].testFrequencyRate * 100), 0]);
            }

            return Object.assign({}, state, {
                isFetching: false,
            }, {
                chartOption
            }, {subjectId: action.subjectId});
        case FETCH_KNOWLEDGE_POINT_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}