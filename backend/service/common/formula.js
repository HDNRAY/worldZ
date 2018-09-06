
module.exports = {
    getDamage: ({ strength, agility }) => {
        return strength + agility * 0.8
    },
    getSpeed: ({ agility, }) => {
        return 1 / (1 + Math.max(0, agility - 150)) + 20 / agility
    }
}