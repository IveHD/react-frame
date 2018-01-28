'use strict';

import request from 'superagent';
import { Base64 } from '@src/util/index';
// const buildUrl = url => `http://localhost:8080${url}`;
// const buildUrl = url => `http://192.168.1.110:8080${url}`;
const buildUrl = url =>`${url}`;

const resultHandler =
    (resolve, reject) =>
(err, res) => {
    if (err) {
        if (res.xhr.status == 401) {
            window.location.href = '/';
        } else {
            reject(err);
        }
    } else {
        if (res.xhr.responseURL.indexOf("login") > 0) {
            let idx, redirectUrl = res.xhr.responseURL;
            if ((idx = redirectUrl.indexOf(';jsessionid=')) > 0) {
                redirectUrl = redirectUrl.substring(0, idx);
            }
            window.location.replace(redirectUrl);
        }
        resolve(res.body);
    }
};

export default class WebApi {
    static get = (url, data) => new Promise((resolve, reject) => {
        data._ = Date.now().toString();
        request.get(buildUrl(url))
        .set('X-Requested-With', 'XMLHttpRequest')
            // .set('Expires', '-1')
            // .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private')
        .query(data)
        .end(resultHandler(resolve, reject));
    });

    static post = (url, data) => new Promise((resolve, reject) => {
        request.post(buildUrl(url), data).end(resultHandler(resolve, reject));
    });
    static jsonPost = (url, data) => new Promise((resolve, reject) => {
        request.post(buildUrl(url), data)
        .set('Content-Type', 'application/json;charset=utf-8')
        .end(resultHandler(resolve, reject));
    });
    static formPost = (url, data) => new Promise((resolve, reject) => {
        request.post(buildUrl(url), data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .end(resultHandler(resolve, reject));
    });

    static put = (url, data) => new Promise((resolve, reject) => {
        request.put(buildUrl(url), data).end(resultHandler(resolve, reject));
    });

    static delete = url => new Promise((resolve, reject) => {
        request.delete(buildUrl(url)).end(resultHandler(resolve, reject));
    });
    static fileUpload = (files, sourceCode) => new Promise((resolve, reject) => {
       if(files.length > 1){
                alert('最多同时上传一张图片！');
                return;
            }
            WebApi.post('/aliyun/oss/preUploadV2', {
                sourceCode: sourceCode || 'default',
                fileName: files[0].name || 'defaultName',
                user: 'EMPLOYEE_ACCOUNT',
                width: 200,
                height: 200
            }).then(data => {
                
                let requestParam = new FormData();
                requestParam.append('OSSAccessKeyId', data.accessKeyId);
                requestParam.append('policy', Base64.encode(data.policy));
                requestParam.append('Signature', data.signature.split(':')[1]);
                requestParam.append('key', data.fullName);
                
                for (var i in data.metaDatas) {
                    requestParam.append(i, encodeURI(data.metaDatas[i]).trim());
                }
                requestParam.append('file', files[0]);
                requestParam.append('submit', "Upload to OSS");
                WebApi.upload(data.contentHostName, requestParam).then(() => {resolve(data)});
            }).catch(error => {
                console.log(error)
            });
        });
    static upload = (url, data) => new Promise((resolve, reject) => {
        request.post(buildUrl(url), data)
                .set('processData', 'false')
                .set('contentType', 'false')
                .end(resultHandler(resolve, reject));
    });
};
