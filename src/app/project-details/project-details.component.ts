import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../language.service';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-project-details',
  standalone: false,
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  fr: boolean = false;
  project: Project | null = null;
  projectId: string = '';
  currentSlideIndex: number = 0;

  constructor(
    private ls: LanguageService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.ls.mainLang.subscribe(l => this.fr = l);

    // Get project ID from route
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.loadProjectData();
    });
  }

  loadProjectData(): void {
    this.http.get<{ projects: Project[] }>('/assets/projects-data.json').subscribe(data => {
      this.project = data.projects.find(p => p.id === this.projectId) || null;
    });
  }

  change() {
    this.ls.switchLang();
  }

  changeSlide(direction: number): void {
    if (!this.project) return;

    this.currentSlideIndex += direction;

    if (this.currentSlideIndex < 0) {
      this.currentSlideIndex = this.project.images.length - 1;
    } else if (this.currentSlideIndex >= this.project.images.length) {
      this.currentSlideIndex = 0;
    }
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
  }
}
