"use strict";
exports.__esModule = true;
exports.Checkout = void 0;
var product_1 = require("../product/product");
var find = require('lodash/find');
var filter = require('lodash/filter');
var isEmpty = require('lodash/isEmpty');
var Checkout = /** @class */ (function () {
    function Checkout(pricingRules) {
        var _this = this;
        this.pricingRules = [];
        this.customer = '';
        this.items = [];
        this.setCustomer = function (customer) {
            _this.customer = customer;
        };
        this.clear = function () {
            _this.customer = '';
            _this.items = [];
        };
        this.add = function (productName) {
            var product = product_1.getProduct(productName);
            if (product) {
                var existingItem = find(_this.items, function (item) {
                    return item.product.name === productName;
                });
                if (existingItem) {
                    existingItem.quantity++;
                }
                else {
                    var newItem = { 'product': product, 'quantity': 1 };
                    _this.items.push(newItem);
                }
            }
        };
        this.total = function () {
            var totalCost = 0;
            var getDefaultPricingRule = function (pricingRules) {
                return filter(pricingRules, function (pricingRule) {
                    return pricingRule.customers.includes('default');
                });
            };
            _this.items.forEach(function (item) {
                var pricingRule = find(_this.pricingRules, ['product', item.product.name]);
                if (pricingRule) {
                    // Determine the discounted price of the item
                    var itemPrice_1 = item.product.price;
                    var discountPricingRules = filter(pricingRule.discountPricingRules, function (discountPricingRule) {
                        return discountPricingRule.customers.includes(_this.customer);
                    });
                    if (isEmpty(discountPricingRules)) {
                        discountPricingRules = getDefaultPricingRule(pricingRule.discountPricingRules);
                    }
                    discountPricingRules.forEach(function (discountPricingRule) {
                        itemPrice_1 = (itemPrice_1 - discountPricingRule.discount);
                    });
                    // Determine the total quantity
                    var quantityPricingRules = filter(pricingRule.quantityPricingRules, function (quantityPricingRule) {
                        return quantityPricingRule.customers.includes(_this.customer);
                    });
                    if (isEmpty(quantityPricingRules)) {
                        quantityPricingRules = getDefaultPricingRule(pricingRule.quantityPricingRules);
                    }
                    var totalQuantity_1 = 0;
                    quantityPricingRules.forEach(function (quantityPricingRule) {
                        var freeQuantity = (item.quantity / quantityPricingRule.baseQuantity) * quantityPricingRule.freeQuantity;
                        totalQuantity_1 += (item.quantity - freeQuantity);
                    });
                    // Determine the total cost
                    totalCost += (itemPrice_1 * totalQuantity_1);
                }
            });
            return totalCost;
        };
        this.pricingRules = pricingRules;
    }
    return Checkout;
}());
exports.Checkout = Checkout;
