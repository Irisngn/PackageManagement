import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']  
})
export class DeleteDriverComponent implements OnInit {
  drivers: any[] = [];
  
  constructor(private databaseService: DatabaseService, private router: Router) { }

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
      this.router.navigate(['/list-drivers']);
    });
  }
}
