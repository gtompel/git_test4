var ConcreteBuilder = /** @class */ (function () {
    function ConcreteBuilder() {
        this.result = '';
    }
    ConcreteBuilder.prototype.buildPart1 = function () {
        this.result += 'Part 1 ';
    };
    ConcreteBuilder.prototype.buildPart2 = function () {
        this.result += 'Part 2 ';
    };
    ConcreteBuilder.prototype.getResult = function () {
        return this.result;
    };
    return ConcreteBuilder;
}());
var Director = /** @class */ (function () {
    function Director(builder) {
        this.builder = builder;
    }
    Director.prototype.construct = function () {
        this.builder.buildPart1();
        this.builder.buildPart2();
        return this.builder.getResult();
    };
    return Director;
}());
var builder = new ConcreteBuilder();
var director = new Director(builder);
var result = director.construct();
console.log(result); // Output: Part 1 Part 2
