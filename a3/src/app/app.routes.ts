import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { ListDriversComponent } from "./list-drivers/list-drivers.component";
import { AddDriverComponent } from "./add-driver/add-driver.component";
import { DeleteDriverComponent } from "./delete-driver/delete-driver.component";
import { UpdateDriverComponent } from "./update-driver/update-driver.component";
import { ListPackagesComponent } from "./list-packages/list-packages.component";
import { AddPackageComponent } from "./add-package/add-package.component";
import { UpdatePackageComponent } from "./update-package/update-package.component";
import { DeletePackageComponent } from "./delete-package/delete-package.component";
import { StatisticsComponent } from "./statistics/statistics.component";
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },    

    { path: 'add-driver', component: AddDriverComponent },
    { path: 'list-drivers', component: ListDriversComponent },
    { path: 'update-driver', component: UpdateDriverComponent }, 
    { path: 'delete-driver', component: DeleteDriverComponent},

    { path: 'add-package', component: AddPackageComponent },
    { path: 'list-packages', component: ListPackagesComponent },
    { path: 'update-package', component: UpdatePackageComponent }, 
    { path: 'delete-package', component: DeletePackageComponent},
    { path: 'statistics', component: StatisticsComponent},
    
    { path:'**', component: PageNotFoundComponent},
];

