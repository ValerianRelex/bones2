import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    styles: [`
      .myColor {
        color: red;
      }

      .p {
        color: red;
      }
    `],
    template:
        `
            <nav>
                <img [src]="imgUrl">
                <p [style.color]='myColor' (click)="changeColor('blue')">CRAPS - Игра в кости!</p>
            </nav>
            <app-header></app-header>
            <div class="container" >
                <flash-messages></flash-messages>
                <router-outlet></router-outlet>
            </div>
        `
})

export class AppComponent {
    myColor: string = 'red';
    toggle: boolean = false;
    imgUrl: string = 'https://selosovetov.ru/wp-content/uploads/2016/11/kosti_low.jpg';

    changeColor(color: string) {
        if (!this.toggle) {
            this.myColor=color;
            this.toggle = !this.toggle;
        } else {
            this.myColor='red';
            this.toggle = !this.toggle;
        }
    }
}
