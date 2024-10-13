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
import { TextToSpeechComponent } from "./text-to-speech/text-to-speech.component";
import { TranslateDescComponent } from "./translate-desc/translate-desc.component";
import { CalculateDistanceComponent } from "./calculate-distance/calculate-distance.component";
import { AuthGuard } from './auth.guard';
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { InvalidDataComponent } from "./invalid-data/invalid-data.component";
export const routes: Routes = [
    { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
    { path: 'home', component: HomeComponent,  canActivate: [AuthGuard]  },    

    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'add-driver', component: AddDriverComponent, canActivate: [AuthGuard] },
    { path: 'list-drivers', component: ListDriversComponent, canActivate: [AuthGuard] },
    { path: 'update-driver', component: UpdateDriverComponent, canActivate: [AuthGuard] }, 
    { path: 'delete-driver', component: DeleteDriverComponent, canActivate: [AuthGuard]},

    { path: 'add-package', component: AddPackageComponent,canActivate: [AuthGuard] },
    { path: 'list-packages', component: ListPackagesComponent,canActivate: [AuthGuard]},
    { path: 'update-package', component: UpdatePackageComponent, canActivate: [AuthGuard] }, 
    { path: 'delete-package', component: DeletePackageComponent, canActivate: [AuthGuard]},
    { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
    {path: 'text-to-speech', component: TextToSpeechComponent, canActivate: [AuthGuard]},
    {path: 'translate-desc', component: TranslateDescComponent, canActivate: [AuthGuard]},
    {path: 'calculate-distance', component: CalculateDistanceComponent, canActivate: [AuthGuard]},
    {path: 'invalid-data', component: InvalidDataComponent},

    
    { path:'**', component: PageNotFoundComponent},
];

