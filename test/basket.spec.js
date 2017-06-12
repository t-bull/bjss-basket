"use strict";

const chai = require('chai');
const expect = chai.expect;
const Basket = require('../src/basket');
const Product = require('../src/product');

describe ('BJSS Basket - ', function () {
    const availableItems = new Map();
    availableItems.set('soup', new Product('Soup', 0.65));
    availableItems.set('bread', new Product('Bread', 0.80, 0.50));
    availableItems.set('milk', new Product('Milk', 1.30));
    availableItems.set('apples', new Product('Apples', 1.00, 0.10));
    const basket = new Basket(availableItems);

    describe('Given soup is added to the basket', function () {
        it('65p will be added to the subtotal', function () {
            const result = basket.calculateBasket(['Soup']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £0.65 \n(no offers available)\nTotal: £0.65');
        });
    });

    describe('Given bread is added to the basket', function () {
        it('80p will be added to the subtotal', function () {
            const result = basket.calculateBasket(['Bread']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £0.80 \n(no offers available)\nTotal: £0.80');
        });
    });

    describe('Given milk is added to the basket', function () {
        it('£1.30 will be added to the subtotal', function () {
            const result = basket.calculateBasket(['Milk']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £1.30 \n(no offers available)\nTotal: £1.30');
        });
    });

    describe('Given apples are added to the basket', function () {
        it('£1.00 will be added to the subtotal', function () {
            const result = basket.calculateBasket(['Apples']);
            expect(result.indexOf('Subtotal: £1.00')).to.be.gt(-1);
        });
    });

    describe('Given a list of items are added to the basket', function () {
        it('the prices of each item should be added together to compute a subtotal', function () {
            const baskets = [
                ['Milk', 'Bread', 'Apples', 'Soup'], // subtotal: £3.75
                ['Milk', 'Milk', 'Soup', 'Apples'], // subtotal: £4.25
                ['Bread', 'Bread', 'Milk'] // subtotal: £2.90
            ];

            baskets.forEach((items, index) => {
                let result = basket.calculateBasket(items);
                expect(result).to.be.a.string;
                switch (index) {
                    case 0:
                        expect(result.indexOf('Subtotal: £3.75')).to.be.gt(-1);
                        break;
                    case 1:
                        expect(result.indexOf('Subtotal: £4.25')).to.be.gt(-1);
                        break;
                    default:
                        expect(result.indexOf('Subtotal: £2.90')).to.be.gt(-1);
                        break;
                }
            });
        });
    });

    describe('Given I have added Apples to my basket', function () {
        it('I should get 10% off the price', function () {
            const result = basket.calculateBasket(['Apples']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £1.00 \nApples 10% off: -10p\nTotal: £0.90');
        });
    });

    describe('Given I have two tins of soup in my basket and a loaf of bread', function () {
        it('I should get 50% off the price of my loaf of bread', function () {
            const specialOfferBasket = ['Soup', 'Soup', 'Bread'];
            const result = basket.calculateBasket(specialOfferBasket);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £2.10 \nBread 50% off: -40p\nTotal: £1.70');
        });
    });

    describe('Given I have items in my basket where no special offers apply', function () {
        it('My reciept should show that no discounts were applied', function () {
            const result = basket.calculateBasket(['Soup', 'Milk', 'Bread']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £2.75 \n(no offers available)\nTotal: £2.75');
        });
    });

    describe('Given I have a basket where both special offers apply', function () {
        it('both discount should show on the reciept and deducted from the total', function () {
            const result = basket.calculateBasket(['Soup', 'Soup', 'Bread', 'Apples']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £3.10 \nApples 10% off: -10p\nBread 50% off: -40p\nTotal: £2.60');
        });
    });

    describe('As the owner of the store', function () {
        it('I should be able to alter the discount values on my special offers', function () {
            availableItems.set('apples', new Product('Apples', 1.00, 0.25));
            const result = basket.calculateBasket(['Apples']);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £1.00 \nApples 25% off: -25p\nTotal: £0.75');
        });

        it('And I should be able to add items to sell', function () {
            const specialOfferBasket = ['Bananas'];
            availableItems.set('bananas', new Product('Bananas', 1.50));
            const basket = new Basket(availableItems);
            const result = basket.calculateBasket(specialOfferBasket);
            expect(result).to.be.a.string;
            expect(result).to.equal('Subtotal: £1.50 \n(no offers available)\nTotal: £1.50');
        });
    });
});
