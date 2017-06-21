import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@component/common/avatar';
import ProgressBar from '@component/common/progressBar';
import { fetchTotalBriefing } from '@src/action/totalResult.js';
require('./style.less')

class Briefing extends React.Component {
    componentDidMount () {
        this.props.dispatch(fetchTotalBriefing());
    }
    render () {
        let {
            name = '--',
            totalScore = '--',
            aimScore = '--',
            totalQuestionCount = '--',
            schoolRankRate = '--',
            getScoreRate = '--',
            provinceRankRate = '--'
        } = this.props;
        return (
            <div className="total-briefing-wrapper">
                <div className="briefing-vice-wrapper">
                    <div className="avatar">
                        <Avatar  width="100px" height="100px"/>
                        <p style={{fontSize: '14px'}}>{name}，同学</p>
                    </div>
                    <div className="result-wrapper">
                        <div className="result-vice-wrapper">
                            <div className="score-wrapper">
                                <span className="score">
                                    {totalScore}
                                    <div className="user-manage">{aimScore}</div>
                                </span>
                                <p className="this-time">本次得分</p>
                            </div>
                            <div className="line"></div>
                            <div className="result-fields">
                                <ul>
                                    <li><span className="field-text">总题量</span>{totalQuestionCount}</li>
                                    <li><span className="field-text">校排名百分比</span><ProgressBar progressPercent={schoolRankRate}/></li>
                                    <li><span className="field-text">得分率</span><ProgressBar progressPercent={getScoreRate}/></li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div className="trend">
                        <img src={require('@asset/image/fir_06.png')} alt=""/>
                        <p className="trend-number">{ provinceRankRate !== '--' ? parseFloat(provinceRankRate) : '--'}<span className="trend-number-sign">%</span></p>
                        <p className="trend-description">本月省排名百分比 已超过<span>{100 - parseFloat(provinceRankRate) + '%'}</span>的同学</p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.totalBriefing.name,
        grade: state.totalBriefing.grade,
        totalScore: state.totalBriefing.totalScore,
        aimScore: state.totalBriefing.aimScore,
        totalQuestionCount: state.totalBriefing.totalQuestionCount,
        schoolRankRate: state.totalBriefing.schoolRankRate,
        getScoreRate: state.totalBriefing.getScoreRate,
        provinceRankRate: state.totalBriefing.provinceRankRate
    }
}

export default connect(mapStateToProps)(Briefing);