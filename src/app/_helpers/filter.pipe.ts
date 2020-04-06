import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;

      searchText = searchText.toLowerCase();
          return items.filter( it => {
              console.log(it.value.name);
              return it.value.name.toLowerCase().includes(searchText);
          });
      } 
}
