import {CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import {NgSelectModule} from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
    declarations: [
        SignUpComponent,
        LoginComponent,
        SuccessComponent,
        FailureComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        NgSelectModule,
        FormsModule,
        RecaptchaModule,
    ],
    exports: []
})

export class AuthModule {}
