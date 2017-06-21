import React from 'react';
import { connect } from 'react-redux';
import RadioGroup from '@component/common/radioGroup';
import ECharts from '@component/common/ECharts';
import LineTitle from '@component/common/lineTitle';
import {fetchSubjectResultAnalyse} from '@src/action/subjectResult';
import './style.less';

class ResultSummary extends React.Component {
    componentDidMount() {
    }
    render() {
        let {
            chartOption,
            subjectId,
            scope = 'PROVINCE'
        } = this.props;
        return (
            <div className="result-analyse">
                <LineTitle style={{color: '#afcaca'}}>成绩分析</LineTitle>
                <div className="result-analyse-vice-wrapper">
                    {
                        subjectId ? (<RadioGroup value={scope} data={[{value: 'PROVINCE', label: '省'}, {value: 'SCHOOL', label: '校'}, {value: 'CLASS', label: '班'}]} action={fetchSubjectResultAnalyse} argument={subjectId}/>) : ''
                    }
                    <ECharts style={{ width: '100%', height: '550px', display: 'inline-block' }} option={chartOption}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        subjectId: state.navigator.subjectId,
        scope: state.subjectResultAnalyse.scope,
        chartOption: state.subjectResultAnalyse.chartOption
    };
};

export default connect(mapStateToProps)(ResultSummary)