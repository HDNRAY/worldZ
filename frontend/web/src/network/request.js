import fetch from 'dva/fetch';
import { jsonToQuery, jsonToParams } from '../utils/common'
import { domain } from './config'

const parseJSON = (response) => {
    return response.json();
}

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

// const getToken = (response) => {
//     console.log(response.headers.get('wztoken'))
//     if (!wztoken) wztoken = response.headers.get('wztoken')
//     return response;
// }

// let wztoken

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const request = (url, options = {}) => {
    // options.credentials = 'same-origin'
    options.mode = 'cors'
    options.credentials = 'include'
    options.headers = {
        'Content-Type': 'application/json',
        // 'wztoken': wztoken
    }
    return fetch(domain + url, options)
        .then(checkStatus)
        // .then(getToken)
        .then(parseJSON)
        .then(data => {

            if (data.status === 'success') {
                return data.data
            }

            if (data.status === 'failure') {
                const err = new Error()
                err.name = data.errCode
                err.message = data.errMsg
                throw err
            }
        })
    // .catch(err => {
    //     console.log(err)
    // });
}

export const post = (url, { body, params }) => {
    const options = {
        method: 'post',
        body: JSON.stringify(body)
    }
    const fullUrl = params ? jsonToParams(url, params) : url
    return request(fullUrl, options)
}

export const get = (url, { query, params }) => {
    url += query ? jsonToQuery(query) : ''
    const fullUrl = params ? jsonToParams(url, params) : url
    return request(fullUrl)
}

export const apiRequest = (api, { query, body, params } = {}) => {
    console.log(query, body, params)
    const url = api.path + (query ? jsonToQuery(query) : '')
    const fullUrl = params ? jsonToParams(url, params) : url
    const options = {
        method: api.method,
        body: JSON.stringify(body)
    }
    return request(fullUrl, options)
}
