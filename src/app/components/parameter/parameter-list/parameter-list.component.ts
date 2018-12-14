import { Component, OnInit } from '@angular/core';
import {ParamService} from '../../../service/param.service';
import {Parameter} from '../../../models/parameter';

@Component({
  selector: 'app-parameter-list',
  templateUrl: './parameter-list.component.html'
})

export class ParameterListComponent implements OnInit {
  parameters = [];
  constructor(private parameterService: ParamService) { }
  ngOnInit() {
    this.parameters = [];
    this.parameterService.getParams().subscribe((data: any[]) => {
      for (let i = 0 ; i <= data.length - 1; i++) {
        const parameter: Parameter = data[i];
        this.parameters.push(parameter);
      }
    });
  }

  deleteParameter(id) {
    const decision = confirm('Are you sure you want to delete parameter?');
    if (decision === true) {
      this.parameterService.removeParam(id).subscribe(
          data => {
            alert('Param has deleted!');
            this.ngOnInit();
          },
          error => {
            alert(error.message);
          }
      );
    }
  }
}
