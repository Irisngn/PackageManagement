import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ListDriversComponent } from "./list-drivers/list-drivers.component";
import { AddDriverComponent } from "./add-driver/add-driver.component";
import { DeleteDriverComponent } from "./delete-driver/delete-driver.component";
import { UpdateDriverComponent } from "./update-driver/update-driver.component";
import { ListPackagesComponent } from "./list-packages/list-packages.component";
import { AddPackageComponent } from "./add-package/add-package.component";
import { UpdatePackageComponent } from "./update-package/update-package.component";
import { DeletePackageComponent } from "./delete-package/delete-package.component";
import { WeightPipe } from './weight.pipe';
import { CustomUppercasePipe } from './custom-uppercase.pipe';  
import { FormatDateTimePipe } from './format-date-time.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, HeaderComponent, FooterComponent, HomeComponent, ListDriversComponent, AddDriverComponent, UpdateDriverComponent, ListPackagesComponent, AddPackageComponent, DeletePackageComponent, UpdatePackageComponent, WeightPipe, DeleteDriverComponent, CustomUppercasePipe, FormatDateTimePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'a3';
}
