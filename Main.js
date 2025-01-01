// const JSONCompare = require('./JSONChangeCheck.js');
const TypeUtils = require('./TypeUtils.js');
const CompareBuilder = require('./CompareBuilder.js');
// let compare = new JSONCompare();
let compareBuilder = new CompareBuilder();

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

let fusionFormValueTest = function () {
    const testObject1 = {
        "Z_PASS_ENTITY": null,
        "LOADING_END_DATE": "20241121",
        "LAW": null,
        "COUNTERPARTY_CONTRACT_REF": null,
        "CREATED_AT": "2024-12-31T07:49:49.000+0000",
        "INCOTERM": "CIP",
        "PRICING_FORMULA_DESC": "FIXED PRICE 27.00000000 USD/BBL",
        "Z_STATUS": 0,
        "Z_CREDIT_REFER": null,
        "CP_SHORT_NAME": "Adnoc Trading Limited",
        "Z_PHY_QUALITY": null,
        "CREATOR_ID": 0,
        "STATUS": 0,
        "PAYMENT_TERM_DESC": "1 business after(start date=0) DEEMED COD",
        "PORTFOLIO_ID": 37396,
        "NOTES_REMARKS": null,
        "UPDATED_AT": "2024-12-31T07:49:49.000+0000",
        "ID": 228,
        "Z_LOCK_STATUS": 0,
        "INSPECTION": "100% Buyer",
        "Z_STRATEGYID": null,
        "DISCHARGE_PORT": null,
        "LC_ID": null,
        "PRICING_FORMULA": "{\"fixed_pricing_detail\":{\"number0\":\"27.00000000\",\"phy_uom\":\"BBL\",\"phy_common_currency\":\"USD\"},\"formulaTemplateInfo\":{},\"priceFormulaType\":\"Fixed\",\"formulaDescription\":\"FIXED PRICE 27.00000000 USD/BBL\"}",
        "COMMODITY_ID": 5,
        "TRANSPORT_MODE": null,
        "PHY_CONTRACT_TERM": "Term",
        "NOTES_LAY_TIME": null,
        "CONTRACT_NUMBER": "Test Term Copy Recap",
        "QUANTITY_TYPE": 0,
        "LOADING_START_DATE": "20241119",
        "TERM_CONTRACT_ID": "15",
        "Z_PASS_COUNTERPARTY": null,
        "SUB_RECAP_NO": 1,
        "Z_BACK_UP_TRADER": "BK",
        "CP_NAME": "Adnoc Trading Limited",
        "STRATEGY_NAME": "Mar Murban,123",
        "LOADING_PORT": null,
        "SLLXBS": 0,
        "APPROVAL_STATUS": null,
        "MTM_FORMULA_TYPE": "Average",
        "PORTFOLIO_PATH": "/202404-202503/Cathay/Capital/Paper/INE",
        "Z_PREM_E_DETAIL": "[]",
        "STRATEGY_ID": null,
        "COUNTERPARTY_ID": 226,
        "DISCHARGE_START_DATE": null,
        "MTM_FORMULA_DESC": "CME E-mini Nasdaq-100 - 0 USD/BBL",
        "PORTFOLIO": "INE",
        "RECAP_NO": 209,
        "DISCHARGE_END_DATE": null,
        "INDUSTRY": "CRUDE",
        "LC_MATCH_ID": null,
        "DIRECTION": "SELL",
        "BOOKING_ENTITY": "CATHAY_SG",
        "PAYMENT_TERM": "{\"details\":[{\"days\":\"business\",\"days_num\":1,\"from_after_before\":\"after(start date=0)\",\"short_name\":\"DEEMED COD\",\"start_date\":\"DEEMED COD\"}],\"payment_type\":\"by_calculation\"}",
        "SETTLEMENT_QTY_UOM": null,
        "RECAP_NO_TEXT": "209-1",
        "PRIMITIVE_ID": null,
        "NOTES_DESTINATION_RESTRICTION": null,
        "TRADING_OR_AGENT": null,
        "PRICING_FORMULA_PRECISION": 3,
        "CREDIT_TERM": "BBOND",
        "Z_A_ID": null,
        "GROUP_NO": null,
        "TRADER": "BK",
        "GTC": null,
        "COMMODITY_NAME": "Brent Blend",
        "Z_PASSORDER_C": null,
        "ARBITRATION": null,
        "PRICING_FORMULA_TYPE": "Fixed",
        "PHY_QUANTITY_V1": "[100000,\"BBL\",\"\\u00b1\",\"5\",\"%\",\"BUYER\",null]",
        "Z_PASSORDER_A": null,
        "SETTLEMENT_QUANTITY_BASIS": null,
        "DEAL_DATE": "20241011",
        "PHY_QUANTITY_V2": null,
        "MTM_FORMULA": "{\"average_pricing_detail\":{\"five_fire_balls\":{\"commodity\":\"EMINI NSDQ\",\"price_source\":\"EXCHANGE\",\"market\":\"CME\",\"price_term\":\"\",\"average\":\"\",\"benchmark_id\":\"60\",\"period\":\"Spot\",\"h_l\":\"CLOSE\"},\"name1\":\"CME E-mini Nasdaq-100\",\"shortcut\":\"/EMINI NSDQ/EXCHANGE/CME/Spot/CLOSE\",\"normalnumber\":0,\"phy_common_currency\":\"USD\",\"phy_uom\":\"BBL\",\"mark\":\"+\",\"number0\":0,\"date1\":\"Dec/10/2024\",\"date2\":\"Dec/10/2024\",\"relative\":\"0\",\"type\":\"average\",\"term\":{\"type\":\"relative\",\"detail\":{\"relative_type\":\"\",\"for_day\":\"\",\"day\":\"\",\"for\":\"\",\"day_type\":\"\",\"day_relation\":\"\",\"period\":\"\"}}},\"formulaTemplateInfo\":{},\"priceFormulaType\":\"Average\",\"formulaDescription\":\"CME E-mini Nasdaq-100 - 0 USD/BBL\"}",
        "Z_PASSORDER_B": null
      };

      const testObject2 = {
        "Z_PASS_ENTITY": null,
        "LOADING_END_DATE": null,
        "LAW": null,
        "COUNTERPARTY_CONTRACT_REF": "TEST-CP-20241231",
        "CREATED_AT": "2024-12-31T07:45:08.000+0000",
        "INCOTERM": "CFR",
        "PRICING_FORMULA_DESC": "FIXED PRICE 1231 USD/BBL",
        "Z_STATUS": 0,
        "Z_CREDIT_REFER": null,
        "CP_SHORT_NAME": "Bgn Int DMCC",
        "Z_PHY_QUALITY": null,
        "CREATOR_ID": 0,
        "STATUS": 0,
        "PAYMENT_TERM_DESC": "1 business after(start date=0) B/L (Bill of Lading)",
        "PORTFOLIO_ID": 37383,
        "NOTES_REMARKS": null,
        "UPDATED_AT": "2024-12-31T07:45:08.000+0000",
        "ID": 226,
        "Z_LOCK_STATUS": 0,
        "INSPECTION": null,
        "Z_STRATEGYID": null,
        "DISCHARGE_PORT": null,
        "LC_ID": null,
        "PRICING_FORMULA": "{\"fixed_pricing_detail\":{\"number0\":\"1231.00000000\",\"phy_uom\":\"BBL\",\"phy_common_currency\":\"USD\"},\"formulaTemplateInfo\":{},\"priceFormulaType\":\"Fixed\",\"formulaDescription\":\"FIXED PRICE 1231 USD/BBL\"}",
        "COMMODITY_ID": 5,
        "TRANSPORT_MODE": null,
        "PHY_CONTRACT_TERM": null,
        "NOTES_LAY_TIME": null,
        "CONTRACT_NUMBER": "TEST-20241231",
        "QUANTITY_TYPE": 0,
        "LOADING_START_DATE": null,
        "TERM_CONTRACT_ID": null,
        "Z_PASS_COUNTERPARTY": null,
        "SUB_RECAP_NO": 1,
        "Z_BACK_UP_TRADER": "Anders",
        "CP_NAME": "Bgn Int DMCC",
        "STRATEGY_NAME": "Mar Murban",
        "LOADING_PORT": null,
        "SLLXBS": 0,
        "APPROVAL_STATUS": null,
        "MTM_FORMULA_TYPE": "Average",
        "PORTFOLIO_PATH": "/202404-202503/Cathay/SG/Physical/Onishi/Inventory/Purchase",
        "Z_PREM_E_DETAIL": "[{\"key\":\"FREIGHT\",\"value\":100}]",
        "STRATEGY_ID": null,
        "COUNTERPARTY_ID": 236,
        "DISCHARGE_START_DATE": null,
        "MTM_FORMULA_DESC": "BLPG1 - 0 USD/BBL",
        "PORTFOLIO": "Purchase",
        "RECAP_NO": 208,
        "DISCHARGE_END_DATE": null,
        "INDUSTRY": "CRUDE",
        "LC_MATCH_ID": null,
        "DIRECTION": "BUY",
        "BOOKING_ENTITY": "CATHAY_HK",
        "PAYMENT_TERM": "{\"details\":[{\"days\":\"business\",\"days_num\":1,\"from_after_before\":\"after(start date=0)\",\"short_name\":\"B/L\",\"start_date\":\"B/L (Bill of Lading)\"}],\"payment_type\":\"by_calculation\"}",
        "SETTLEMENT_QTY_UOM": null,
        "RECAP_NO_TEXT": "208-1",
        "PRIMITIVE_ID": null,
        "NOTES_DESTINATION_RESTRICTION": null,
        "TRADING_OR_AGENT": null,
        "PRICING_FORMULA_PRECISION": 3,
        "CREDIT_TERM": null,
        "Z_A_ID": null,
        "GROUP_NO": null,
        "TRADER": "Anders",
        "GTC": null,
        "COMMODITY_NAME": "Brent Blend",
        "Z_PASSORDER_C": 0,
        "ARBITRATION": null,
        "PRICING_FORMULA_TYPE": "Fixed",
        "PHY_QUANTITY_V1": "[1000,\"BBL\",\"\\u00b1\",\"5\",\"%\",\"BUYER\",null]",
        "Z_PASSORDER_A": 0,
        "SETTLEMENT_QUANTITY_BASIS": null,
        "DEAL_DATE": "20241231",
        "PHY_QUANTITY_V2": null,
        "MTM_FORMULA": "{\"average_pricing_detail\":{\"five_fire_balls\":{\"commodity\":\"BLPG1\",\"price_source\":\"EXCHANGE\",\"market\":\"BALTIC SETTLE\",\"price_term\":\"\",\"average\":\"\",\"benchmark_id\":\"27\",\"period\":\"Spot\",\"h_l\":\"CLOSE\"},\"name1\":\"BLPG1\",\"shortcut\":\"/BLPG1/EXCHANGE/BALTIC SETTLE/Spot/CLOSE\",\"normalnumber\":0,\"phy_common_currency\":\"USD\",\"phy_uom\":\"BBL\",\"mark\":\"+\",\"number0\":0,\"date1\":\"Dec/31/2024\",\"date2\":\"Dec/31/2024\",\"relative\":\"0\",\"type\":\"average\",\"term\":{\"type\":\"relative\",\"detail\":{\"relative_type\":\"\",\"for_day\":\"\",\"day\":\"\",\"for\":\"\",\"day_type\":\"\",\"day_relation\":\"\",\"period\":\"\"}}},\"formulaTemplateInfo\":{},\"priceFormulaType\":\"Average\",\"formulaDescription\":\"BLPG1 - 0 USD/BBL\"}",
        "Z_PASSORDER_B": 0
    };
    
    // console.debug(compare.compare(testObject1, testObject2));
    let result = compareBuilder.compareCode(testObject1, testObject1);
    console.debug(result);
    // console.info(JSON.stringify(result, null, '\t'));
    console.debug(compareBuilder.parseCompareStatus(result));
}

fusionFormValueTest();

