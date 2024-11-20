import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TherapyCentreComponent } from './therapy-centre/therapy-centre.component';
import { ContactComponent } from './contact/contact.component';
import { TherapistsComponent } from './therapists/therapists.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'therapy-centre', component: TherapyCentreComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'therapists', component: TherapistsComponent},
  {path: 'signup', component: SignupComponent}
];
