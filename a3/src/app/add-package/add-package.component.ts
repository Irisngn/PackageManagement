import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  package = {
    package_title: '',
    package_weight: null,
    package_destination: '',
    description: '',
    isAllocated: false,
    driver_id:"",
  };
  drivers: any[] = [];
  constructor(private databaseService: DatabaseService, private router: Router) {}
  ngOnInit(): void {
    this.fetchDrivers();  
  }
  fetchDrivers(): void {
    this.databaseService.getDrivers().subscribe((data: any[]) => {
      this.drivers = data;  
    });
  }

  onSubmit() {
    this.databaseService.createPackage(this.package).subscribe(() => {
      this.router.navigate(['/list-packages']);
    });
  }



}
