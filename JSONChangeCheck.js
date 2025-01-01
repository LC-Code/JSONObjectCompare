const TypeUtils = require('./TypeUtils.js');
const CompareBuilder = require('./CompareBuilder.js');
const JSONCompare = (function () {
    const EMPTY_STRING_AS_NULL = true;
    const EMPTY_OBJECT_AS_NULL = true;
    const EMTPY_LIST_AS_NULL = true;
    const NUMBER_STRING_AS_NUMBER = true;
}());
module.exports = JSONCompare;