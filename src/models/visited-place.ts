import { Item } from "./item";
import { VisitedPlaceI } from 'src/interfaces/visited-place-interface'

export class VisitedPlace implements VisitedPlaceI {
    public static lastId: number = 0;
    public placeId: number;
    public landName: string;
    public islandName: string;
    public dateOfArrival: string;
    public dateOfDeparture: string;
    public amountOfTribes: number;
    public items: Item[];
    public isFriendly: boolean;

    constructor(landName: string, islandName: string, dateOfArrival: string, dateOfDeparture: string, amountOfTribes: number, items: Item[], isFriendly: boolean) {
        this.landName = landName;
        this.islandName = islandName;
        this.dateOfArrival = dateOfArrival;
        this.dateOfDeparture = dateOfDeparture;
        this.amountOfTribes = amountOfTribes;
        this.items = items;
        this.isFriendly = isFriendly;
        this.placeId = VisitedPlace.lastId;
        VisitedPlace.lastId++;
    }
}
