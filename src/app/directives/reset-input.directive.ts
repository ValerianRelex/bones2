import {Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
    selector: '[resetInput]',
    host: {
        '(click)': 'onMouseClick()',
    }
})
export class ResetInput {

    constructor(private el: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.el.nativeElement, "cursor", "pointer");
    }

    onMouseClick() {
        // очистка поля при клике по нему.
        this.renderer.setProperty(this.el.nativeElement,'value','')
    }
}