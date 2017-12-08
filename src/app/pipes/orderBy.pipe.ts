import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(input: Object[], parameter: string, dir: string): Object[] {
    if(input){
      return input.sort(function(a, b){
        var aDate = new Date(a[parameter]);
        var bDate = new Date(b[parameter]);
        if(dir=="ASC"){
          return (aDate.getTime() - bDate.getTime());
        }else{
          return (bDate.getTime() - aDate.getTime());
        }
        
      })
    }else{
      return input;
    }
  }
}