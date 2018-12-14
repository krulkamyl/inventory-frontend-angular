import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ParamService} from '../../../service/param.service';
import {Parameter} from '../../../models/parameter';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './parameter-edit.component.html'
})
export class ParameterEditComponent implements OnInit {
  id: number;
  private sub: any;

  name = new FormControl('',[
    Validators.required,
    Validators.minLength(2)
  ]);

  constructor(private parameterService: ParamService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.parameterService.getSingleParam(this.id).subscribe((data : Parameter) => {
      this.name.setValue(data.name);
    });
  }

  updateCustomer() {
    if (this.name.valid) {
      this.parameterService.updateParam(this.id,this.name.value.toString()).subscribe(
          data => {
            alert('Param has updated!');
            this.router.navigate(['/parameters']);
          },
          error => {
            alert(error.message);
          }
      );
    } else {
      alert("Field is required!");
    }

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
