import { Pipe, PipeTransform } from '@angular/core';
import translations from './../translations';
import { environment } from '@env/environment';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(key: string, languageKey = environment.defaultLanguage): string {
    return translations[languageKey][key];
  }

}
