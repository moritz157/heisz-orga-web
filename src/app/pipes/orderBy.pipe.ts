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
      //console.log(input, parameter, dir);
      return input.sort(function(a, b){
        var aDate = new Date(a[parameter]);
        var bDate = new Date(b[parameter]);
        if(aDate instanceof Date && bDate instanceof Date && !(aDate.toString()=="Invalid Date") && !(bDate.toString()=="Invalid Date")){
          console.log(aDate);
          if(dir=="ASC"){
            return (aDate.getTime() - bDate.getTime());
          }else{
            return (bDate.getTime() - aDate.getTime());
          }
        }else {
          if(dir=="ASC"){
            if ((a[parameter] > b[parameter])) {
              return 1;
            }else{
              return -1;
            }
          }else{
            if ((a[parameter] < b[parameter])) {
              return 1;
            }else{
              return -1;
            }
          }
        }
        
      })
    }else{
      return input;
    }
  }
}