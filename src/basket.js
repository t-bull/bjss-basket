"use strict";

/**
 * Basket that will calculate totals, apply discounts and return a reciept.
 * 
 * @class Basket
 */
class Basket {
    constructor(availableProducts) {
        this.storeItems = availableProducts;
        this.basketItems = [];
        this.subtotal = 0.00;
        this.total = 0.00;
        this.discountAmount = 0.00;
        this.discounts = [];
    }
    
    /**
     * Resets basket items and totals.
     * 
     * @memberof Basket
     */
    resetBasket() {
        this.subtotal = 0.00;
        this.total = 0.00;
        this.discountAmount = 0.00;
        this.discounts = [];
        this.basketItems = [];
    }

    /**
     * Calculates sub totals from items in the basket.
     * 
     * @memberof Basket
     */
    calculateSubTotal() {
        this.subtotal = this.basketItems.reduce((acc, item) => {
            return acc + item.getPrice();
        }, this.subtotal);
    }

    /**
     * checks if basket contains bread
     * 
     * @returns true or false if the current basket has a loaf of bread in it.
     */ 
    hasBread() {
        return this.basketItems.some(item => item.getName() === 'Bread');
    }

    /**
     * checks if basket contains two or more cans of soup
     * 
     * @returns true or false if the current basket has two or more tins of soup in it.
     * 
     * @memberof Basket
     */
    hasTwoOrMoreSoup() {
        return this.basketItems.filter(item => item.getName() === 'Soup').length >= 2;
    }

    /**
     * Calculates any discounts. Apples get 10% off
     * and if you have two cans of soup, then bread is half price.
     * 
     * @memberof Basket
     */
    calculateDiscounts() {
        // Apply discount for apples.
        this.basketItems.forEach(item => {
            if (item.getName() !== 'Apples') {
                return;
            }
            const apples = this.storeItems.get('apples');
            const discount = apples.getPrice() * apples.getDiscount();
            this.discountAmount += discount;
            this.discounts.push(this.formatDiscount('Apples', apples.getDiscount(), discount));
        });

        // Apply 2 cans of soup, bread half price discount.
        if (this.hasTwoOrMoreSoup() && this.hasBread()) {
            const bread = this.storeItems.get('bread');
            const discount = bread.getPrice() * bread.getDiscount();
            this.discountAmount += discount;
            this.discounts.push(this.formatDiscount('Bread', bread.getDiscount(), discount));
        }
    }

    /**
     * Calculates the total (subtotal - discounts)
     * 
     * @memberof Basket
     */
    calculateTotal() {
        this.total = this.subtotal - this.discountAmount;
    }

    /**
     * Formats a reciept showing all discounts and totals.
     * 
     * @returns [string] Reciept detailing totals and discounts applied if any.
     * 
     * @memberof Basket
     */
    formatResponse() {
        const discounts = this.discounts.length ? this.discounts.join('\n') : '(no offers available)';
        return `Subtotal: £${this.subtotal.toFixed(2)} \n${discounts}\nTotal: £${this.total.toFixed(2)}`;
    }

    /**
     * Formats the output for discounts on the main reciept.
     * 
     * @param {any} productName 
     * @param {any} percentageOff 
     * @param {any} discountAmount 
     * @returns [string] formatted disount `Bread 50% off: -40p`.
     * 
     * @memberof Basket
     */
    formatDiscount(productName, percentageOff, discountAmount) {
        return `${productName} ${this.formatDecimalNumber(percentageOff)}% off: -${this.formatDecimalNumber(discountAmount)}p`;
    }

    formatDecimalNumber(number) {
        return number.toFixed(2).slice(2);
    }

    /**
     * Takes in an array of product names, then computes all totals
     * and discounts then returns a reciept.
     * 
     * @param {Array<string>} basketItems 
     * @returns [string] Formatted reciept.
     * 
     * @memberof Basket
     */
    calculateBasket(basketItems) {
        this.resetBasket();

        // filter items we don't sell first.
        this.basketItems = basketItems
                .filter(item => this.storeItems.get(item.toLowerCase()))
                .map(item => this.storeItems.get(item.toLowerCase()));

        this.calculateSubTotal();
        this.calculateDiscounts();
        this.calculateTotal();
        return this.formatResponse();
    }
}

module.exports = Basket;
