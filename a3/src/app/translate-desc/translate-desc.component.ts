import { Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-translate-desc',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
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
      if (data.error) {
          alert(data.error);  
      } else {
          this.translations = data.translations;
      }
  });
  }  
  translateDesc(pkg: any): void {
    if (!pkg.selectedLanguage) {
      alert('Please select a language to translate the description.');
      return;
    }

    const payload = {
      description: pkg.description,
      targetLanguage: pkg.selectedLanguage
    };

    this.socket.emit('translate-description', payload);
  }
}