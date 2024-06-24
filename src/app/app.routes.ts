import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';


export const routes: Routes = [

    {
        path: "home",
        component:HomeComponent,
    },
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"  
    }, 
    {
        path: "404",
        component: PageNotFoundComponent
    },
    {
        path: "**",
        redirectTo: "/404",
    }

];
