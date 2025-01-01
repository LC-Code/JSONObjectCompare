const TypeUtils = require('./TypeUtils.js');
module.exports = (function () {
    return class CompareBuilder {
        bulider(type) {
            switch (type) {
                case 'string':
                    return this.__strCompare;
                case 'number':
                    return this.__numberCompare;
                case 'object':
                    return this.__objectCompare;
                case 'json':
                    return this.__jsonStrCompare;
                case 'date':
                    return this.__dataCompare;
                case 'array':
                    return this.__arrayCompare;
                case 'null':
                case 'undefined':
                    return () => {
                        return true;
                    }
                default:
                    return () => {
                        throw new Error(`${type} 该类型没有加入比较器`);
                    }
            }
        }

        //这里的JSON 字符串的比较本质上还是对象的比较
        __jsonStrCompare(v1, v2, compareLogic) {
            return this.__objectCompare(v1, v2, compareLogic);
        }
        //字符串比较
        __strCompare(v1, v2) {
            return v1 === v2;
        }
        //数值比较
        __numberCompare(v1, v2) {
            return v1 === v2;
        }
        //对象比较
        __objectCompare(v1, v2, compareLogic) {
            let keys = this.__getKeys(v1, v2);
            let compareInfo = {};
            let compareStatus = true;
            for(let attribute of keys) {
                let result = this.compareCode(v1[attribute], v2[attribute], compareLogic);
                compareInfo[attribute] = result;
                compareStatus = compareStatus && this.parseCompareStatus(result);
            }
            return {
                compareInfo: compareInfo,
                compare: compareStatus
            };
        }
        //日期比较
        __dataCompare(v1, v2) {
            return v1.getTime() === v2.getTime();

        }
        //数组比较
        __arrayCompare(v1, v2, compareLogic) {
            if (v1.length === v2.length) {
                //同规则排序
                v1.sort();
                v2.sort();
                //TODO 可能存在对象，数值，字符串的情况
                let length = v1.length;
                for (let index = 0; index < length; index++) {
                    let compare = this.compareCode(v1[index], v2[index], compareLogic);
                    let compareStatus = this.parseCompareStatus(compare);
                    if (!compareStatus) {
                        return compareStatus;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
        parseCompareStatus (compare) {
            if (TypeUtils.parseType(compare) === 'boolean') {
                return compare;
            }
            if(TypeUtils.parseType(compare) === 'object'){
                let compareStatus = this.parseCompareStatus(compare.compare);
                return compareStatus;
                // if (!compareStatus) {
                //     return compareStatus;
                // }
                //遍历比较结果，如果所有的比较结果都是true(也就是相同)返回True, 如果存在一个false,结束遍历，返回false
                // for (let attribute of compare) {
                //     let compareStatus = this.__parseCompareStatus(compare[attribute].compare);
                    
                // }
                // return true;
            }
            //如果compare 不是对象，也不是Boolean 类型，直接返回False;
            return false;
        }

        __getKeys(v1, v2) {
            let keys = new Set();
            let _addObjKeysToSet_ = (obj) => {
                if (!TypeUtils.isNull(obj)) {
                    Object.keys(obj).forEach(item => keys.add(item));
                }
            }
            _addObjKeysToSet_(v1);
            _addObjKeysToSet_(v2);
            return [...keys];
        }

        compareCode (v1, v2, compareLogic) {
            //获取数据类型
            let t1 = TypeUtils.parseType(v1);
            let t2 = TypeUtils.parseType(v2);
            let compare;
            if (t1 !== t2) {
                //TODO
                /**
                 * 两个数据类型不相等，且存在的比较情况
                 * 数值字符串（string) -- 数值 (number)
                 * JSON字符串 (string) -- 对象 (object)
                 */
                compare = false;
            } else {
                //两个类型相同的数据进行比较
                //TODO
                /**
                 * 两个数据类型相等，且需要更加精细的比较的情况
                 * JSON 字符串(string) -- JSON 字符串(string)
                 */
                compare = this.bulider(t1).call(this, v1, v2, compareLogic);
            }
            if (t1 === 'object' && t2 === 'object') {
                return compare;
            }else{
                return {
                    compareInfo: {
                        _t1: t1,
                        _t2: t2,
                        _v1: v1,
                        _v2: v2,
                    },
                    compare: compare,
                }
            }
        }
    }
}());