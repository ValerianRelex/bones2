import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template:
        `
            <nav>
                <img [src]="imgUrl">
            </nav>
            <div>
                <router-outlet></router-outlet>
            </div>
        `
})
export class AppComponent {
    imgUrl: string = 'https://selosovetov.ru/wp-content/uploads/2016/11/kosti_low.jpg';

    [testMe]={{testMe}}

}
