interface Builder {
    buildPart1(): void;
    buildPart2(): void;
    getResult(): string;
}

class ConcreteBuilder implements Builder {
    private result: string = '';

    buildPart1(): void {
        this.result += 'Part 1 ';
    }

    buildPart2(): void {
        this.result += 'Part 2 ';
    }

    getResult(): string {
        return this.result;
    }
}

class Director {
    private builder: Builder;

    constructor(builder: Builder) {
        this.builder = builder;
    }

    construct(): string {
        this.builder.buildPart1();
        this.builder.buildPart2();
        return this.builder.getResult();
    }
}

const builder = new ConcreteBuilder();
const director = new Director(builder);
const result = director.construct();
console.log(result); // Output: Part 1 Part 2