import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit{

  constructor(private ls:LanguageService){}

  fr:boolean = true

  mail:string = 'amitouhami@gmail.com'

  ngOnInit(): void {
      this.ls.mainLang.subscribe(l => this.fr = l)
  }


  change(){
    this.ls.switchLang()
  }
}
