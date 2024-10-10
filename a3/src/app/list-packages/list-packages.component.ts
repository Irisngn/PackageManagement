import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';  
import { WeightPipe } from '../weight.pipe';
import { FormatDateTimePipe } from '../format-date-time.pipe';
import { CustomUppercasePipe } from '../custom-uppercase.pipe';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [CommonModule, WeightPipe, FormatDateTimePipe, CustomUppercasePipe],
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'] 
})
export class ListPackagesComponent implements OnInit {
  packages: any[] = [];  
  selectedDriver: any = null;
  
  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.databaseService.getPackages().subscribe((data: any[]) => {
      this.packages = data;
    });
  }

  showDriverDetails(driverId: string): void {
    console.log(driverId);
    this.databaseService.getDriverById(driverId).subscribe((data: any) => {
      console.log(driverId);
      this.selectedDriver = data;  
      console.log(data);
    });
  }
  deletePackage(id: string): void {
    this.databaseService.deletePackage(id).subscribe(() => {
      this.fetchPackages();  
    });
  }
}
