import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'

@Directive({
    selector: '[modal-trigger]' //[] because is an attribute
})
export class ModalTriggerDirective implements OnInit {

    private el: HTMLElement;
    @Input('modal-trigger') modalId: string; 

    constructor(@Inject(JQ_TOKEN) private $: any,
                ref: ElementRef
                ){
                    this.el = ref.nativeElement;
                }

    ngOnInit(): void {
        this.el.addEventListener('click', e => {
            this.$(`#${this.modalId}`).modal({})
        })        
    }


}