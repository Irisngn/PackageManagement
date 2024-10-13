import { Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import { DatabaseService } from '../database.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calculate-distance',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './calculate-distance.component.html',
  styleUrl: './calculate-distance.component.css'
})
export class CalculateDistanceComponent implements OnInit{
  packages: any[] = [];
  distances: { [key: string]: string } = {};
  socket: any;


  constructor(private databaseService: DatabaseService) { }
  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data: any) => {
      this.packages = data;
    })
    this.socket = io(); 
    this.socket.on('distance-result', (data: { destination: string, distance: string }) => {
      this.distances[data.destination] = data.distance;  
    });  
  }
  calculateDistance(destination: string): void {
    this.socket.emit('calculate-distance', { destination });
  }
}
