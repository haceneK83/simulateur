import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulateurComponent } from './simulateur/simulateur.component';


const routes: Routes = [
  { path: 'simulateur', component: SimulateurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
