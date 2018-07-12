import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserService } from '../_shared/services';

import { AuthorizationComponent } from './authorization.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const AuthorizationRoutes: Routes = [
    {
        path: 'users',
        component: AuthorizationComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AuthorizationRoutes),
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AuthorizationComponent,
        LoginComponent,
        SignupComponent
    ],
    providers: [
        UserService
    ]
})
export class AuthorizationModule { }
