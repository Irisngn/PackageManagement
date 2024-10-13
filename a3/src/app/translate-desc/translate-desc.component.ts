import { Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-translate-desc',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './translate-desc.component.html',
  styleUrl: './translate-desc.component.css'
})
export class TranslateDescComponent implements OnInit {
  packages: any[] = [];
  translations: any = { vi: '', ar: '', zh: '' }; 
  socket: any;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getPackages().subscribe((data: any) => {
      this.packages = data;
    })
    this.socket = io(); 
    this.socket.on('translation-result', (data: any) => {
      console.log(data.translations);
      this.translations = data.translations;
    });
  };
  translateDesc(description: string): void{
    const payload = { description};
    this.socket.emit('translate-description', payload);

  }


}
