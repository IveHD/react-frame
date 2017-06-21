import React from 'react';
import './style.less';
import PropTypes from 'prop-types'
export default class TestPageSymbol extends React.Component {
    handleClick () {
        window.open('http://www.baidu.com');
    }
    render () {
        return (
            <div className="test-page-symbol-wrapper" onClick={this.handleClick.bind(this, this.props.subjectId)}>
                <span className="subject-name">{this.props.subjectName}</span>
                <span className="score">{this.props.score}分</span>
                <div className="line-wrapper">
                    {
                        ['30%', '40%', '50%', '100%', '100%', '100%'].map((e, i) => {
                            return (<p key={i} style={{borderBottom: '1px rgb(205, 205, 205) solid', width: e, height: '20px'}}></p>)
                        })
                    }
                </div>
            </div>
        )
    }
}