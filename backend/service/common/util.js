module.exports = {
    checkAttributes: ({ target, attributes }) => {
        return attributes.every(item => target[item] !== undefined || target[item] !== null)
    }
}