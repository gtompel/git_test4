"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Proxy = /** @class */ (function () {
    function Proxy() {
        this.item = null;
    }
    Proxy.prototype.operation1 = function () {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation1();
    };
    Proxy.prototype.operation2 = function () {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation2();
    };
    return Proxy;
}());
//export default ProxyInterface;
var Item = /** @class */ (function () {
    function Item() {
    }
    Item.prototype.operation1 = function () {
        console.log("Performing operation 1 in the Actual Object");
    };
    Item.prototype.operation2 = function () {
        console.log("Performing operation 2 in the Actual Object");
    };
    return Item;
}());
exports.default = Item;
var proxy = new Proxy();
proxy.operation1();
proxy.operation2();
