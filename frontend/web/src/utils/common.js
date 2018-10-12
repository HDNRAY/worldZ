
export const jsonToQuery = (json) => {
    return Object.keys(json).reduce((result, key, index) => {
        if (index > 0) {
            result += '&'
        } else {
            result += '?'
        }
        result += `${key}=${json[key]}`
        return result
    }, '')
}

export const jsonToParams = (url, json) => {
    return Object.keys(json).reduce((result, key) => {
        return result.replace(`:${key}`, json[key])
    }, url)
}
