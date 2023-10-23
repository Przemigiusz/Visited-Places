import { VisitedPlace } from "./visited-place"

import { itemsI1 } from "./items"
import { itemsI2 } from "./items"
import { itemsI3 } from "./items"

const visitedPlaces: VisitedPlace[] = [];

const visitedPlace1 = new VisitedPlace("Złota Dolina", "Wyspa Skarbów", "2023-05-15", "2023-06-02", 5, itemsI1, true);
const visitedPlace2 = new VisitedPlace("Kwiatowy Las", "Wyspa Kwiatów", "2023-07-10", "2023-07-25", 3, itemsI2, false);
const visitedPlace3 = new VisitedPlace("Kamieniste Wybrzeże", "Wyspa Kamieni", "2023-09-01", "2023-09-15", 7, itemsI3, false);

visitedPlaces.push(visitedPlace1, visitedPlace2, visitedPlace3);

export const VisitedPlaces = visitedPlaces;
