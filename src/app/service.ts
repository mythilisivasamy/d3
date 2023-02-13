import { Injectable } from '@angular/core';
import { POPULATION } from './data';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  getData(){
    return POPULATION;
  }
}
