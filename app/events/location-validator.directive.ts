import { Directive } from '@angular/core'
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}] //multi:true -> allow us to dont override the service, we are adding a new validator instead.
})
export class LocationValidator implements Validator{

    validate(formGroup: FormGroup) : {[key:string]: any}{

        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)){
            return null
        }else{
            return {validateLocation: false}
        }
    }
}