import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  fr :boolean = true

  private lang = new BehaviorSubject<boolean>(this.fr);
  mainLang = this.lang.asObservable();

  switchLang(){
    this.fr = !this.fr
    this.lang.next(this.fr)
  }

}
