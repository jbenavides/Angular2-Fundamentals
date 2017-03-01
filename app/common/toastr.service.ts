import { OpaqueToken } from '@angular/core'//OpaqueToken ->its job is simply to create a token used for the DI registry in order to find the instance of the object we want.

export let TOASTR_TOKEN = new OpaqueToken('toastr');

export interface Toastr { //for intellisense
    success(message: string, title?:string):void;
    info(message: string, title?:string):void;
    warning(message: string, title?:string):void;
    error(message: string, title?:string):void;
}