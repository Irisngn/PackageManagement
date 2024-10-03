import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  
  driver = {
    driver_name: '',
    driver_department: '',
    driver_licence: '',
    driver_isActive: false
  };

  constructor(private databaseService: DatabaseService, private router: Router) {}

  onSubmit() {
    this.databaseService.createDriver(this.driver).subscribe(() => {
      this.router.navigate(['/list-drivers']);
    });
  }
}

