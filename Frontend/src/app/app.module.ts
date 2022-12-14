import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { AuthGuard } from './services/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterdialogComponent } from './dialog/registerdialog/registerdialog.component';
import { CoursedialogComponent } from './dialog/coursedialog/coursedialog.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TrainerDashboardComponent } from './components/trainer-dashboard/trainer-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { EvaluatedialogComponent } from './dialog/evaluatedialog/evaluatedialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterdialogComponent,
    CoursedialogComponent,
    AdminDashboardComponent,
    TrainerDashboardComponent,
    StudentDashboardComponent,
    EvaluatedialogComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      "positionClass": "toast-top-center",
      timeOut: 2000,
      closeButton: true,
    }),
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSliderModule,
  ],

  providers: [
    AuthGuard,
    ValidateService,
    AuthService,
    RegisterdialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
