import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';  
@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent implements OnInit{
  drivers: any[] = [];
  
  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.fetchDrivers();
  }
  fetchDrivers(): void {
    this.databaseService.getDrivers().subscribe((data: any) => {
      this.drivers = data;
    });
  }
  deleteDriver(id: string): void {
    this.databaseService.deleteDriver(id).subscribe(() => {
      this.fetchDrivers();
    });
  }

}
