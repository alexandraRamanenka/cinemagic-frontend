import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  getReplacer(str) {
    let currentDigit = 0;
    return (match, x1, offset, wholeString) => {
      const res = str.slice(currentDigit, currentDigit + x1.length);
      currentDigit += x1.length;
      return res;
    };
  }

  transform(phone: string, format = '+ xxx (xx) xxx-xx-xx'): any {
    const replacer = this.getReplacer(phone);
    return format.replace(/(x+)/g, replacer);
  }
}
