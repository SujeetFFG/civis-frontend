import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ActionButtonComponent} from './action-button/action-button.component';
import {ActionModalComponent} from './action-modal/action-modal.component';
import {ConfirmationModalComponent} from './confirmation-modal/confirmation-modal.component';
import {ConsultationCardComponent} from './consultation-card/consultation-card.component';
import { LinearLoaderModule } from './linear-loader/linear-loader.module';
import { LinearLoaderComponent } from './linear-loader/linear-loader.component';
import { LinearLoaderService } from './linear-loader/linear-loader.service';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error-modal/error.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';
import { SharedDirectivesModule } from '../directives/shared-directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';
import { PipesModule } from '../pipes/pipes.module';
import { PageContentRendererComponent } from './page-content-renderer/page-content-renderer.component';
import { ResponseAnswersComponent } from './response-answers/response-answers.component';
import { ResendVerificationComponent } from './resendVerification/resendVerification.component';
import { CaseStudiesListComponent } from './case-studies-list/case-studies-list.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { NotificationDrawerComponent } from './notification-drawer/notification-drawer.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ConsultationCardComponent,
    ErrorComponent,
    FooterComponent,
    ToastComponent,
    PageContentRendererComponent,
    ResponseAnswersComponent,
    ResendVerificationComponent,
    CaseStudiesListComponent,
    AuthModalComponent,
    CaseStudiesListComponent,
    NotificationDrawerComponent
],
  imports: [
    CommonModule,
    LinearLoaderModule,
    RouterModule,
    SharedDirectivesModule,
    FormsModule,
    NgSelectModule,
    AccordionModule.forRoot(),
    CookieModule.forRoot(),
    PipesModule,
    ModalModule
  ],
  exports: [
    ActionButtonComponent,
    ActionModalComponent,
    ConfirmationModalComponent,
    ConsultationCardComponent,
    ErrorComponent,
    ConsultationCardComponent,
    LinearLoaderComponent,
    FooterComponent,
    ToastComponent,
    PageContentRendererComponent,
    ResponseAnswersComponent,
    ResendVerificationComponent,
    CaseStudiesListComponent,
    AuthModalComponent,
    NotificationDrawerComponent
  ],
  providers: [
    LinearLoaderService
  ]
})
export class SharedComponentsModule {
}
