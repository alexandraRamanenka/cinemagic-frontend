import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieGeneres'
})
export class MovieGenresPipe implements PipeTransform {
  transform(genres: string[], ...args: any[]): any {
    return genres.join(', ');
  }
}
