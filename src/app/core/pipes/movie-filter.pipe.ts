import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(value: any, searchTerm: string) {
    if (!value || !searchTerm) {
      return value;
    }

    searchTerm = searchTerm.toLowerCase();

    return value.filter((item) => {
      const jsonItem = JSON.stringify(item).toLowerCase();
      return jsonItem.includes(searchTerm);
    });
  }
}
