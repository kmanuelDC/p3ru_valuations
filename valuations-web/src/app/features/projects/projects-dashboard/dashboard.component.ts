// src/app/features/projects/projects-dashboard/projects-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Project } from '../../../core/models/project.model';
import { ProjectFacade } from '../../../core/facades/project.facade';
import { CreateProjectPayload } from '../../../core/services/api/project.api.service';


@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss'],
})
export class ProjectsDashboardComponent implements OnInit {
  projects$!: Observable<Project[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  showCreateForm = false;
  createForm!: FormGroup;

  constructor(
    private readonly projectFacade: ProjectFacade,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.projects$ = this.projectFacade.projects$;
    this.loading$ = this.projectFacade.loading$;
    this.error$ = this.projectFacade.error$;

    this.initForm();
    this.projectFacade.loadProjects();
  }

  private initForm(): void {
    this.createForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      clientName: [''],
      location: [''],
      currency: ['PEN'],
      contractAmount: [null],
    });
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;

    if (this.showCreateForm) {
      this.createForm.reset({ currency: 'PEN' });
    }
  }

  submitCreateForm(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const payload: CreateProjectPayload = this.createForm.value;
    this.projectFacade.createProject(payload);
    this.showCreateForm = false;
  }

  onProjectClick(project: Project): void {
    console.log('Proyecto seleccionado:', project);
    // luego: this.router.navigate(['/projects', project.id]);
  }
}
