import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent implements OnInit {
  packages: any[] = []; 
  selectedPackageId: string = ''; 
  package: any = {
    package_destination: '', 
  };

  constructor(
    private databaseService: DatabaseService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.databaseService.getPackages().subscribe((data: any[]) => {
      this.packages = data;
    });
  }

  onPackageSelect(): void {
    if (this.selectedPackageId) {
      this.getPackageDetails(this.selectedPackageId);
    }
  }

  getPackageDetails(package_id: string): void {
    this.databaseService.getPackageById(package_id).subscribe((data: any) => {
      this.package = {
        package_destination: data.package_destination,  
      };
    });
  }

  onSubmit(): void {
      this.databaseService.updatePackage(this.selectedPackageId, this.package).subscribe(() => {
        this.router.navigate(['/list-packages']);  
      });
    }
  }
