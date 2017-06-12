"use strict";

/**
 * Basic model object to represent a product sold at a store.
 * Products have two properties. Name and Price.
 * 
 * @class Product
 */
class Product {
    constructor(name, price, discount) {
        this.name = name;
        this.price = price;
        this.discount = discount || 0;
    }

    /**
     * Gets product price.
     * 
     * @returns [Number] Price of the product
     * 
     * @memberof Product
     */
    getPrice() {
        return this.price;
    } 

    /**
     * Gets the product name.
     * 
     * @returns [string] Name of the product
     * 
     * @memberof Product
     */
    getName() {
        return this.name;
    }

    /**
     * Float representing the percentage of discount available on this product.
     * 
     * @returns [Number]
     * 
     * @memberof Product
     */
    getDiscount() {
        return this.discount;
    }
}

module.exports = Product;
