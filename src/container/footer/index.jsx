import React from 'react';
require('./style.less')
export default class Footer extends React.Component {
    render(){
        return (
            <div className="footer-wrapper">
                <p>
                    <span className="logo"></span>
                    <span className="copy-rights">2015- All Copyrights Reserved 穿扬模考 版权所有。</span>
                    <span className="about-us">关于我们</span>
                </p>
            </div>
        )
    }
}

