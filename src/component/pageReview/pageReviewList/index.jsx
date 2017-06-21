import React from 'react';
import { connect } from 'react-redux';
import './style.less';

import LineTitle from '@component/common/lineTitle';
import { Select } from 'antd';
const Option = Select.Option;
import TestPageSymbol from '@component/common/testPageSymbol';

import { fetchTestData } from '@src/action/pageReview.js';
class PageReviewList extends React.Component {
    componentWillMount () {
        this.props.dispatch(fetchTestData());
    }
    handleSelect (i) {
        console.log(i);
    }
    render () {
        let {
            testList = [],
            resultList = []
        } = this.props;
        let defaultValue = testList && testList.length !== 0 ? testList[0].value : '';
        return (
            <div className="page-review-list-wrapper">
                <LineTitle style={{color: 'rgb(175, 202, 202)'}}>试卷回顾</LineTitle>
                <div className="page-review-list-vice-wrapper">
                    <div className="test-index-choice">
                        <span className="test-index-label">考试场次：</span>
                        {
                            defaultValue ? (
                                <Select style={{width: '350px', fontSize: '16px'}} defaultValue={defaultValue + ''} onChange={this.handleSelect.bind(this)}>
                                    {
                                        testList.map((e,i) => (
                                            <Option key={i} value={e.value + ''} style={{fontSize: '15px'}} >{e.name}</Option>
                                        ))
                                    }
                                </Select>
                            ): (<span style={{color: 'red'}}>考试场次获取失败！</span>)
                        }
                    </div>
                    <div className="test-page-symbol-container">
                        {
                            resultList.length > 0 ? resultList.map((e, i) => (
                                <div key={i}>
                                    <TestPageSymbol key={i} subjectName={e.subjectName} subjectId={e.subjectId} score={e.score}/>
                                </div>

                            )) : ''
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        testList: state.testData.test,
        resultList: state.subjectsResult.resultList
    };
};

export default connect(mapStateToProps)(PageReviewList);