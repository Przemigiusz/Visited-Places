import { HostListener, AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VisitedPlacesDataSource } from './visited-places-datasource';
import { VisitedPlaceI } from '../../interfaces/visited-place-interface'
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { VisitedPlace } from 'src/models/visited-place';
import { Item } from "../../models/item";
import { createLaterThanTheDateOfArrivalValidator } from "../../custom-validators/later-than-the-date-of-arrival"

@Component({
  selector: 'app-visited-places',
  templateUrl: './visited-places.component.html',
  styleUrls: ['./visited-places.component.css']
})
export class VisitedPlacesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<VisitedPlaceI>;
  dataSource = new VisitedPlacesDataSource();

  areDetailsShown: boolean = false;
  isSecondClickDone: boolean = false;
  visitedPlaceDetails!: VisitedPlaceI;
  tribeVariant: string = "";
  newVisitedPlaceItems: Item[] = [];

  isEditFormShown: boolean = false;
  isAddFormShown: boolean = false;

  foundItem!: Item;

  addVisitedPlaceForm: FormGroup = new FormGroup({});


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Nazwa Wyspy', 'Nazwa Krainy', "Przyjazność"];

  constructor(private formBuilder: FormBuilder) { }


  @HostListener('document:click', ['$event'])
  onClickDetails(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!this.isSecondClickDone && this.areDetailsShown) {
      console.log("test1");
      this.isSecondClickDone = true;
      return;
    }

    if (!targetElement.closest('.detailed-card-alias') && this.isSecondClickDone && this.areDetailsShown && !this.isEditFormShown) {
      console.log("test2");
      this.areDetailsShown = false;
      this.isSecondClickDone = false;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addVisitedPlaceForm = this.formBuilder.group({
      landName: ['', Validators.required],
      islandName: ['', [Validators.required]],
      dateOfArrival: ['', Validators.required],
      dateOfDeparture: ['', Validators.required],
      amountOfTribes: ['', Validators.required],
      isFriendly: ['', Validators.required],
      foundItemName: [''],
      foundItemAmount: ['']
    });
    this.addVisitedPlaceForm.get('dateOfDeparture')?.addValidators(createLaterThanTheDateOfArrivalValidator(this.addVisitedPlaceForm));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log(this.table.dataSource);
  }

  private getTribeVariant(amountOfTribes: number): void {
    if (amountOfTribes === 0) {
      this.tribeVariant = "plemion";
    } else if (amountOfTribes === 1) {
      this.tribeVariant = "plemię";
    } else {
      const lastTwoDigits = amountOfTribes % 100;
      if (!(lastTwoDigits >= 12 && lastTwoDigits <= 21) && lastTwoDigits != 2 && lastTwoDigits != 3 && lastTwoDigits != 4) {
        this.tribeVariant = "plemion";
      } else {
        this.tribeVariant = "plemiona";
      }
    }
  }

  showDetails(visitedPlace: VisitedPlaceI): void {
    (this.areDetailsShown) ?
      (this.areDetailsShown = false)
      : (this.areDetailsShown = true, this.visitedPlaceDetails = visitedPlace, this.getTribeVariant(visitedPlace.amountOfTribes));
  }

  public showEditForm() {
    (this.isEditFormShown) ? (this.isEditFormShown = false) : (this.isEditFormShown = true);
  }

  public showNewNoteForm() {
    (this.isAddFormShown) ? (this.isAddFormShown = false) : (this.isAddFormShown = true);
  }

  submitForm() {
    if (this.addVisitedPlaceForm.valid) {
      const formData = this.addVisitedPlaceForm.value;

      const landName = formData.landName;
      const islandName = formData.islandName;
      const dateOfArrival = formData.dateOfArrival;
      const dateOfDeparture = formData.dateOfDeparture;
      const amountOfTribes = formData.amountOfTribes;
      const isFriendly = formData.isFriendly;

      const newVistedPlace: VisitedPlace = new VisitedPlace(landName, islandName, dateOfArrival, dateOfDeparture, amountOfTribes, this.newVisitedPlaceItems, isFriendly);

      this.dataSource.data.push(newVistedPlace);
      this.table.dataSource = this.dataSource;
      this.paginator._changePageSize(this.paginator.pageSize);
    }
    else {
      console.log("Form is not valid!!!");
      this.getFormValidationErrors();
    }
  }

  addItem() {
    const formData = this.addVisitedPlaceForm.value;
    const foundItemName = formData.foundItemName;
    const foundItemAmount = formData.foundItemAmount;

    this.foundItem = new Item(foundItemName, foundItemAmount);
    this.newVisitedPlaceItems.push(this.foundItem);
  }

  getFormValidationErrors() {
    Object.keys(this.addVisitedPlaceForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.addVisitedPlaceForm.get(key)!.errors!;
      Object.keys(controlErrors || {}).forEach(keyError => {
        console.log(`Key control: ${key}, keyError: ${keyError}, errValue: ${controlErrors[keyError]}`);
      });
    });
  }

}

