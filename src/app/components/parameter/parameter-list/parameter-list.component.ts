import { Component, OnInit } from '@angular/core';
import {ParamService} from '../../../service/param.service';
import {Parameter} from '../../../models/parameter';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html'
})

export class ParameterListComponent implements OnInit {
  parameters: any;

  constructor(private parameterService: ParamService) { }
  ngOnInit() {
    this.parameterService.getParams().subscribe((data: Array<Parameter>) => {
      this.parameters = data;
    });
  }

  deleteParameter(id) {
    const decision = confirm('Are you sure you want to delete parameter?');
    if (decision === true) {
      this.parameterService.removeParam(id).subscribe(
          data => {
            this.parameters = data.body;
          },
          error => {
            alert(error.message);
          }
      );
    }
  }
}
