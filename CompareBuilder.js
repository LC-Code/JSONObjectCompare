const TypeUtils = require('./TypeUtils.js');
module.exports = (function () {
    return class CompareBuilder {
        bulider(type) {
            switch (type) {
                case 'string':
                    return this.strCompare;
                case 'number':
                    return this.numberCompare;
                case 'object':
                    return this.objectCompare;
                case 'json':
                    return this.jsonStrCompare;
                case 'date':
                    return this.dataCompare;
                case 'array':
                    return this.arrayCompare;
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
        jsonStrCompare(v1, v2) {
            return this.objectCompare(v1, v2);
        }
        strCompare(v1, v2) {
            return v1 === v2;
        }
        numberCompare(v1, v2) {
            return v1 === v2;
        }
        objectCompare(v1, v2) {

        }

        dataCompare(v1, v2) {
            return v1.getTime() === v2.getTime();

        }
        arrayCompare(v1, v2) {
            if (v1.length === v2.length) {
                //同规则排序
                v1.sort();
                v2.sort();
                //TODO 可能存在对象，数值，字符串的情况
                let length = v1.length;
                for (let index = 0; index < length; index++) {
                    if (v1[index] !== v2[index]) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        }
    }
}());