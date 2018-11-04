const { ERROR_SERVER_ISSUE } = require('./exceptions');
const builder = {}

const buildResponse = ({ data, status, errCode, errMsg }) => {
    return {
        data,
        status,
        errCode,
        errMsg
    }
}

builder.buildSuccessResponse = (data) => {
    return buildResponse({
        data,
        status: 'success'
    })
}

builder.buildFailureResponse = ({ code, message }) => {
    return buildResponse({
        errCode: code,
        errMsg: message,
        status: 'failure'
    })
}

builder.buildCatchError = (err) => {
    console.log('build catch error', err)
    if (err.errCode || err.code) {
        return buildResponse({
            ...err,
            status: 'failure'
        })
    } else {
        return builder.buildFailureResponse(ERROR_SERVER_ISSUE)
    }
}

module.exports = builder