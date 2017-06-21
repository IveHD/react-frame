import React from 'react';
import { connect } from 'react-redux';
import Navigator from '../../component/header/navigator';
import Avatar from '@component/common/avatar';
require('./style.less');
class Header extends React.Component{
    render() {
        return (
            <div>
                <div className="header-wrapper">
                    <div style={{position: 'absolute'}}>
                        <img src={require('@asset/image/logo.png')} alt=""/>
                        <img src={require('@asset/image/slogan.png')} alt=""/>
                    </div>
                    {
                        this.props.subject.length > 0 ? (
                            <Navigator subject={this.props.subject}/>
                        ) : ''
                    }
                    <Avatar className="profile"/>
                </div>
                <div className="seal"></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subject: state.subject.data
    }
};
export default connect(mapStateToProps)(Header)