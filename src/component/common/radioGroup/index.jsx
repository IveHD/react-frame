import React from 'react';
import { connect } from 'react-redux';
import './style.less';

class RadioGroup extends React.Component {
    calculateClassNames (value) {
        if(value == this.props.value){
            return 'radio-group-button active';
        }else{
            return 'radio-group-button';
        }
    }
    handleClick (i) {
        this.props.dispatch(this.props.action(i, this.props.argument));
    }
    render () {
        return (
            <div className="radio-group">
                {
                    this.props.data.map( (e) => (
                        <a className={this.calculateClassNames.call(this, e.value)} onClick={this.handleClick.bind(this, e.value)} href="javascript:void(0)" key={e.value}>{e.label}</a>
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {}
};


export default connect(mapStateToProps)(RadioGroup)
