import React from 'react';
import {NavLink} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { menuToHighLight, switchSubjectId } from '@src/action/navigator';

require('./style.less');
import {Links} from '@src/route/routeConfig';
import cn from 'classnames';

import FaCaretDown from 'react-icons/lib/fa/caret-down';
let firstGradeItems = [];
let secondGradeItems = [];
let thirdGradeItems = [];
const firstGradeCodeRegEx = /^[1-9]+[0-9]*$/;
const secondGradeCodeRegEx = /^([1-9]+[0-9]*)+(\.[1-9]*)$/;
const thirdGradeCodeRegEx = /^([1-9]+[0-9]*)+(\.[1-9]*)+(\.[1-9]*)$/;
class IRouter extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let urlArray = location.href.split('/');
        let subjectId = urlArray[urlArray.length-1];
        if(Number.isInteger(parseInt(subjectId))){
            this.props.dispatch(switchSubjectId(subjectId, 'PROVINCE', 'PROVINCE'));
        }

        this.props.subject.map( (e, i) => {
            Links.push({
                path: '/subject/' + e.subjectId,
                name: e.subjectName,
                code: '1.' + (i+2),
                subjectId:  e.subjectId
            });
        } );
        Links.map((e) => {
            let o = {};
            o['hover-' + e.code] = false;
            this.setState(o)
            if(firstGradeCodeRegEx.test(e.code)){
                firstGradeItems.push(Object.assign({}, e, {children: []}));
            }else if(secondGradeCodeRegEx.test(e.code)){
                secondGradeItems.push(e);
            }else if(thirdGradeCodeRegEx.test(e.code)){
                thirdGradeItems.push(e);
            }
        });

        secondGradeItems.map((e) => {
            let firstGradeItem = firstGradeItems.find(el => {
                return el.code === e.code.split('.')[0];
            });
            if(firstGradeItem){
                firstGradeItem.children.push(Object.assign({}, e, {children: []}))
            }else{
                throw ('没有找到code='+e.code+'的上级菜单！');
            }
        });

        thirdGradeItems.map((e) => {
            let gradeArray = e.code.split('.');
            let firstGradeItem = firstGradeItems.find(el => {
                return el.code === e.code.split('.')[0];
            });
            if(firstGradeItem){
                let secondGradeItem = firstGradeItem.children.find(el => {
                    return el.code === gradeArray[0] + '.' + gradeArray[1];
                })
                if(secondGradeItem){
                    secondGradeItem.children.push(e);
                }else{
                    throw ('没有找到code='+e.code+'的上级菜单！');
                }
            }else{
                throw ('没有找到code='+e.code+'的上级菜单！');
            }
        });
    }

    componentDidMount () {
        let urlArray = location.href.split('/');
        if(urlArray.indexOf('/#/') > 0){
            let currentPath = '/' + urlArray[urlArray.indexOf('#') + 1];
            let currentLinkObj = Links.find(e => {
                return e.path == currentPath;
            });
            this.handleClick(currentLinkObj.code);
        }else {

        }
    }

    handleMouseOver(code) {
        let o = {};
        o['hover-' + code] = true;
        this.setState(o)
    }

    handleMouseLeave(code) {
        let o = {};
        o['hover-' + code] = false;
        this.setState(o);
    }
    handleClick(code, subjectId) {
        this.props.dispatch(menuToHighLight(code));
        if(subjectId){
            this.props.dispatch(switchSubjectId(subjectId, 'PROVINCE', 'PROVINCE'));
        }
    }
    calculateClassNames = code => {
        if(firstGradeCodeRegEx.test(code)){
            return cn(['first-grade-ul', 'clearfix'])
        }else if (secondGradeCodeRegEx.test(code)) {
            let firstCode = code.split('.')[0];
            return cn('second-grade-ul', {'second-grade-show': this.state['hover-' + firstCode], 'second-grade-hide': !this.state['hover-' + firstCode]});
        }else if(thirdGradeCodeRegEx.test(code)) {
            return 'third-grade-ul';
        }
    }

    isActive = (code) => {
        let index = this.props.highLightCodes.indexOf(code + '');
        return index >= 0;
    }

    itemsRender (items) {
        return (
            <ul className={this.calculateClassNames(items[0].code)}>
                {
                    items.map(e => (
                        <li key={e.code} onMouseOver={this.handleMouseOver.bind(this, e.code)}
                            onMouseLeave={this.handleMouseLeave.bind(this, e.code)}>
                            <div className="link-container">
                                <NavLink exact to={{pathname: e.path}}
                                         isActive={this.isActive.bind(this, e.code)}
                                         activeClassName={firstGradeCodeRegEx.test(e.code) ? 'avtice-first-grade' : 'active-second-grade'}
                                         onClick={this.handleClick.bind(this, e.code, e.subjectId)}>
                                    {e.name}
                                    {
                                        e.code === '1' || e.code === '2' ? (
                                            <FaCaretDown style={{marginBottom: '3px'}}/>
                                        ) : ''

                                    }
                                </NavLink>
                            </div>
                            {e.children && e.children.length > 0 ? (
                                this.itemsRender(e.children)
                            ): ''}
                        </li>
                    ))
                }
            </ul>
        )
    }

    render(){
        return (
            <div className="router-wrapper">
                {
                    this.itemsRender(firstGradeItems)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {highLightCodes: state.navigator.highLightCodes};
};

export default connect(mapStateToProps)(IRouter)