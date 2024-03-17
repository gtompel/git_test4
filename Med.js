"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusConnector = void 0;
var BusConnector = /** @class */ (function () {
    function BusConnector() {
    }
    BusConnector.prototype.connect = function (bus) {
        this.bus = bus;
    };
    BusConnector.prototype.signal = function (message) {
        if (!this.bus) {
            throw new Error("bus disconnected");
        }
        this.bus.notify(message);
    };
    return BusConnector;
}());
exports.BusConnector = BusConnector;
var DataBus = /** @class */ (function () {
    function DataBus(cpu, memory) {
        this.cpu = cpu;
        this.memory = memory;
        // setup the connections
        this.cpu.connect(this);
        this.memory.connect(this);
    }
    DataBus.prototype.notify = function (message) {
        switch (message.type) {
            case "memory-read": {
                var address = message.address, response = message.response;
                var value = this.memory.read(address);
                response(value);
                break;
            }
            case "memory-write": {
                var address = message.address, value = message.value, response = message.response;
                try {
                    this.memory.write(value, address);
                    response(true); // writing operation success
                }
                catch (e) {
                    response(false); // there was an error
                }
                break;
            }
            default: {
                throw new Error("Invalid message");
            }
        }
    };
    return DataBus;
}());
var Memory = /** @class */ (function (_super) {
    __extends(Memory, _super);
    function Memory() {
        var _this = _super.call(this) || this;
        _this.memory = [];
        return _this;
    }
    Memory.prototype.read = function (address) {
        console.log("Memory: reading the address (".concat(address, ")"));
        return this.memory[address];
    };
    Memory.prototype.write = function (value, address) {
        console.log("Memory: writing the value (".concat(value, ") on address (").concat(address, ")"));
        this.memory[address] = value;
    };
    return Memory;
}(BusConnector));
var CPU = /** @class */ (function (_super) {
    __extends(CPU, _super);
    function CPU() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextInstructionAddress = 0;
        _this.result = 0;
        return _this;
    }
    CPU.prototype.fetch = function () {
        console.log("CPU: Triying to fetch an instruction from address ".concat(this.nextInstructionAddress));
        var instruction;
        this.signal({
            type: "memory-read",
            address: this.nextInstructionAddress,
            response: function (value) { return (instruction = value); },
        });
        console.log("CPU: instruction fetched from address ".concat(this.nextInstructionAddress));
        // - Increment the nextInstructionAddress
        this.nextInstructionAddress++;
    };
    CPU.prototype.decode = function (instruction) {
        // Not implemented for sake of simplicity
    };
    CPU.prototype.execute = function (opCode, operand1, operand2) {
        // run the code associated with the decoded instruction
        switch (opCode) {
            case 0:
                this.result = operand1 + operand2;
                break;
            case 1:
                this.result = operand1 / operand2;
                break;
            case 2:
                console.log("CPU: Triying write a value on address ".concat(operand2));
                this.signal({
                    type: "memory-write",
                    value: operand1,
                    address: operand2,
                    response: function (ok) { return console.log("CPU: write operation success: ".concat(ok)); },
                });
                break;
            // ... rest of operations
            default: {
                throw new Error("Invalid operation");
            }
        }
    };
    return CPU;
}(BusConnector));
var cpu = new CPU();
var memory = new Memory();
var bus = new DataBus(cpu, memory);
cpu.fetch();
cpu.fetch();
cpu.execute(2, 4, 10);
