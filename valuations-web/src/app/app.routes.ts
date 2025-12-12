import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
    loadComponent: () => import('./features/projects/projects-dashboard/dashboard.component').then(m => m.ProjectsDashboardComponent),
		//loadComponent: () => import('./features/projects/projects-dashboard/projects-dashboard.component').then(m => m.ProjectsDashboardComponent),
	},
];
