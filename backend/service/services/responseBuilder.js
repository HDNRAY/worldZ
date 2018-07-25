
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

module.exports = builder