"use strict";
exports.__esModule = true;
exports.readPricingRules = void 0;
var readPricingRules = function () {
    var pricingRulesConfig = require('../config/price-rules-config.json');
    var pricingRules = [];
    pricingRulesConfig.map(function (pricingRule) {
        pricingRules.push(pricingRule);
    });
    return pricingRules;
};
exports.readPricingRules = readPricingRules;
