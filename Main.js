const TypeUtils = require('./TypeUtils.js');
const { CompareBuilder, CompareLogic } = require('./CompareBuilder.js');
const fs = require('fs').promises;
const path = require('path');
let compareBuilder = new CompareBuilder();


const readJsonFile = async function (filePath) {
    try {
        // 使用 fs.promises.readFile 方法读取文件
        const jsonData = await fs.readFile(filePath, 'utf8');

        // 将读取的数据解析为 JSON 对象
        return JSON.parse(jsonData);
    } catch (err) {
        console.error('读取或解析文件出错:', err);
        return null;
    }
}

let parseTypeTest = function () {
    console.log(TypeUtils.parseType(true));
    console.log(TypeUtils.isNull('null'));
    console.log(TypeUtils.isNumber('a1a'));
    console.log(TypeUtils.isString(''), TypeUtils.isString('1'), TypeUtils.isString('a'), TypeUtils.isString());
    console.log(TypeUtils.isObject({}), TypeUtils.isObject({ a: 1, b: 2 }));
}

let parseKeysTest = function () {
    console.log(compareBuilder.__getKeys({ a: 'a', b: 'b', c: [1, 2, 3, 567] }, { c: [1, 2, 3, 566], a: 'a', f: 'f' }));
    console.log(compareBuilder.__getKeys(null, { c: 'c', a: 'a', f: 'f' }));
    console.log(compareBuilder.__getKeys(null, null));
}

let compareBuilderTest = function () {
    const testObject1 = {
        a: 'a',
        b: 'b',
        c: [1, 2, 3, 567],
        d: {
            name: 'xiali',
            age: 12,
        },
        time: new Date(),
        json: JSON.stringify({
            a: '1',
            b: 'String',
            c: new Date()
        })
    };
    const testObject2 = {
        c: [1, 2, 3, 3234],
        a: 'a',
        f: 'f',
        time: new Date('2025-12-31'),
        json: JSON.stringify({
            a: 'Time',
            b: 'String',
            c: new Date()
        })
    };

    // console.debug(compare.compare(testObject1, testObject2));
    let result = compareBuilder.compareCode(testObject1, testObject2);
    console.debug(result);
    // console.info(JSON.stringify(result, null, '\t'));
    console.debug(compareBuilder.parseCompareStatus(result));
}

let fusionFormValueTest = async function () {
    // 指定 JSON 文件的路径
    let testJson_01 = path.join('./', 'test_01.json');
    let testJson_02 = path.join('./', 'test_02.json');
    // 调用函数读取 JSON 文件
    let test_01 = await readJsonFile(testJson_01);
    let test_02 = await readJsonFile(testJson_02);

    // console.debug(compare.compare(testObject1, testObject2));
    let result = compareBuilder.compareCode(test_01, test_02, CompareLogic.JSON_STRING_AS_OBJECT, CompareLogic.NUMBER_STRING_AS_NUMBER);
    console.debug(result);
    // console.info(JSON.stringify(result, null, '\t'));
    console.debug(compareBuilder.parseCompareStatus(result));
}

fusionFormValueTest();