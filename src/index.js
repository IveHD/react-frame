import React from 'react';
import {render} from 'react-dom';
import App from './container/App';

import './index.less';

import { has } from '@src/util/permission/index';
window.has = has;  //判断权限的函数挂载到window上，组建内随时随地可以使用

render(<App/>, document.getElementById('root'));