"use strict";
exports.__esModule = true;
exports.getProduct = exports.initialiseProducts = void 0;
var find = require('lodash/find');
var products = [];
var initialiseProducts = function () {
    var productsData = require('../config/product-config.json');
    productsData.map(function (productData) {
        products.push(productData);
    });
};
exports.initialiseProducts = initialiseProducts;
var getProduct = function (productName) {
    return find(products, ['name', productName]);
};
exports.getProduct = getProduct;
