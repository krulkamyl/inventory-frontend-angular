import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from '../../../service/param.service';
import { Parameter } from '../../../models/parameter';


@Component({
  selector: 'app-customer-edit',
  templateUrl: './parameter-edit.component.html'
})
export class ParameterEditComponent implements OnInit {
  id: number;
  private sub: any;

  parameterForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        Validators.maxLength(25),
        Validators.minLength(3),
      ])
    })
  });

  constructor(private parameterService: ParamService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.parameterService.getSingleParam(this.id).subscribe((data: Parameter) => {
      this.parameterForm.get('name').setValue(data.name);
    });
  }

  onSubmit(value) {
    this.parameterService.updateParam(this.id, value.name).subscribe(
      data => {
        alert('Param has updated!');
        this.router.navigate(['/parameters']);
      },
      error => {
        alert(error.message);
      }
    );
  }
}
