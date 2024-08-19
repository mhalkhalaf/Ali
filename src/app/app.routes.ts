import { Routes } from '@angular/router';
import { loginGuard } from './guard/login.guard';
import { OwnerComponent } from './components/owner/owner.component';
import { CoordibatorComponent } from './components/coordibator/coordibator.component';
import { logoutGuard } from './guard/logout.guard';
import { ProjectDetailsComponent } from './components/project-detials/project-details.component';
import { ContractorGuard } from './guard/contractors.guard copy';
import { RoleGuard } from './guard/role.guard';
import { EngineerComponent } from './components/engineer/engineer.component';
import { CampComponent } from './components/camp/camp.component';
import { LoginComponent } from './components/login/login.component';
import { CampDetailsComponent } from './components/camp-details/camp-details.component';
import { EngineerDetailComponent } from './components/engineer-detail/engineer-detail.component';

export const routes: Routes = [
    {path: "signup",
        canActivate:[loginGuard,RoleGuard],
        loadComponent : () => 
            import('./components/account-details/account-details.component')
                    .then(c => c.AccountDetailsComponent)},

    {path: "coordibators",component: CoordibatorComponent,
        canActivate:[loginGuard]},

    {path: "contractors",
        canActivate:[loginGuard,ContractorGuard],
        loadComponent : () => 
            import('./components/contractor/contractor.component')
                    .then(c => c.ContractorComponent)},

    {path: "projects",component: ProjectDetailsComponent,
        canActivate:[loginGuard]},
        
    {path: "owners",component: OwnerComponent,
        canActivate:[loginGuard]},

    {path: "login",component: LoginComponent,
        canActivate:[logoutGuard]},

    {path: "camps",component: CampComponent, 
        canActivate:[loginGuard]},
    {path: "projects/camps/:id",component: CampDetailsComponent, 
        canActivate:[loginGuard]},
    {path: "engineers",component: EngineerComponent, 
        canActivate:[loginGuard]},
    {path: "projects/engineers/:projectId",component: EngineerDetailComponent, 
        canActivate:[loginGuard]},
    // {path: "projects/engineers/:engineerId/:projectId",component: EngineerDetailComponent, 
    //     canActivate:[loginGuard]},
    
    
    {path: "",component: LoginComponent,
        canActivate:[logoutGuard]},

    {path: "**",component: LoginComponent,redirectTo:"",pathMatch:"full"},

    {path: "**",component: LoginComponent,redirectTo:"",pathMatch:"full"},
];
