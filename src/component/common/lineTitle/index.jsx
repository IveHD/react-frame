import React from 'react';
import './style.less';
export default class LineTitle extends React.Component {
    render () {
        let {...other} = this.props;
        if(!other.style || !other.style.color) {
            other.style = !other.style ? {} : other.style;
            other.style.color = '#fff';
        }
        return (
            <div className="line-title" {...other}>
                <span className="line" style={{borderBottom: '1px ' + other.style.color +' solid'}}></span>
                <div className="title-text">{this.props.children}</div>
                <span className="line" style={{borderBottom: '1px ' + other.style.color +' solid'}}></span>
            </div>
        )
    }
}