let count = 0;

module.exports = function plusOne() {
    return function() {
        return count++;
    };
};