import React from 'react';
require('./style.less')
export default class ProgressBar extends React.Component {
    render () {
        let progressPercent = parseFloat(this.props.progressPercent);
        return (
            <div className="progress-bar-wrapper">
                <div className="progress-bar-outer"
                     style={{
                         width: this.props.width ? this.props.width + 'px' : '82px',
                         height: this.props.width ? this.props.height + 'px' : '6px'}}>
                    <div className="progress-inner" style={{width: progressPercent ? progressPercent + '%' : '0%'}}></div>
                </div>
                <span className="progress-percent">{(progressPercent ? progressPercent : '--') + '%'}</span>
            </div>
        )
    }
}