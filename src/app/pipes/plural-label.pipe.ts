import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'label'
})
export class PluralLabelPipe implements PipeTransform {

  transform(value: any, label: string): any {
    if(value > 1){
      return value + ' ' + label + 's';
    }
    return value + ' ' + label;
  }

}
