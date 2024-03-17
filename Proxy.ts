class Proxy implements ProxyInterface {
    private item: ProxyInterface | null = null;

    public operation1(): void {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation1();
    }

    public operation2(): void {
        if (this.item == null) {
            this.item = new Item();
        }
        this.item.operation2();
    }
}
//export default Proxy;
interface ProxyInterface {
    operation1(): void;
    operation2(): void;
}
//export default ProxyInterface;
class Item implements ProxyInterface {
    operation1(): void {
        console.log("Performing operation 1 in the Actual Object");
    }

    operation2(): void {
        console.log("Performing operation 2 in the Actual Object");
    }
}
export default Item;
const proxy = new Proxy();
proxy.operation1();
proxy.operation2();