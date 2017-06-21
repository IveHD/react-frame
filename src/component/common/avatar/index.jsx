import React from 'react';

export default  class Avatar extends React.Component {
    render () {
        return (
            <div className={this.props.className ?  this.props.className + ' avatar-c' : 'avatar-c'}>
                <img style={{borderRadius: '50%'}} width={this.props.width} height={this.props.height} src={require('@asset/image/sec1_03_03.png')} alt="avatar"/>
            </div>
        )
    }
}