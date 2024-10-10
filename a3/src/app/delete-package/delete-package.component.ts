import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css']  
})
export class DeletePackageComponent {
  packages: any[] = [];  
  
  constructor(private databaseService: DatabaseService, private router: Router) { }  

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.databaseService.getPackages().subscribe((data: any[]) => {
      this.packages = data;
    });
  }

  deletePackage(id: string): void {
    this.databaseService.deletePackage(id).subscribe(() => {
      this.router.navigate(['/list-packages']);
    });
  }
}
