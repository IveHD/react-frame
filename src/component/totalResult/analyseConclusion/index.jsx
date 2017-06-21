import React from 'react';
import './style.less';

import { connect } from 'react-redux';
import {fetchAnalyseConclusion} from '@src/action/totalResult.js';
import LineTitle from '@component/common/lineTitle';
class Conclusion extends React.Component {
    componentDidMount () {
        this.props.dispatch(fetchAnalyseConclusion());
    }
    createMarkup(html) { return {__html: html}; };
    render () {
        let {
            totalScore = '--',
            classRank = '--',
            schoolRank = '--',
            provinceRank = '--',
            improvableScore = '--',
            conclusion = []
        } = this.props;
        return (
            <div className="analyse-conclusion">
                <img className="bg-img" src={require('@asset/image/bg.png')}></img>
                <LineTitle style={{color: '#fff'}}>本期考试 总分 {totalScore} 分，班级排名{classRank}，本校排名{schoolRank}, 全省排名{provinceRank}</LineTitle>
                <div className="improvable-score">提升目标 +{improvableScore} 分，其中：</div>
                <div className="conclusion-wrapper">
                    {
                        conclusion.map((e, i) => (
                            <p key={i} dangerouslySetInnerHTML={this.createMarkup(e)}></p>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.analyseConclusion;
}

export default connect(mapStateToProps)(Conclusion)