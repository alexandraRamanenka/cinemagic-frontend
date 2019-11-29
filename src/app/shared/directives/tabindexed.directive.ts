import { Directive } from '@angular/core';

@Directive({
  selector: '[appTabindexed]',
  host: {
    tabindex: '0',
    '(:focus)': '$event.preventDefault(); $event.target.click();'
  }
})
export class TabindexedDirective {
  constructor() {}
}
