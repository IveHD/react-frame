import React from 'react';
import { connect } from 'react-redux';
import './style.less';
import { fetchImproveSuggestion } from '@src/action/subjectResult';
import LineTitle from '@component/common/lineTitle';

class ImproveSuggestion extends React.Component {
    createMarkup(html, i) { return {__html: '<span class="index">' + i + '.</span>' +html}; };
    render () {
        let {
            subjectName = '--',
            improvableScore = 0,
            subjectJudge = '--',
            suggestion = []
        } = this.props;
        return (
            <div className="improve-suggestion-wrapper">
                <img className="bg-img" src={require('@asset/image/bg.png')}></img>
                <LineTitle style={{color: '#fff'}}>提升建议</LineTitle>
                <div className="suggestion-text">你的 {subjectName} 成绩 {subjectJudge}，建议近期突破以下知识点：</div>
                <div className="suggestion-wrapper">
                    <div className="suggestion-content">
                        {
                            suggestion.map((e, i) => (
                                <p key={i} dangerouslySetInnerHTML={this.createMarkup(e, i+1)}></p>
                            ))
                        }
                    </div>
                    <div className="improvable-score">
                        <span className="equality-sign">=</span>
                        <span className="score-container">
                            <span className="score">{ improvableScore }</span><span className="point">分</span>
                            <p>还可提升</p>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subjectName: state.subjectBriefing.subjectName,
        improvableScore: state.improveSuggestion.improvableScore,
        suggestion: state.improveSuggestion.suggestion,
        subjectJudge: state.improveSuggestion.subjectJudge
    }
}

export default connect(mapStateToProps)(ImproveSuggestion);