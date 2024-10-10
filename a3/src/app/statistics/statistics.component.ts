import { Component, OnInit} from '@angular/core';
import { DatabaseService } from '../database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  stats: any = {};
  constructor(private databaseService: DatabaseService) {}
  ngOnInit(): void {
    this.fetchStatistics();  
  }

  fetchStatistics(): void {
    this.databaseService.getStatistics().subscribe(data => {
      console.log(data);
      this.stats = data;
    });
  }
}
