import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], value: string, prop: any): any {
    if (!items) {
      return [];
    }

    if (!value) {
      return items;
    }

    return items.filter(item => {
      return item[prop].toLowerCase().includes(value.toLowerCase());
    });
  }
}
