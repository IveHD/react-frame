import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import {fetchKnowledgePoint} from '@src/action/totalResult.js';
import LineTitle from '@component/common/lineTitle';
import ECharts from '@component/common/ECharts';
import RadioGroup from '@component/common/radioGroup';
class KnowledgePoint extends React.Component {
    componentDidMount () {
        this.props.dispatch(fetchKnowledgePoint(this.props.subject[0].value));
    }
    render () {
        let {
            chartOption = {},
            subject = [],
            subjectId
        } = this.props;
        return (
            <div className="knowledge-point">
                <LineTitle style={{color: '#afcaca'}}>知识点掌握情况</LineTitle>
                <div className="result-summary-vice-wrapper">
                    {
                        subject.length > 0 ? (<RadioGroup value={subjectId} data={subject} action={fetchKnowledgePoint}/>) : ''
                    }
                    <div>
                        <ECharts width='100%' height='100%' option={chartOption}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let subject = [];
    if(state.subject.data && state.subject.data.length > 0){
        state.subject.data.map(e => {
            subject.push({label: e.subjectName, value: e.subjectId});
        });
    }

    return {
        chartOption: state.knowledgePoint.chartOption,
        subjectId: state.knowledgePoint.subjectId,
        subject
    }
}

export default connect(mapStateToProps)(KnowledgePoint)