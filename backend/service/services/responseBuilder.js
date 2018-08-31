
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

builder.buildFailureResponse = (errCode, errMsg) => {
    return buildResponse({
        errCode,
        errMsg,
        status: 'failure'
    })
}

builder.buildCatchError = (res) => (err) => {
    console.log(err)
    if (err.errCode) {
        res.send(buildResponse({
            ...err,
            status: 'failure'
        }))
    } else {
        res.send(buildResponse({
            errCode: 1000,
            errMsg: 'Server Issue',
            status: 'failure'
        }))
    }
}

module.exports = builder