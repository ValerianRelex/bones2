import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-hellopage',
    templateUrl: './hellopage.component.html',
    styleUrls: ['./hellopage.component.scss']
})
export class HellopageComponent implements OnInit {
    playerName!: string;

    constructor(public router: Router) {
    }

    ngOnInit(): void {
    }
    startForm: FormGroup = new FormGroup({
        playerNameControl: new FormControl('', [
            Validators.required,
            // Validators.minLength(3), // уже встроен в регулярку
            Validators.pattern('^[a-zA-Z]{3,16}$'),
        ])
    })

    submitStartForm() {
        this.playerName = this.startForm.controls['playerNameControl'].value;
        this.router.navigate(['game'], {
            queryParams: {
                'playerName' : this.playerName,
            }
        });
        console.log(this.startForm);
    }

    getPlayerName(): string {
        return this.startForm.controls['playerNameControl'].value;
    }
}
