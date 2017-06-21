'use strict';

import request from 'superagent';

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

    static put = (url, data) => new Promise((resolve, reject) => {
        request.put(buildUrl(url), data).end(resultHandler(resolve, reject));
    });

    static delete = url => new Promise((resolve, reject) => {
        request.delete(buildUrl(url)).end(resultHandler(resolve, reject));
    });
};
