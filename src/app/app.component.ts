import {Component} from '@angular/core';
import {filter, interval, map, take, tap} from "rxjs";

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
            <div>
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

// const stream$ = interval(1000)
//     .pipe(
//         tap(v => console.log('Tap: ', v)),
//         take(5),
//         map(v => v*3),
//         filter(v => v % 2 === 0)
//     )
//
// stream$.subscribe( response => console.log('Next: ', response))
