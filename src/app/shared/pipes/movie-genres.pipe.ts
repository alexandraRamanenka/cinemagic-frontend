import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieGeneres'
})
export class MovieGenresPipe implements PipeTransform {
  transform(generes: string[], ...args: any[]): any {
    return generes.join(', ');
  }
}
