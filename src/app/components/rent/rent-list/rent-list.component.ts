import {Component, OnInit} from '@angular/core';
import {RentService} from '../../../service/rent.service';
import {Rent} from '../../../models/rent';

@Component({
    selector: 'app-rent-list',
    templateUrl: './rent-list.component.html'
})
export class RentListComponent implements OnInit {
    rents: any = [];

    constructor(private rentService: RentService) {
    }

    ngOnInit() {
        this.rentService.getRents().subscribe((data: Array<Rent>) => {
            this.rents = data;
        });
    }

    deleteRent(id) {
        const decision = confirm('Are you sure you want to delete rent?');
        if (decision === true) {
            this.rentService.removeRent(id).subscribe(
                data => {
                    alert('Rent has deleted!');
                    this.rents = data.body;
                },
                error => {
                    alert(error.message);
                }
            );
        }
    }

    denuncationAction(id) {
        const decision = confirm('Are you sure you want to change denuncation value?');
        if (decision === true) {
            this.rentService.changeDenuncation(id).subscribe(
                data => {
                    this.rents = data.body;
                },
                error => {
                    alert(error.message);
                }
            );
        }
    }
}
