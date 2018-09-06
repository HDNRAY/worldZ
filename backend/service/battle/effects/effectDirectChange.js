
class EffectDirectChange {
    constructor({ target, attribute, value }) {
        this.target = target
        this.attribute = attribute
        this.value = value
    }

    implement() {
        this.target.currentStatus[this.attribute] += this.value
    }
}

module.exports = EffectDirectChange