import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Project {
  id: string;
  slug: string;
  featured: boolean;
  category: { fr: string; en: string };
  title: { fr: string; en: string };
  overview: { fr: string; en: string };
  features: Array<{
    title: { fr: string; en: string };
    description: { fr: string; en: string };
  }>;
  challenges: Array<{
    title: { fr: string; en: string };
    solution: { fr: string; en: string };
  }>;
  technologies: string[];
  images: string[];
  links: { demo: string; github: string };
  footer: {
    title: { fr: string; en: string };
    text: { fr: string; en: string };
    buttonText: { fr: string; en: string };
  };
}

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  fr: boolean = false;
  featuredProject: Project | null = null;
  otherProjects: Project[] = [];

  constructor(
    private ls: LanguageService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ls.mainLang.subscribe(l => this.fr = l);
    this.loadProjects();
  }

  loadProjects(): void {
    this.http.get<{ projects: Project[] }>('assets/projects-data.json').subscribe(data => {
      // Find the featured project (id = "1")
      this.featuredProject = data.projects.find(p => p.id === '1') || null;

      // Get other projects (id = "2" and "3")
      this.otherProjects = data.projects.filter(p => p.id !== '1');
    });
  }

  change() {
    this.ls.switchLang();
  }

  navigateToProject(id: string) {
    this.router.navigate([`/project/${id}`]);
  }
}
