const TypeUtils = require('./TypeUtils.js');
const CompareBuilder = require('./CompareBuilder.js');
const JSONCompare = (function () {
    const EMPTY_STRING_AS_NULL = true;
    const EMPTY_OBJECT_AS_NULL = true;
    const EMTPY_LIST_AS_NULL = true;
    const NUMBER_STRING_AS_NUMBER = true;
    //比较两个对象之间的属性变化

    //比较器对象
    const compareBuilder = new CompareBuilder();
   

    return class JSONCompare {

        __getKeys(v1, v2) {
            let keys = new Set();
            let _addObjKeysToSet_ = function (obj) {
                if (!TypeUtils.isNull(obj)) {
                    Object.keys(obj).forEach(item => keys.add(item));
                }
            }
            _addObjKeysToSet_(v1);
            _addObjKeysToSet_(v2);
            return [...keys];
        }

        compare(v1, v2, compareLogic) {
            let keys = this.__getKeys(v1, v2);
            let result = {};
            for (let attribute of keys) {
                let compare = this.compareCode(v1[attribute], v2[attribute], compareLogic);
                result[attribute] = compare;
            }
            console.debug(result);
        }

        compareCode(v1, v2, compareLogic) {
            let type1 = TypeUtils.parseType(v1);
            let type2 = TypeUtils.parseType(v2);
            let compare;
            if (type1 !== type2) {
                compare = false;
            } else {
                //判断是否是JSON String
                if (TypeUtils.isJsonStr(v1) || TypeUtils.isJsonStr(v2)) {
                    compare = compareBuilder.__jsonStrCompare(v1, v2, compareLogic);
                } else {
                    let compareFun = compareBuilder.bulider(type1);
                    compare = compareFun(v1, v2);
                }
            }
            return {
                _t1: type1,
                _t2: type2,
                _v1: v1,
                _v2: v2,
                compare: compare
            }
        }
    }
}());
module.exports = JSONCompare;