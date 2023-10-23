import { Item } from './item'

const itemsForI1: Item[] = [];
const itemsForI2: Item[] = [];
const itemsForI3: Item[] = [];

const firstItemI1 = new Item("Skrzynka z narzędziami", 1);
const secondItemI1 = new Item("Leczące rośliny", 5);
const thridItemI1 = new Item("Scyzoryk", 2);
itemsForI1.push(firstItemI1);
itemsForI1.push(secondItemI1);
itemsForI1.push(thridItemI1);

const firstItemI2 = new Item("Latarka", 1);
const secondItemI2 = new Item("Kompas", 2);
const thridItemI2 = new Item("Stara mapa", 1);

itemsForI2.push(firstItemI2);
itemsForI2.push(secondItemI2);
itemsForI2.push(thridItemI2);

const firstItemI3 = new Item("Zniszczona", 1);
const secondItemI3 = new Item("Łopata", 2);
const thridItemI3 = new Item("Topór", 1);

itemsForI3.push(firstItemI3);
itemsForI3.push(secondItemI3);
itemsForI3.push(thridItemI3);

export const itemsI1 = itemsForI1;
export const itemsI2 = itemsForI2;
export const itemsI3 = itemsForI3;

