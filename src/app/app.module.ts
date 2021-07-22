import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common-page/header/header.component';
import { FooterComponent } from './common-page/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './other-module/material';
import { MatIconModule } from '@angular/material/icon';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyauthService } from './auth-services/authservice';
import { UsersInfoComponent } from './components/users-info/users-info.component';
import { AddSkillComponent } from './components/skills/add-skill/add-skill.component';
import { TokenInterceptor } from './auth-services/token.interceptor';
import { UpdateSkillComponent } from './components/skills/update-skill/update-skill.component';
import { DeleteSkillComponent } from './components/skills/delete-skill/delete-skill.component';
import { AuthGuard } from './auth-services/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UsersInfoComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    DeleteSkillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,MatIconModule,FormsModule,ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MyauthService,AuthGuard ,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
