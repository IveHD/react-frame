import React from 'react';
import { connect } from 'react-redux';

require('./style.less')

class Briefing extends React.Component {
    render () {
        let {
            subjectName = '--',
            score = '--',
            provinceRankRate = '--',
            aimScore = '--',
            trend = '--'
        } = this.props;
        return (
            <div className="subject-briefing-wrapper">
                <div className="briefing-vice-wrapper">
                    <div className="subject-name">
                        <p className="name">{subjectName}</p>
                        <p className="sub-text">当前科目</p>
                    </div>
                    <div className="result-wrapper">
                        <div className="result-vice-wrapper">
                            <div className="score-wrapper">
                                <span className="score">
                                    {score}
                                    <div className="user-manage">{aimScore}</div>
                                </span>
                                <p className="sub-text">本次得分</p>
                            </div>
                            <div className="line"></div>
                            <div className="subject-province-rank">
                                <span className="rate-text">
                                    {provinceRankRate == '--' ? '--' : parseFloat(provinceRankRate)}
                                </span><span style={{fontSize: '20px', color: 'rgb(0, 180, 180)'}}>%</span>
                                <p className="sub-text">单科全省排名百分比</p>
                            </div>
                        </div>
                    </div>

                    <div className="trend">
                        <img src={trend === 'RISE' ? require('@asset/image/rise.png') : (trend === 'DECLINE' ? require('@asset/image/decline.png') : require('@asset/image/maintain.png'))} alt=""/>
                        <p className="sub-text">排名趋势</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subjectName: state.subjectBriefing.subjectName,
        score: state.subjectBriefing.score,
        provinceRankRate: state.subjectBriefing.provinceRankRate,
        aimScore: state.subjectBriefing.aimScore,
        trend: state.subjectBriefing.trend
    }
}

export default connect(mapStateToProps)(Briefing);