import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';  
import { CustomUppercasePipe } from '../custom-uppercase.pipe';
import { FormatDateTimePipe } from '../format-date-time.pipe';
import { WeightPipe } from '../weight.pipe';
@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule, CustomUppercasePipe, FormatDateTimePipe, WeightPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent implements OnInit{
  drivers: any[] = [];
  selectedPackage: any = null;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.fetchDrivers();
  }
  fetchDrivers(): void {
    this.databaseService.getDrivers().subscribe((data: any) => {
      console.log(data);
      this.drivers = data;
    });
  }
  showPackageDetails(packageId: string): void {
    console.log(packageId);
    this.databaseService.getPackageById(packageId).subscribe((data: any) => {
      this.selectedPackage = data;  
    });
  }
  deleteDriver(id: string): void {
    this.databaseService.deleteDriver(id).subscribe(() => {
      this.fetchDrivers();
    });
  }


}
