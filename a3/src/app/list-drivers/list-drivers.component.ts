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
  selectedDriverPackages: any[] = [];

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
  showPackagesForDriver(selectedDriver: any): void {
    if (selectedDriver.assigned_packages?.length > 0) {
      this.selectedDriverPackages = selectedDriver.assigned_packages;
    } else {
      this.selectedDriverPackages = [];
      alert('No assigned packages for this driver');
    }
  }
  deleteDriver(id: string): void {
    this.databaseService.deleteDriver(id).subscribe(() => {
      this.fetchDrivers();
    });
  }


}
