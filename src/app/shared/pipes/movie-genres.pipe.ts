import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieGenres'
})
export class MovieGenresPipe implements PipeTransform {
  transform(genres: string[], ...args: any[]): any {
    return genres.join(', ');
  }
}
