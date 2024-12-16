import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/authentication/login/login/login.component';
import { AdminLoginComponent } from './features/authentication/login/admin-login/admin-login/admin-login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { ResidentsComponent } from './features/residents/residents.component';
import { HouseholdsComponent } from './features/households/households.component';
import { CertificatesComponent } from './features/certificates/certificates.component';
import { BlotterComponent } from './features/blotter/blotter.component';
import { OfficialsComponent } from './features/officials/officials.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { AnnouncementsComponent } from './features/announcements/announcements.component';
import { CertGenComponent } from './features/certificates/cert-gen/cert-gen.component';
import { CertPreviewComponent } from './features/certificates/cert-gen/cert-preview/cert-preview.component';
import { AddResidentComponent } from './features/residents/add-resident/add-resident.component';
import { AddHouseholdComponent } from './features/households/add-household/add-household.component';
import { AddBlotterComponent } from './features/blotter/add-blotter/add-blotter.component';
import { AddOfficialComponent } from './features/officials/add-official/add-official.component';
import { AddProjectComponent } from './features/projects/add-project/add-project.component';
import { AddAnnouncementComponent } from './features/announcements/add-announcement/add-announcement.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'residents', component: ResidentsComponent },
      { path: 'households', component: HouseholdsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'certificates/generate', component: CertGenComponent },
      { path: 'certificates/preview', component: CertPreviewComponent },
      { path: 'blotter', component: BlotterComponent },
      { path: 'blotter/add', component: AddBlotterComponent },
      { path: 'officials', component: OfficialsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'projects/add', component: AddProjectComponent },
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'announcements/add', component: AddAnnouncementComponent },
      { path: 'residents/add', component: AddResidentComponent },
      { path: 'households/add', component: AddHouseholdComponent },
      { path: 'officials/add', component: AddOfficialComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin-login', component: AdminLoginComponent }
];
