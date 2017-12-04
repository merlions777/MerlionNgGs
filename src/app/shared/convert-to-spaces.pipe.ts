import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
   name: 'ConvertToSpace'
})
export class ConvertToSpacesPipe implements PipeTransform {
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}
