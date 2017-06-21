import React from 'react';
import { connect } from 'react-redux';
import './style.less';

import RadioGroup from '@component/common/radioGroup';
import ECharts from '@component/common/ECharts';
import LineTitle from '@component/common/lineTitle';
import {fetchQuestionAnalyse} from '@src/action/subjectResult';
class QuestionAnalyse extends React.Component {
    render() {
        let {
            chartOption,
            subjectId,
            scope
        } = this.props;
        return (
            <div className="question-analyse-wrapper">
                <LineTitle style={{color: '#afcaca'}}>试题分析</LineTitle>
                <div className="question-analyse-vice-wrapper">
                    {
                        subjectId ? (<RadioGroup value={ scope } data={[{value: 'PROVINCE', label: '省'}, {value: 'SCHOOL', label: '校'}, {value: 'CLASS', label: '班'}]} action={fetchQuestionAnalyse} argument={subjectId}/>) : ''
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
        scope: state.subjectQuestionAnalyse.scope,
        chartOption: state.subjectQuestionAnalyse.chartOption
    };
};

export default connect(mapStateToProps)(QuestionAnalyse)