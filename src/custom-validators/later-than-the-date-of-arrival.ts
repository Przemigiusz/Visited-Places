import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

function formatDateToMMDDYYYY(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
}


export function createLaterThanTheDateOfArrivalValidator(addVisitedPlaceForm: AbstractControl): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {

        const tempForm = addVisitedPlaceForm as FormGroup;
        const control1 = tempForm.get('dateOfArrival');
        const control2 = tempForm.get('dateOfDeparture');

        const control1Value = control1?.value;
        const control2Value = control2?.value;

        const date1 = new Date(control1Value);
        const date2 = new Date(control2Value);

        const formattedDate1 = formatDateToMMDDYYYY(date1);
        const formattedDate2 = formatDateToMMDDYYYY(date2);

        console.log(formattedDate1, formattedDate2);

        if (formattedDate1.length && formattedDate2.length) {
            const [month1, day1, year1] = formattedDate1.split('/').map(Number);
            const [month2, day2, year2] = formattedDate2.split('/').map(Number);

            if (year1 > year2) {
                return { laterThan: true };
            } else if (year1 < year2) {
                return null;
            } else {
                if (month1 > month2) {
                    return { laterThan: true };
                } else if (month1 < month2) {
                    return null;
                } else {
                    if (day1 > day2) {
                        return { laterThan: true };
                    } else if (day1 < day2) {
                        return null;
                    } else {
                        return null;
                    }
                }
            }

        } else {
            return null;
        }
    }
}

