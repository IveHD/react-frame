'use strict';

import { FETCH_KNOWLEDGE_POINT_ANALYSE_REQUEST, FETCH_KNOWLEDGE_POINT_ANALYSE_SUCCESS, FETCH_KNOWLEDGE_POINT_ANALYSE_ERROR } from '../../action/subjectResult.js';
const initState = {
    isFetching: false,
    chartOption: {}
};

export default function knowledgePointAnalyse(state = initState, action) {
    switch(action.type) {
        case FETCH_KNOWLEDGE_POINT_ANALYSE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_KNOWLEDGE_POINT_ANALYSE_SUCCESS:
            let chartOption = {};
            let columns = [{
                title: '知识点名称',
                dataIndex: 'knowledgePointName',
                key: 'knowledgePointName',
                className: 'th'
            }, {
                title: '平均得分率',
                dataIndex: 'averageScoreRate',
                key: 'averageScoreRate',
                className: 'th'
            }, {
                title: '考频',
                dataIndex: 'testFrequencyRate',
                key: 'testFrequencyRate'
            }, {
                title: '我的得分率',
                dataIndex: 'myScoreRate',
                key: 'myScoreRate'
            }, {
                title: '题号',
                dataIndex: 'questionIndex',
                key: 'questionIndex'
            }];
            let dataSource = [];
            if (action.data.data && action.data.data.length > 0) {
                chartOption = {
                    title: {
                        text: ''
                    },
                    polar: {},
                    legend: {
                        data: [{
                            name: '我的得分率'
                        }, {
                            name: '平均得分率'
                        }, {
                            name: '考频'
                        }],
                        bottom: 0
                    },
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
                                '我的得分率: ' + Math.round(action.data.data[e[0].dataIndex].myScoreRate * 100) + '%' + '<br/>' +
                                '平均得分率: ' + Math.round(action.data.data[e[0].dataIndex].averageScoreRate * 100) + '%' + '<br/>' +
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
                        name: '我的得分率',
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
                    chartOption.series[0].data.push([Math.round(record.myScoreRate * 100), i]);
                    chartOption.series[1].data.push([Math.round(record.averageScoreRate * 100), i]);
                    chartOption.series[2].data.push([Math.round(record.testFrequencyRate * 100), i]);
                    dataSource.push({key: i,
                        knowledgePointName: record.knowledgePointName,
                        averageScoreRate: record.averageScoreRate,
                        testFrequencyRate: record.testFrequencyRate,
                        myScoreRate: record.myScoreRate,
                        questionIndex: record.questionIndex
                    });
                });
                chartOption.series[0].data.push([Math.round(action.data.data[0].myScoreRate * 100), 0]);
                chartOption.series[1].data.push([Math.round(action.data.data[0].averageScoreRate * 100), 0]);
                chartOption.series[2].data.push([Math.round(action.data.data[0].testFrequencyRate * 100), 0]);
            }
            return Object.assign({}, state, {
                isFetching: false,
            }, {
                chartOption
            }, { columns }, { dataSource });
        case FETCH_KNOWLEDGE_POINT_ANALYSE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}