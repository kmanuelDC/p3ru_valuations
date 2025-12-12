// src/app/core/services/api/project-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { Project, Currency } from '../../models/project.model';

export interface CreateProjectPayload {
  code: string;
  name: string;
  description?: string;
  clientName?: string;
  location?: string;
  currency?: Currency;
  contractAmount?: number;
}

@Injectable({ providedIn: 'root' })
export class ProjectApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getActiveProjectsByUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${this.baseUrl}/projects/${userId}`,
    );
  }

  createProjectForUser(
    userId: number,
    payload: CreateProjectPayload,
  ): Observable<Project> {
    return this.http.post<Project>(
      `${this.baseUrl}/projects/user/${userId}`,
      payload,
    );
  }
}
