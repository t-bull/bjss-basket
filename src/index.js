#!/usr/bin/env node
"use strict";

const program = require('commander');
const Basket = require('./basket');
const Product = require('./product');

program
    .version('0.0.1')
    .description('BJSS Coding Test.')
    .arguments('[products...]')
    .action(function (basketItems) {
        const availableItems = new Map();
        availableItems.set('soup', new Product('Soup', 0.65));
        availableItems.set('bread', new Product('Bread', 0.80, 0.50));
        availableItems.set('milk', new Product('Milk', 1.30));
        availableItems.set('apples', new Product('Apples', 1.00, 0.10));
        const basket = new Basket(availableItems);

        console.log(basket.calculateBasket(basketItems));
    })
    .parse(process.argv);
    