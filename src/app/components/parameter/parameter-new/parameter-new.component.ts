import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ParamService} from '../../../service/param.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-parameter-new',
  templateUrl: './parameter-new.component.html'
})
export class ParameterNewComponent implements OnInit {
  name = new FormControl('', [
      Validators.required,
      Validators.minLength(2)
  ]);

  constructor(
      private parameterService: ParamService,
      private router: Router) { }

  ngOnInit() {
  }

    addParameter() {
      if (this.name.valid) {
        this.parameterService.addParam(this.name.value.toString()).subscribe(
            data => {
              alert('Parameter has saved!');
              this.router.navigate(['/parameters']);
            },
            error => {
              alert(error.message);
            }
        );
      } else {
        alert('Field is required!');
      }

  }

}
