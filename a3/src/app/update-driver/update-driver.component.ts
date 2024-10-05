import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css']
})
export class UpdateDriverComponent implements OnInit {
  drivers: any[] = []; 
  selectedDriverId: string = '';
  driver: any = null; 

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDrivers();
  }
  fetchDrivers(): void {
    this.databaseService.getDrivers().subscribe((data: any[]) => {
      console.log(data);
      this.drivers = data;
    });
  }

  onDriverSelect(): void {
    if (this.selectedDriverId) {
      this.getDriverDetails(this.selectedDriverId);
    }
  }


  getDriverDetails(driver_id: string): void {
    this.databaseService.getDriverById(driver_id).subscribe((data: any) => {
      this.driver = data;
    });
  }


  onSubmit(): void {
    if (this.selectedDriverId) {
      this.databaseService.updateDriver(this.selectedDriverId, this.driver).subscribe(() => {
        this.router.navigate(['/list-drivers']);
      });
    }
  }
}
