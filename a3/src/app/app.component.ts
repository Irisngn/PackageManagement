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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, HeaderComponent, FooterComponent, HomeComponent, ListDriversComponent, AddDriverComponent, UpdateDriverComponent, DeleteDriverComponent, ListPackagesComponent, AddPackageComponent, DeletePackageComponent, UpdatePackageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'a3';
}
