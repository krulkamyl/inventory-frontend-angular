import {Component, OnInit} from '@angular/core';
import {RentService} from '../../../service/rent.service';
import {Rent} from '../../../models/rent';

@Component({
    selector: 'app-rent-list',
    templateUrl: './rent-list.component.html'
})
export class RentListComponent implements OnInit {
    rents = [];

    constructor(private rentService: RentService) {
    }

    ngOnInit() {

        this.rents = [];
        this.rentService.getRents().subscribe((data: any[]) => {
            for (let i = 0; i <= data.length - 1; i++) {
                const rent: Rent = data[i];
                this.rents.push(rent);
            }
        });
    }

    deleteRent(id) {
        const decision = confirm('Are you sure you want to delete rent?');
        if (decision === true) {
            this.rentService.removeRent(id).subscribe(
                data => {
                    alert('Rent has deleted!');
                    this.ngOnInit();
                },
                error => {
                    alert(error.message);
                }
            );
        }
    }

    denuncationAction(id) {
        this.rentService.changeDenuncation(id).subscribe(
            data => {
                alert('Value changed');
                this.ngOnInit();
            },
            error => {
                alert(error.message);
            }
        );
    }
}
