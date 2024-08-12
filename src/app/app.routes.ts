import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { UserComponent } from './pages/user/user.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "user",
        component: UserComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: "newproject",
                component: NewProjectComponent,
            },
            {
                path: "myprojects",
                component: MyProjectsComponent,
            },
            {
                path: "editproject/:id",
                component: EditProjectComponent,
            },
        ]
    },
    
];