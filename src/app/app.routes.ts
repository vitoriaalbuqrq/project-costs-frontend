import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { MyProjectsComponent } from './pages/my-projects/my-projects.component';
import { DetailsProjectComponent} from './pages/details-project/details-project.component';
import { UserComponent } from './pages/user/user.component';
import { EditProjectComponent } from './pages/edit-project/edit-project.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
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
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                component: UserHomeComponent,
            },
            {
                path: "newproject",
                component: NewProjectComponent,
            },
            {
                path: "myprojects",
                component: MyProjectsComponent,
            },
            {
                path: "detailsproject/:id",
                component: DetailsProjectComponent,
            },
            {
                path: "editproject/:id",
                component: EditProjectComponent,
            },
        ]
    },
    
];