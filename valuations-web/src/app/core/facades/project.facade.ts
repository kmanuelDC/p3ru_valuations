// src/app/core/facades/project.facade.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Project } from '../models/project.model';
import { CreateProjectPayload, ProjectApiService } from '../services/api/project.api.service';


@Injectable({ providedIn: 'root' })
export class ProjectFacade {
  private readonly userId = 1; // TODO: inyectar desde Auth más adelante

  private readonly projectsSubject = new BehaviorSubject<Project[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  private readonly errorSubject = new BehaviorSubject<string | null>(null);

  projects$ = this.projectsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private readonly projectApi: ProjectApiService) { }

  loadProjects(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.projectApi
      .getActiveProjectsByUser(this.userId)
      .pipe(
        tap((projects) => {
          this.projectsSubject.next(projects);
          this.loadingSubject.next(false);
        }),
        catchError((err) => {
          console.error('[ProjectFacade] loadProjects error', err);
          this.errorSubject.next(
            'No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.',
          );
          this.loadingSubject.next(false);
          return of([]);
        }),
      )
      .subscribe();
  }

  createProject(payload: CreateProjectPayload): void {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    this.projectApi
      .createProjectForUser(this.userId, payload)
      .pipe(
        tap((project) => {
          const current = this.projectsSubject.getValue();
          this.projectsSubject.next([project, ...current]);
          this.loadingSubject.next(false);
        }),
        catchError((err) => {
          console.error('[ProjectFacade] createProject error', err);
          this.errorSubject.next('No se pudo crear el proyecto.');
          this.loadingSubject.next(false);
          return of(null);
        }),
      )
      .subscribe();
  }
}
