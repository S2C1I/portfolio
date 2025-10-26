import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit  {
  fr:boolean = false

  constructor(private ls: LanguageService, private router: Router){}

  ngOnInit(): void {
      this.ls.mainLang.subscribe(l => this.fr = l )
  }

  change(){
    this.ls.switchLang()    
  }

  navigateToProject(id: string) {

    this.router.navigate([`/project/${id}`]);
  }
}
