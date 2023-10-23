export class Item {
    private static lastId: number = 0;
    public itemId: number;
    public itemName: string;
    public amount: number;

    constructor(itemName: string, amount: number) {
        this.itemName = itemName;
        this.amount = amount;
        this.itemId = Item.lastId;
        Item.lastId++;
    }
}