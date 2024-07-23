import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/layout/page-not-found/page-not-found.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { ProductsComponent } from './admin/products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AdminFaqComponent } from './admin/admin-faq/admin-faq.component';
import { ShopComponent } from './shop/shop.component';



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
        path : "shop",
        component : ShopComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: { roles: ['admin'] }} ,
            { path: 'products', component: ProductsComponent, canActivate: [AuthGuard],data: { roles: ['admin'] }},
            { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard],data: { roles: ['admin'] }},
            { path: 'faqs', component: AdminFaqComponent, canActivate: [AuthGuard],data: { roles: ['admin'] }},
            { path : '', redirectTo : 'dashboard', pathMatch: 'full'},
        ]
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