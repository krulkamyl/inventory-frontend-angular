import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ParamService } from '../../../service/param.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameter-new',
  templateUrl: './parameter-new.component.html'
})
export class ParameterNewComponent implements OnInit {
  parameterForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
      ])
    })
  });


  constructor(
    private parameterService: ParamService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  onSubmit(value) {
    this.parameterService.addParam(value.name).subscribe(
      data => {
        alert('Parameter has saved!');
        this.router.navigate(['/parameters']);
      },
      error => {
        alert(error.message);
      }
    );
  }

}
