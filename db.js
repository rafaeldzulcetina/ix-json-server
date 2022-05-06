module.exports = function() {
    return Object.assign({},
        require('./mockApi/cardTypes.json'),
        require('./mockApi/couples.json')
    )
}