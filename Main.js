const JSONCompare = require('./JSONChangeCheck.js')
const TypeUtils = require('./TypeUtils.js');
let compare = new JSONCompare();
//console.log(TypeUtils.parseType('string'));
//console.log(TypeUtils.isNull('null'));
//console.log(TypeUtils.isNumber('a1a'));
//console.log(TypeUtils.isString(''), TypeUtils.isString('1'), TypeUtils.isString('a'), TypeUtils.isString());
//console.log(TypeUtils.isObject({}), TypeUtils.isObject({a: 1, b: 2}));

console.debug('-------- 测试比较器中获取对象中的key-----------');
//console.log(compare.__getKeys({a: 'a', b: 'b', c: [1,2,3,567]}, {c: [1,2,3,566], a: 'a', f: 'f'}));
//console.log(compare.__getKeys(null, {c: 'c', a: 'a', f: 'f'}));
//console.log(compare.__getKeys(null, null));
console.log('--------------------------------------------');

const testObject1 = {
    a: 'a',
    b: 'b',
    c: [1, 2, 3, 567],
    time: new Date(),
    json: JSON.stringify({
        a: '1',
        b: 'String',
        c: new Date()
    })
};
const testObject2 = {
    c: [1, 2, 3],
    a: 'a',
    f: 'f',
    time: new Date('2025-12-31'),
    json: JSON.stringify({
        a: 'Time',
        b: 'String',
        c: new Date()
    })
};

console.debug(compare.compare(testObject1, testObject2));