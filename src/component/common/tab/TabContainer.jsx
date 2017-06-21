import React from 'react';
import './style.less';
export default class TabContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: props.defaultValue ? props.defaultValue : 0
        }
    }
    componentDidMount () {
    }
    calculateClassNames (i) {
        if(i == this.state.selectedIndex){
            return 'tab-link-button active';
        }else{
            return 'tab-link-button';
        }
    }
    handleClick (i) {
        this.setState({selectedIndex: i});
    }
    render () {
        return (
            <div className="tab-container">
                <div className="tab-link">
                    {
                        this.props.children.map( (e, i) => (
                            <a className={this.calculateClassNames.call(this, i)} onClick={this.handleClick.bind(this, i)} href="javascript:void(0)" key={i}>{e.props.tabText}</a>
                        ))
                    }
                </div>
                <div className="tab-pane">
                    {
                        this.props.children.map ((e, i) => (
                            <div style={{display: i == this.state.selectedIndex ? '' : 'none'}} className="tab-pane-item" key={i}>
                                {e}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}