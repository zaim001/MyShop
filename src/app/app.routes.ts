import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SigninComponent } from './auth/signin/signin.component';


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
        path: "contact",
        component: ContactUsComponent,
    },
    {
        path: "auth/signin",
        component: SigninComponent,
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
