import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent, },
   {path: "cities", component: CitiesComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
