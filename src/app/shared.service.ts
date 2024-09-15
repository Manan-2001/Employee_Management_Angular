import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private arraySource = new BehaviorSubject<any[]>([]);
  currentArray = this.arraySource.asObservable();

  constructor() {}

  changeArray(newArray: any[]) {
    this.arraySource.next(newArray);
  }
}
