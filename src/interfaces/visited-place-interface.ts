import { Item } from 'src/models/item';

export interface VisitedPlaceI {
    placeId: number;
    landName: string;
    islandName: string;
    dateOfArrival: string;
    dateOfDeparture: string;
    amountOfTribes: number;
    items: Item[];
    isFriendly: boolean;
}