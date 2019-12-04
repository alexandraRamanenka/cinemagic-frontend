import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term: string, valueKey?: string): any {
    if (!items || !term) {
      return items;
    }

    return items.filter(item => {
      const compareValue = item[term || 'value'] ? item[term || 'value'] : item;
      return compareValue.toLowerCase().includes(term.toLowerCase());
    });
  }
}
